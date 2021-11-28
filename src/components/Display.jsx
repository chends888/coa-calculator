import React from "react";
// import Paper from '@mui/material/Paper';

// import { styled } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Display = ({
  level,
  levelPercentage,
  targetLevel,
  material,
  boosts,
  keywords,
  applyBoostOnSmelt,
  buyOrSmeltBars,
  skill,
}) => {
  const [expData, setExp] = React.useState({});
  const [expGap, setExpGap] = React.useState(0);
  const [isBusy, setBusy] = React.useState(true);

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateMaterialXpBoost = (materialXP) => {
    for (let i = 0; i < boosts.length; i++) {
      if (boosts[i].active) {
        materialXP *= boosts[i].value;
      }
    }
    return Math.floor(materialXP);
  };

  // Request Exp data from back end
  React.useEffect(() => {
    // fetch("http://localhost:8000/exp")
    fetch("https://coa-calculator-backend.herokuapp.com/exp")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setBusy(false);
        setExp(data);
        // console.log("set busy");
      })
      .catch((error) => {
        console.log("Error on fetch exp data:", error);
      });
  }, []);

  React.useEffect(() => {
    if (!isBusy) {
      // console.log(
      //   "totalExpGap:",
      //   ((expData[targetLevel] - expData[level]) * (100 - levelPercentage)) / 100
      // );
      // if (levelPercentage === 0) {
      //   console.log("% = 0");
      //   levelPercentage = 100;
      // }
      // console.log('level percentage:', levelPercentage);
      const currentLevelExp =
        parseInt(expData[level]) +
        (parseInt(expData[level + 1]) - parseInt(expData[level])) *
        levelPercentage;
      // ((expData[level + 1] - expData[level]) * levelPercentage) + expData[level];
      // console.log("level XP: ", currentLevelExp);
      const targetLevelExp = expData[targetLevel];
      // console.log("target lelve XP:", targetLevelExp);
      // console.log(targetLevelExp);
      setExpGap(Math.ceil(targetLevelExp - currentLevelExp));
    }
    // eslint-disable-next-line
  }, [expData, level, targetLevel, levelPercentage]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          // border: 1,
          // maxWidth: 1000,
        }}
      >
        {expGap <= 0 || isNaN(parseFloat(expGap)) ? (
          <></>
        ) : (
          <List dense={true}>
            <ListItem>
              <ListItemText
                primary={"Total exp: " + addCommas(expGap)}
                secondary=""
              />
            </ListItem>
            <ListItem>
              {/* Render empty component if not material is selected */}
              {material[0] === "material" ? (
                // Render empty component in case no material was selected
                <></>
              ) : skill === "Combat" ? (
                <ListItemText
                  primary={
                    "Total " +
                    material[0] +
                    ": " +
                    addCommas(
                      Math.ceil(
                        expGap /
                        (calculateMaterialXpBoost(material[1]["xp"]))
                      )
                    )
                  }
                />
              ) : skill === "Smithing" ? (
                // Render results for Smithing
                buyOrSmeltBars ? (
                  // Don't include smelting XP
                  <ListItemText
                    primary={
                      "Total " +
                      material[0] +
                      " " +
                      keywords[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap /
                          calculateMaterialXpBoost(material[1]["xp-forge"])
                        )
                      )
                    }
                  />
                ) : applyBoostOnSmelt ? (
                  // Include and apply Boosts on bar Smelting
                  <ListItemText
                    primary={
                      "Total " +
                      material[0] +
                      " " +
                      keywords[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap /
                          (calculateMaterialXpBoost(material[1]["xp-forge"]) +
                            calculateMaterialXpBoost(material[1]["xp-smelt"]))
                        )
                      )
                    }
                  />
                ) : (
                  // Include but don't apply Boosts on bar Smelting
                  <ListItemText
                    primary={
                      "Total " +
                      material[0] +
                      " " +
                      keywords[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap /
                          (calculateMaterialXpBoost(material[1]["xp-forge"]) +
                            parseFloat(material[1]["xp-smelt"]))
                        )
                      )
                    }
                  />
                )
              ) : // ) : keywords[0] === "Relics of" ? (
                skill === "Crafting" ? (
                  // Render results for Crafting
                  // Cursed relics exception
                  material[0] === "Cursed" ? (
                    <ListItemText
                      primary={
                        "Total " +
                        material[0] +
                        " Relics: " +
                        addCommas(
                          Math.ceil(
                            expGap / calculateMaterialXpBoost(material[1]["xp"])
                          )
                        )
                        // addCommas(Math.ceil(expGap / calculateMaterialXpBoost(material[1]["xp"])))
                      }
                    />
                  ) : (
                    <ListItemText
                      primary={
                        "Total " +
                        keywords[0] +
                        " " +
                        material[0] +
                        ": " +
                        addCommas(
                          Math.ceil(
                            expGap / calculateMaterialXpBoost(material[1]["xp"])
                          )
                        )
                      }
                    />
                  )
                ) : (
                  // Render results for Cooking
                  <ListItemText
                    primary={
                      "Total " +
                      keywords[0] +
                      " " +
                      material[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap / calculateMaterialXpBoost(material[1]["xp"])
                        )
                      )
                    }
                  />
                )}
            </ListItem>

            {/* Render submaterials */}

            {skill === "Combat" ? (
              <></>
            ) : (
              Object.keys(material[1]["submaterials"]).map((submaterial) => (
                <ListItem>
                  {skill === "Smithing" ? (
                    // Smithing exception
                    applyBoostOnSmelt ? (
                      // Apply Boosts on bar Smelting
                      buyOrSmeltBars ? (
                        // Don't include smelting XP
                        <ListItemText
                          primary={
                            "Total " +
                            submaterial +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                calculateMaterialXpBoost(
                                  material[1]["xp-forge"]
                                )
                              ) * material[1]["submaterials"][submaterial]
                            )
                          }
                        />
                      ) : (
                        // Include smelting XP
                        <ListItemText
                          primary={
                            "Total " +
                            submaterial +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                (calculateMaterialXpBoost(
                                  material[1]["xp-forge"]
                                ) +
                                  calculateMaterialXpBoost(
                                    material[1]["xp-smelt"]
                                  ))
                              ) * material[1]["submaterials"][submaterial]
                            )
                          }
                        />
                      )
                    ) : // Don't apply Boosts on bar Smelting
                      buyOrSmeltBars ? (
                        // Don't include smelting XP
                        <ListItemText
                          primary={
                            "Total " +
                            submaterial +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                calculateMaterialXpBoost(material[1]["xp-forge"])
                              ) * material[1]["submaterials"][submaterial]
                            )
                          }
                        />
                      ) : (
                        <ListItemText
                          primary={
                            "Total " +
                            submaterial +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                (calculateMaterialXpBoost(
                                  material[1]["xp-forge"]
                                ) +
                                  parseFloat(material[1]["xp-smelt"]))
                              ) * material[1]["submaterials"][submaterial]
                            )
                          }
                        />
                      )
                  ) : skill === "Crafting" || skill === "Cooking" || skill === "Mining" || skill === "Woodcutting" || skill === "Fishing"(
                    <ListItemText
                      primary={
                        "Total " +
                        submaterial +
                        ": " +
                        addCommas(
                          Math.ceil(
                            expGap / calculateMaterialXpBoost(material[1]["xp"])
                          ) * material[1]["submaterials"][submaterial]
                        )
                      }
                    />
                  )}
                </ListItem>
              )))}
            {/* Render number of inventories */}
            <ListItem>
              {/* Render empty component if not material is selected */}
              {material[0] === "material" ? (
                <></>
              ) : skill === "Crafting" ? (
                material[0] === "Cursed" || material[0] === "Experience" ? (
                  <ListItemText
                    primary={
                      "Inventories (16 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                          calculateMaterialXpBoost(material[1]["xp"]) /
                          16
                        )
                      )
                    }
                  />
                ) : (
                  <ListItemText
                    primary={
                      "Inventories (36 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                          calculateMaterialXpBoost(material[1]["xp"]) /
                          36
                        )
                      )
                    }
                  />
                )
              ) : skill === "Cooking" ? (
                <ListItemText
                  primary={
                    "Inventories (16 fish and 16 salt): " +
                    addCommas(
                      Math.ceil(
                        expGap /
                        calculateMaterialXpBoost(material[1]["xp"]) /
                        16
                      )
                    )
                  }
                />
              ) : skill === "Mining" || skill === "Woodcutting" ? (
                <ListItemText
                  primary={
                    "Inventories (36 per inventory): " +
                    addCommas(
                      Math.ceil(
                        expGap /
                        calculateMaterialXpBoost(material[1]["xp"]) /
                        36
                      )
                    )
                  }
                />
              ) : (
                <></>
              )}
            </ListItem>
          </List>
        )}
      </Box>
    </>
  );
};

export default Display;
