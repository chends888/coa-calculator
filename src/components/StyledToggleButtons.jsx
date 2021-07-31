import React from "react";
import { styled } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import { Box, Card, CardMedia } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

const ToggleButtons = ({ updateMaterial, artisanData, skill }) => {
  const [selectedMaterial, setSelectedMaterial] = React.useState("");

  const handleChange = (event) => {
    setSelectedMaterial(event.target.value);
    // console.log('tooglebuttons material:', )
    updateMaterial([
      event.target.value,
      artisanData[skill][event.target.value],
    ]);
  };
  console.log("artisanData:", artisanData);
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            // m: 1,
            // width: "25ch",
            marginBottom: 1,
            display: "flex",
            flexWrap: "wrap",
            // alignItems: "center",
            // alignContent: "center",
            justifyContent: "center",
            maxWidth: 500,
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <ToggleButtonGroup
          value={selectedMaterial}
          exclusive
          onChange={handleChange}
        >
          {artisanData[skill] !== undefined ? (
            Object.keys(artisanData[skill]).map((material) => (
              // <ToggleButtonGroup>
              <ToggleButton value={material}>
                {/* <Card>
                <CardMedia
                  image="./bronze.png"
                  sx={{
                    height: 100,
                  }}
                >
                  <img src="./bronze.png" alt="recipe thumbnail"/>
                </CardMedia>
              </Card> */}
                {material}
              </ToggleButton>
              // </ToggleButtonGroup>
            ))
          ) : (
            <ToggleButton value="Loading">Loading</ToggleButton>
          )}
        </ToggleButtonGroup>
      </Box>

    </>
  );
};

export default ToggleButtons;
