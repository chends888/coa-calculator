import React from "react";

// import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";
import { ToggleButton } from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import { styled } from "@material-ui/core/styles";

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
                  <img
                    src={`/images/Boosts/${boost.name}.png`}
                    width="22"
                    height="22"
                    value={boost.name}
                    onClick={handleChange}
                    alt="Icon"
                  />
                </Box>
                {boost.name +
                  " (+" +
                  Math.floor((boost.value - 1) * 100) +
                  "%)"}
              </ToggleButton>
              // <FormControlLabel
              //   control={
              //     <Checkbox
              //       // checked={boost.active}
              //       onChange={() => {
              //         handleChange(boost.name);
              //       }}
              //     />
              //   }
              //   label={
              //     boost.name + "(+" + Math.floor((boost.value - 1) * 100) + "%)"
              //   }
              // />
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
