import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import expData from "../data/exp_data.json";

const Display = ({
  level,
  levelPercentage,
  targetLevel,
  element,
  boosts,
  boostsEquipSets = [],
  keywords,
  applyBoostOnSmelt,
  buyOrSmeltBars,
  skill,
  lolliPrice,
}) => {
  const [expGap, setExpGap] = React.useState(0);

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateElementXpBoost = (elementXP) => {
    for (let i = 0; i < boosts.length; i++) {
      if (boosts[i].active) {
        elementXP *= boosts[i].value;
      }
    }
    for (let i = 0; i < boostsEquipSets.length; i++) {
      if (boostsEquipSets[i].active) {
        elementXP *= boostsEquipSets[i].value;
      }
    }
    return Math.floor(elementXP);
  };

  React.useEffect(() => {
    const currentLevelExp = parseInt(expData[level]) + (parseInt(expData[level + 1]) - parseInt(expData[level])) * (levelPercentage/100);
    const targetLevelExp = expData[targetLevel];
    setExpGap(Math.ceil(targetLevelExp - currentLevelExp));
    // eslint-disable-next-line
  }, [expData, level, targetLevel, levelPercentage]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
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
              {/* Render total number of selected attribute */}
              {/* Render empty component if no element is selected */}
              {element[0] === "loading" ? (
                <></>
              ) : skill === "Combat" ? (
                <ListItemText
                  primary={
                    "Total " +
                    element[0] +
                    ": " +
                    addCommas(
                      Math.ceil(
                        expGap / calculateElementXpBoost(element[1]["xp"])
                      )
                    ) +
                    " (" +
                    element[1]["xp"] +
                    " exp per kill)"
                  }
                />
              ) : skill === "Smithing" ? (
                // Render results for Smithing
                buyOrSmeltBars ? (
                  // Don't include smelting XP
                  // Exception for Naturite and other resources that don't forge

                  <ListItemText
                    primary={
                      "Total " +
                      element[0] +
                      " " +
                      keywords[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp-forge"])
                        )
                      )
                    }
                  />
                ) : applyBoostOnSmelt ? (
                  // Include and apply Boosts on bar Smelting
                  // Exception for Naturite and other resources that don't forge
                  element[1]["xp-forge"] === "0" ? (
                    <></>
                  ) : (
                    <ListItemText
                      primary={
                        "Total " +
                        element[0] +
                        " " +
                        keywords[0] +
                        ": " +
                        addCommas(
                          Math.ceil(
                            expGap /
                              (calculateElementXpBoost(element[1]["xp-forge"]) +
                                calculateElementXpBoost(element[1]["xp-smelt"]))
                          )
                        )
                      }
                    />
                  )
                ) : (
                  // Include but don't apply Boosts on bar Smelting
                  // Exception for Naturite and other resources that don't forge
                  <ListItemText
                    primary={
                      "Total " +
                      element[0] +
                      " " +
                      keywords[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            (calculateElementXpBoost(element[1]["xp-forge"]) +
                              parseFloat(element[1]["xp-smelt"]))
                        )
                      )
                    }
                  />
                )
              ) : skill === "Crafting" ? (
                // Render results for Crafting
                // Cursed relics exception
                element[0] === "Cursed" ? (
                  // <>
                  <ListItemText
                    primary={
                      "Total " +
                      element[0] +
                      " Relics: " +
                      addCommas(
                        Math.ceil(
                          expGap / calculateElementXpBoost(element[1]["xp"])
                        )
                      )
                    }
                  />
                ) : (
                  // <>
                  <ListItemText
                    primary={
                      "Total " +
                      keywords[0] +
                      " " +
                      element[0] +
                      ": " +
                      addCommas(
                        Math.ceil(
                          expGap / calculateElementXpBoost(element[1]["xp"])
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
                    element[0] +
                    ": " +
                    addCommas(
                      Math.ceil(
                        expGap / calculateElementXpBoost(element[1]["xp"])
                      )
                    )
                  }
                />
              )}
            </ListItem>

            {/* Render subelements */}
            {element[0] === "loading" ? (
              <></>
            ) : skill === "Combat" ? (
              <ListItem>
                <ListItemText
                  primary={
                    "Total gold: " +
                    addCommas(
                      Math.ceil(
                        expGap / calculateElementXpBoost(element[1]["xp"])
                      ) * element[1]["gold"]
                    ) +
                    " (" +
                    element[1]["gold"] +
                    " gold per kill)"
                  }
                />
              </ListItem>
            ) : (
              Object.keys(element[1]["submaterials"]).map((subelement) => (
                <ListItem>
                  {skill === "Smithing" ? (
                    // Don't include smelting XP
                    buyOrSmeltBars ? (
                      // Exception for Naturite and other resources that don't forge
                      element[1]["xp-forge"] === "0" ? (
                        <ListItemText
                          primary={
                            "Total " +
                            subelement +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                  calculateElementXpBoost(
                                    element[1]["xp-smelt"]
                                  )
                              ) * element[1]["submaterials"][subelement]
                            )
                          }
                        />
                      ) : (
                        <ListItemText
                          primary={
                            "Total " +
                            subelement +
                            ": " +
                            addCommas(
                              Math.ceil(
                                expGap /
                                  calculateElementXpBoost(
                                    element[1]["xp-forge"]
                                  )
                              ) * element[1]["submaterials"][subelement]
                            )
                          }
                        />
                      )
                    ) : applyBoostOnSmelt ? (
                      // Include AND boost Smelting XP
                      <ListItemText
                        primary={
                          "Total " +
                          subelement +
                          ": " +
                          addCommas(
                            Math.ceil(
                              expGap /
                                (calculateElementXpBoost(
                                  element[1]["xp-forge"]
                                ) +
                                  calculateElementXpBoost(
                                    element[1]["xp-smelt"]
                                  ))
                            ) * element[1]["submaterials"][subelement]
                          )
                        }
                      />
                    ) : (
                      // Include but DO NOT boost Smelting XP
                      <ListItemText
                        primary={
                          "Total " +
                          subelement +
                          ": " +
                          addCommas(
                            Math.ceil(
                              expGap /
                                (calculateElementXpBoost(
                                  element[1]["xp-forge"]
                                ) +
                                  parseFloat(element[1]["xp-smelt"]))
                            ) * element[1]["submaterials"][subelement]
                          )
                        }
                      />
                    )
                  ) : (
                    <>
                      <ListItemText
                        primary={
                          "Total " +
                          subelement +
                          ": " +
                          addCommas(
                            Math.ceil(
                              expGap / calculateElementXpBoost(element[1]["xp"])
                            ) * element[1]["submaterials"][subelement]
                          )
                        }
                      />
                      {/* {addIcon("Woodcutting", subelement)} */}
                    </>
                  )}
                </ListItem>
              ))
            )}

            {/* Render number of inventories */}
            {/* Render empty component if no element is selected */}
            {element[0] === "loading" ? (
              <></>
            ) : skill === "Crafting" ? (
              element[0] === "Cursed" ||
              element[0] === "Experience" ||
              element[0] === "Ice" ? (
                <ListItem>
                  <ListItemText
                    primary={
                      "Inventories (18 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            18
                        )
                      )
                    }
                  />
                </ListItem>
              ) : element[0] === "Affliction" ? (
                <ListItem>
                  <ListItemText
                    primary={
                      "Inventories (35 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            35
                        )
                      )
                    }
                  />
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      "Inventories (36 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            36
                        )
                      )
                    }
                  />
                </ListItem>
              )
            ) : skill === "Cooking" ? (
              <ListItem>
                <ListItemText
                  primary={
                    "Inventories (18 fish and 18 salt): " +
                    addCommas(
                      Math.ceil(
                        expGap / calculateElementXpBoost(element[1]["xp"]) / 18
                      )
                    )
                  }
                />
              </ListItem>
            ) : skill === "Mining" ? (
              element[0] === "Naturite" ? (
                <ListItem>
                  <ListItemText
                    primary={
                      "Inventories (100 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            100
                        )
                      )
                    }
                  />
                </ListItem>
              ) : (
                <ListItem>
                  <ListItemText
                    primary={
                      "Inventories (36 per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            36
                        )
                      )
                    }
                  />
                </ListItem>
              )
            ) : skill === "Woodcutting" ? (
              <ListItem>
                <ListItemText
                  primary={
                    "Inventories (36 per inventory): " +
                    addCommas(
                      Math.ceil(
                        expGap / calculateElementXpBoost(element[1]["xp"]) / 36
                      )
                    )
                  }
                />
              </ListItem>
            ) : skill === "Fishing" && element[0] === "Bass bait" ? (
              <>
                <ListItem>
                  <ListItemText
                    primary={
                      "Total Remote Bank (34 bass per inventory): " +
                      addCommas(
                        Math.ceil(
                          expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            34
                        )
                      )
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      "Total Remote Bank price: " +
                      addCommas(
                        Math.ceil(
                          (expGap /
                            calculateElementXpBoost(element[1]["xp"]) /
                            34) *
                            parseInt(lolliPrice) *
                            0.4
                        )
                      ) +
                      " Gold"
                    }
                  />
                </ListItem>
              </>
            ) : (
              <></>
            )}
          </List>
        )}
      </Box>
    </>
  );
};

export default Display;
