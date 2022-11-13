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

const Boosts = ({ boosts, updateBoosts }) => {
  const [selectedBoost, setSelectedBoost] = React.useState([]);

  const handleChange = (event, boostName) => {
    setSelectedBoost(boostName);
    let boostsCopy = boosts;
    for (let i = 0; i < boostsCopy.length; i++) {
      if (boostsCopy[i].name === event.currentTarget.value) {
        boostsCopy[i].active = !boosts[i].active;
      }
    }
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
          // exclusive
          onChange={handleChange}
        >
          {boosts !== undefined ? (
            boosts.map((boost) => (
              <ToggleButton
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
                  {boost.name === 'Small or Medium Exp Pot' ? (
                    <img
                      src={process.env.PUBLIC_URL + `/images/Boosts/${boost.name}.gif`}
                      width="27"
                      height="22"
                      value={boost.name}
                      onClick={handleChange}
                      alt=""
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + `/images/Boosts/${boost.name}.gif`}
                      width="22"
                      height="22"
                      value={boost.name}
                      onClick={handleChange}
                      alt=""
                    />
                  )}
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
