import * as React from "react";
import Switch from "@material-ui/core/Switch";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const Div = styled("div")(({ theme }) => ({
  ...theme.typography.button,
  //   backgroundColor: theme.palette.background.paper,
  //   padding: theme.spacing(1),
}));

const SmithingSwitch = ({ buyOrSmeltBars, updateBuyOrSmeltBars }) => {
  const handleChange = () => {
    updateBuyOrSmeltBars(!buyOrSmeltBars);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        // maxWidth: "100",
      }}
    >
      <Grid
        // component="label"
        container
        sx={{
          // display: "flex",
          flexGrow: 1,
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 1,
          marginTop: 1,
        }}
        spacing={0}
      >
        <Div>Smelt Bars</Div>
        <Grid item>
          <Switch
            // checked={} // relevant state for your case
            onChange={handleChange} // relevant method to handle your change
            color="default"
          />
        </Grid>
        <Div>Buy Bars</Div>
      </Grid>
    </Box>
  );
};

export default SmithingSwitch;
