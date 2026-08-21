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

const Boosts = ({ boosts, updateBoosts, exclusive = false, disabledNames = [] }) => {
  // Fully controlled by the boosts prop's `active` field, rather than a
  // separate internal state - so if a parent programmatically deactivates a
  // boost (e.g. auto-turning off Ore Bag when Naturite is selected), the
  // button's visual selected state always stays in sync.
  const selectedBoost = exclusive
    ? boosts?.find((b) => b.active)?.name ?? null
    : boosts?.filter((b) => b.active).map((b) => b.name) ?? [];

  const handleChange = (event, newBoost) => {
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
            boosts.map((boost) => {
              const isDisabled = disabledNames.includes(boost.name);
              return (
                <ToggleButton
                  key={boost.name}
                  value={boost.name}
                  disabled={isDisabled}
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
                      style={{
                        width: 'auto',
                        height: '22px',
                        filter: isDisabled ? "grayscale(100%)" : "none",
                        opacity: isDisabled ? 0.5 : 1,
                      }}
                      value={boost.name}
                      alt=""
                    />
                  </Box>
                  {boost.label
                    ? boost.label
                    : boost.name +
                      " (+" +
                      Math.floor((boost.value - 1) * 100) +
                      "%)"}
                </ToggleButton>
              );
            })
          ) : (
            <></>
          )}
        </StyledToggleButtonGroup>
      </Box>
    </>
  );
};

export default Boosts;
