import React from "react";
// import Paper from '@material-ui/core/Paper';

// import { styled } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Display = ({
  level,
  targetLevel,
  material,
  boosts,
  keywords,
  applyBoostOnSmelt,
  buyOrSmeltBars,
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
      //   ((expData[targetLevel[0]] - expData[level[0]]) * (100 - level[1])) / 100
      // );
      const currentLevelExp =
        ((expData[level[0] + 1] - expData[level[0]]) * (level[1])) / 100;
      const targetLevelExp = (expData[targetLevel[0]])
        setExpGap(Math.ceil(targetLevelExp - currentLevelExp));
    }
    // eslint-disable-next-line
  }, [expData, level, targetLevel]);

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
              {material[0] === "material" ? (
                // Render empty component in case no material was selected
                <></>
              ) : keywords[0] === "Bars" ? (
                // Render results for Smithing
                // TODO: instead of if-else, try if-elif-elif-else
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
              ) : keywords[0] === "Relics of" ? (
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
            {Object.keys(material[1]["submaterials"]).map((submaterial) => (
              <ListItem>
                {keywords[0] === "Bars" ? (
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
                ) : (
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
            ))}
          </List>
        )}
      </Box>
    </>
  );
};

export default Display;
