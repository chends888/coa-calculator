import React from "react";
// import { styled } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const Attribute = ({ minValue, maxValue, attributeName, updateAttribute }) => {
  const [attribute, setAttribute] = React.useState(1);

  const checkAndUpdateValue = (currentValue, newValue) => {
    let finalValue;
    // Check if value is above minimum
    if (currentValue > minValue || newValue >= minValue) {
      // Check if value is less tha maximum
      if (currentValue > maxValue || newValue >= maxValue) {
        finalValue = 120;
        setAttribute(finalValue);
      } else {
        finalValue = newValue;
        setAttribute(finalValue);
      }
    } else {
      finalValue = minValue;
      setAttribute(finalValue);
    }
    // Update parent component attribute
    updateAttribute(finalValue);
  };

  React.useEffect(() => {
    // eslint-disable-next-line
    if (minValue + 1 > attribute && minValue != 0) {
      // eslint-disable-next-line
      if (minValue > 1) {
        checkAndUpdateValue(attribute, minValue + 10);
      } else {
        checkAndUpdateValue(attribute, minValue + 9);
      }
    }
    // eslint-disable-next-line
  }, [minValue]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          // href="#outlined-buttons"
          onClick={() => {
            checkAndUpdateValue(attribute, attribute - 1, true);
            // setAttribute(newAttribute);
            // updateAttribute(newAttribute);
          }}
        >
          -
        </Button> */}
        <TextField
          label={attributeName}
          type="number"
          // defaultValue="1"
          value={attribute}
          // Remove initial zero
          // value={('' + attribute).replace(/^0+/, '')}
          onChange={function (event) {
            checkAndUpdateValue(attribute, event.target.valueAsNumber);
            // updateAttribute(newAttribute);
          }}
          sx={{
            "& > :not(style)": {
              margin: 1,
              // marginTop: 3,
              width: "22ch",
            },
            // display: flex,
            // "justify-content": center,
            // "align-items": center,
            // alignItems: "center",
          }}
        />
        {/* <Button
          variant="outlined"
          color="primary"
          className={styles.button}
          // href="#outlined-buttons"
          onClick={() => {
            checkAndUpdateValue(attribute, attribute + 1, true);
            // setAttribute(newAttribute);
            // updateAttribute(newAttribute);
          }}
        >
          +
        </Button> */}
      </Box>
    </>
  );
};

export default Attribute;
