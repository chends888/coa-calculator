import * as React from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

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

const CustomSwitch = ({ value, updateValue, falseText, trueText, element }) => {
  const handleChange = () => {
    updateValue(!value);
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
        <Div>{falseText}</Div>
        <Grid item>
          {element[0] === "Naturite" ? (
            // Exception for Naturite
            <Switch
              checked={true}
              disabled={true}
              onChange={handleChange}
              color="default"
            />
          ) : (
            <Switch
              checked={!value}
              disabled={false}
              onChange={handleChange}
              color="default"
            />
          )}
        </Grid>
        <Div>{trueText}</Div>
      </Grid>
    </Box>
  );
};

export default CustomSwitch;
