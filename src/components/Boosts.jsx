import React from "react";

// import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import { ToggleButton } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { styled } from "@mui/material/styles";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .Mui-selected": {
    color: "error",
  },
  "& .MuiToggleButtonGroup-grouped": {
    // margin: theme.spacing(0.5),
    borderColor: "#bdbdbd",
    // border:1,
    // "&.Mui-disabled": {
    //   // border: 1,
    // },
    "&:not(:first-of-type)": {
      // borderRadius: theme.shape.borderRadius,
      // borderLeft: 1,
      // borderColor: "#bdbdbd",
    },
    "&:first-of-type": {
      marginLeft: theme.spacing(1),
      // borderRadius: theme.shape.borderRadius,
      // borderColor: "#bdbdbd",
    },
    "&:last-of-type": {
      marginRight: theme.spacing(1),
      // borderRadius: theme.shape.borderRadius,
      // borderColor: "#bdbdbd",
    },
  },
}));

const Boosts = ({ boosts, updateBoosts }) => {
  const [selectedBoost, setSelectedBoost] = React.useState([]);

  const handleChange = (event, boostName) => {
    // console.log(boosts, boostName);
    setSelectedBoost(boostName);
    let boostsCopy = boosts;
    for (let i = 0; i < boostsCopy.length; i++) {
      if (boostsCopy[i].name === event.currentTarget.value) {
        // console.log("boosts active:", boosts[i].active);
        boostsCopy[i].active = !boosts[i].active;
      }
    }
    // console.log('boosts:', boostsCopy);
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
        // sx={{ border: 1, borderColor: "#c4c4c4", padding: 1 }}
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
                    // border: 1,
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
                      src={`/images/Boosts/${boost.name}.gif`}
                      width="27"
                      height="22"
                      value={boost.name}
                      onClick={handleChange}
                      alt=""
                    />
                  ) : (
                    <img
                      src={`/images/Boosts/${boost.name}.gif`}
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
