import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const API_URL = process.env.REACT_APP_API_URL;

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const Display = ({
  level, levelPercentage, targetLevel, element, boosts,
  boostsEquipSets = [], keywords, applyBoostOnSmelt, buyOrSmeltBars,
  skill, lolliPrice,
}) => {
  const [result, setResult] = React.useState(null);

  const hidePrimaryLine = skill === "Smithing" && element?.[0] === "Naturite";

  // Serialize array/object props for the dependency array below. Parent
  // components sometimes pass inline literals (e.g. keywords={[""]}) that get
  // a new reference every render even when their contents don't change. Using
  // raw references in the deps array causes the effect to refire endlessly.
  // Comparing serialized strings instead means the effect only reruns when
  // the actual content changes, regardless of how the parent constructs props.
  const elementKey = JSON.stringify(element);
  const boostsKey = JSON.stringify(boosts);
  const equipKey = JSON.stringify(boostsEquipSets);
  const keywordsKey = JSON.stringify(keywords);

  React.useEffect(() => {
    if (!element || element[0] === "loading") {
      setResult(null);
      return;
    }

    const controller = new AbortController();

    fetch(`${API_URL}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        skill,
        element_key: element[0],
        level,
        level_percentage: levelPercentage,
        target_level: targetLevel,
        boosts,
        boosts_equip_sets: boostsEquipSets,
        keywords,
        apply_boost_on_smelt: applyBoostOnSmelt,
        buy_or_smelt_bars: buyOrSmeltBars,
        lolli_price: lolliPrice,
      }),
    })
      .then((res) => res.json())
      .then(setResult)
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    level,
    levelPercentage,
    targetLevel,
    elementKey,
    boostsKey,
    equipKey,
    keywordsKey,
    applyBoostOnSmelt,
    buyOrSmeltBars,
    skill,
    lolliPrice,
  ]);

  if (!result || result.error || typeof result.exp_gap !== "number" || result.exp_gap <= 0) {
    return <Box />;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <List dense={true}>
        <ListItem>
          <ListItemText primary={"Total exp: " + addCommas(result.exp_gap)} />
        </ListItem>

        {result.primary && !hidePrimaryLine && (
          <ListItem>
            <ListItemText
              primary={
                result.primary.xp_per_unit != null
                  ? `Total ${result.primary.label}: ${addCommas(result.primary.value)} (${result.primary.xp_per_unit} exp per kill)`
                  : `Total ${result.primary.label}: ${addCommas(result.primary.value)}`
              }
            />
          </ListItem>
        )}

        {result.gold && (
          <ListItem>
            <ListItemText
              primary={`Total gold: ${addCommas(result.gold.total)} (${result.gold.per_kill} gold per kill)`}
            />
          </ListItem>
        )}

        {result.subelements?.map((sub) => (
          <ListItem key={sub.name}>
            <ListItemText primary={`Total ${sub.name}: ${addCommas(sub.value)}`} />
          </ListItem>
        ))}

        {result.inventories && result.inventories.value != null && (
          <ListItem>
            <ListItemText
              primary={`Inventories (${result.inventories.size} per inventory): ${addCommas(result.inventories.value)}`}
            />
          </ListItem>
        )}

        {result.remote_bank && (
          <>
            <ListItem>
              <ListItemText
                primary={`Total Remote Bank (34 bass per inventory): ${addCommas(result.remote_bank.trips)}`}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Total Remote Bank price: ${addCommas(result.remote_bank.price)} Gold`} />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
};

export default Display;
