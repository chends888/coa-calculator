import React from "react";

import Box from "@mui/material/Box";
import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .Mui-selected": {
    color: "error",
  },
  "& .MuiToggleButtonGroup-grouped": {
    borderColor: "#bdbdbd",
    "&:not(:first-of-type)": {
    },
    "&:first-of-type": {
      marginLeft: theme.spacing(1),
    },
    "&:last-of-type": {
      marginRight: theme.spacing(1),
    },
  },
}));

const Boosts = ({ boosts, updateBoosts, exclusive = false }) => {
  const [selectedBoost, setSelectedBoost] = React.useState([]);

  const handleChange = (event, newBoost) => {
    // Update the selectedBoost state with the new selected boost(s)
    setSelectedBoost(newBoost);

    // Create a copy of the boosts array and update the active property
    let boostsCopy = boosts.map(boost => ({
      ...boost,
      // If exclusive is true, only the selected boost is active
      // If exclusive is false, check if the boost's name is in the newBoost array
      active: exclusive ? boost.name === newBoost : newBoost.includes(boost.name)
    }));

    // Call updateBoosts with the updated boostsCopy array
    updateBoosts(boostsCopy);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 1,
          marginTop: 1,
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={selectedBoost}
          exclusive={exclusive}
          onChange={(event, newBoost) => handleChange(event, newBoost)}
        >
          {boosts !== undefined ? (
            boosts.map((boost) => (
              <ToggleButton
                key={boost.name}
                value={boost.name}
                sx={{
                  "& > :not(style)": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
              >
                <Box
                  sx={{
                    marginRight: 0.4,
                  }}
                >
                  <img
                    src={process.env.PUBLIC_URL + `/images/Boosts/${boost.name}.gif`}
                    style={{ width: 'auto', height: '22px' }}
                    value={boost.name}
                    alt=""
                  />
                </Box>
                {boost.name +
                  " (+" +
                  Math.floor((boost.value - 1) * 100) +
                  "%)"}
              </ToggleButton>

            ))
          ) : (
            <></>
          )}
        </StyledToggleButtonGroup>
      </Box>
    </>
  );
};

export default Boosts;
