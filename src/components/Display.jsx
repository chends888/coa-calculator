import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Attribute from "./Attribute";
import { formatNumber as addCommas } from "../utils/formatNumber";

const API_URL = process.env.REACT_APP_API_URL;

const Display = ({
  level, levelPercentage, targetLevel, element, boosts,
  boostsEquipSets = [], keywords, applyBoostOnSmelt, buyOrSmeltBars,
  skill, onPriceTotalsChange,
}) => {
  const [result, setResult] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // Per-material price inputs, keyed by material name. Kept here (rather
  // than in each tab) since Display already knows exactly which materials
  // (primary + submaterials) apply to the current selection.
  const [prices, setPrices] = React.useState({});

  const updatePrice = (name, value) => {
    setPrices((prev) => ({ ...prev, [name]: value }));
  };

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
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);

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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setIsLoading(false);
        }
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
  ]);

  const hasValidResult =
    result && !result.error && typeof result.exp_gap === "number" && result.exp_gap > 0;

  const expLine = isLoading
    ? "Total exp: Loading..."
    : hasValidResult
    ? "Total exp: " + addCommas(result.exp_gap)
    : "Total exp: -";

  // Every material this selection could show a price field for: the primary
  // material (unless hidden, e.g. Naturite) plus every submaterial. Using the
  // raw selected key for the primary keeps the field label simple (e.g.
  // "Iron", not "Iron Bars"). Falls back to a single generic/placeholder
  // field when there's no valid result yet, so the price field is never
  // fully hidden - it just won't have a computable total until data loads.
  const EXCLUDED_PRICE_SKILLS = ["Mining", "Woodcutting", "Combat"];
  const pricingEnabled = !EXCLUDED_PRICE_SKILLS.includes(skill);

  let priceableItems = [];
  if (pricingEnabled && hasValidResult) {
    if (skill !== "Smithing" && result.subelements && result.subelements.length > 0) {
      result.subelements.forEach((sub) => {
        priceableItems.push({ name: sub.name, quantity: sub.value });
      });
    } else if (result.primary && !hidePrimaryLine) {
      priceableItems.push({ name: element[0], quantity: result.primary.value });
    } else if (skill === "Smithing" && result.subelements && result.subelements.length > 0) {
      // Naturite (hidePrimaryLine case): no primary line, so fall back to
      // its self-referencing subelement as the only priceable item.
      result.subelements.forEach((sub) => {
        priceableItems.push({ name: sub.name, quantity: sub.value });
      });
    }
  }
  if (pricingEnabled && priceableItems.length === 0) {
    const fallbackName = element?.[0] && element[0] !== "loading" ? element[0] : "Material";
    priceableItems = [{ name: fallbackName, quantity: null }];
  }

  const priceableItemsKey = JSON.stringify(priceableItems);
  const pricesKey = JSON.stringify(prices);

  React.useEffect(() => {
    if (!onPriceTotalsChange || !pricingEnabled) return;
    const items = priceableItems
      .filter((item) => item.quantity != null && prices[item.name] > 0)
      .map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: prices[item.name],
        total: Math.ceil(item.quantity * prices[item.name]),
      }));
    onPriceTotalsChange(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceableItemsKey, pricesKey]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <List dense={true}>
        <ListItem>
          <ListItemText primary={expLine} />
        </ListItem>

        {!isLoading && hasValidResult && (
          <>
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
          </>
        )}
      </List>

      {pricingEnabled && (
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {priceableItems.map((item) => (
              <Attribute
                key={item.name}
                maxValue={9999999999}
                attributeName={`${item.name} price`}
                value={prices[item.name] || 0}
                updateAttribute={(value) => updatePrice(item.name, value)}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ))}
          </Box>

          <List dense={true}>
            {priceableItems.map((item) => {
              const price = prices[item.name];
              if (!price || price <= 0 || item.quantity == null) return null;
              return (
                <ListItem key={item.name}>
                  <ListItemText
                    primary={`Total ${item.name} price: ${addCommas(Math.ceil(item.quantity * price))}`}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Display;
