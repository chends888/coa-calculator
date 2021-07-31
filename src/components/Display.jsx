import React from "react";
// import Paper from '@material-ui/core/Paper';

// import { styled } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const Display = ({
  level,
  targetLevel,
  material,
  boosts,
  boostsDidUpdate,
  keywords,
}) => {
  const [expData, setExp] = React.useState({});
  const [expGap, setExpGap] = React.useState(0);
  // Auxiliary var for applying boosts
  const [expGapBoost, setExpGapBoost] = React.useState(0);
  // Variable to check if data has been fetched
  const [isBusy, setBusy] = React.useState(true);
  const boostsPrev = usePrevious(boosts);
  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Update exp gap to match applied boosts
  React.useEffect(() => {
    console.log("boost changed", boostsPrev);
    let expGapCopy = expGapBoost;
    console.log("before boost loop", boostsDidUpdate[0]);
    for (let i = 0; i < boosts.length; i++) {
      console.log("entered boost loop", boosts[i].name, boostsDidUpdate[0]);
      if (boosts[i].name === boostsDidUpdate[0]) {
        if (boosts[i].active === true) {
          console.log("activate boost", boosts[i].name);
          expGapCopy /= boosts[i].value;
          setExpGapBoost(Math.floor(expGapCopy));
        } else {
          console.log("deactivate boost", boosts[i].name);
          expGapCopy *= boosts[i].value;
          setExpGapBoost(Math.ceil(expGapCopy));
        }
      }
    }

    console.log("boosts", boosts);
    // eslint-disable-next-line
  }, [boostsDidUpdate, boosts, boostsPrev]);

  React.useEffect(() => {
    fetch("http://localhost:8000/exp")
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
        console.log("Error:", error);
      });
  }, []);

  React.useEffect(() => {
    console.log(
      "useEffect initial",
      level,
      expData[level],
      targetLevel,
      expData[targetLevel],
      expGapBoost
    );
    if (!isBusy) {
      // console.log("useEffect inside if", expGapBoost);
      setExpGap(expData[targetLevel] - expData[level]);
      setExpGapBoost(expData[targetLevel] - expData[level]);
    }
    // setExpGap(addCommas(expGapBoost));
    // console.log("useEffect final", expGapBoost);
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
        <List dense={true}>
          <ListItem>
            <ListItemText
              primary={"Total exp: " + addCommas(expGap)}
              secondary=""
            />
          </ListItem>
          {/* {console.log("Material: ", material)} */}
          <ListItem>
            {material[0] === "material" ? (
              // Render empty component in case no material was selected
              <></>
            ) : keywords[0] === "Bars" ? (
              // Render results for Smithing
              <ListItemText
                primary={
                  "Total " +
                  material[0] +
                  " " +
                  keywords[0] +
                  ": " +
                  addCommas(Math.ceil(expGapBoost / material[1]["xp"]))
                }
              />
            ) : keywords[0] === "Relics of" ? (
              // Render results for Crafting
              // Cursed relics exception
              material[0] === "Cursed" ? (
                <ListItemText
                  primary={
                    "Total " +
                    material[0] +
                    " relics:   " +
                    addCommas(Math.ceil(expGapBoost / material[1]["xp"]))
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
                    addCommas(Math.ceil(expGapBoost / material[1]["xp"]))
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
                  addCommas(Math.ceil(expGapBoost / material[1]["xp"]))
                }
              />
            )}
          </ListItem>

          {Object.keys(material[1]["submaterials"]).map((submaterial) => (
            // Render submaterials
            <ListItem>
              <ListItemText
                primary={
                  "Total " +
                  submaterial +
                  ": " +
                  addCommas(
                    Math.ceil(expGapBoost / material[1]["xp"]) *
                      material[1]["submaterials"][submaterial]
                  )
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Display;
