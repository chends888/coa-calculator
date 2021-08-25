import React from "react";
// import { styled } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";

const Attribute = ({ maxValue, attributeName, updateAttribute, updateAttribute2, isCurrentLevel }) => {
  const [attribute, setAttribute] = React.useState(null);
  const [attribute2, setAttribute2] = React.useState(0);

  const checkAndUpdateValue = (currentValue, newValue) => {
    let finalValue;
    // console.log('maxValue:', maxValue);
    // console.log('maxValue:', maxValue);
    newValue = Math.floor(newValue);
    // console.log(currentValue, newValue);
    // Check if value is above minimum or equal to undefined (when input is empty)
    if (newValue > 0 || newValue === null) {
      // Check if value is less than maximum
      if (currentValue > maxValue || newValue >= maxValue) {
        finalValue = maxValue;
        setAttribute(maxValue);
      } else {
        finalValue = newValue;
        setAttribute(finalValue);
      }
    } else if (newValue < 0) {
      // console.log(newValue);
      finalValue = 0;
      setAttribute(0);
    } else {
      setAttribute(newValue);
      finalValue = newValue;
    }
    // Update parent component attribute and attribute 2
    updateAttribute(finalValue);
  };

  const checkAndUpdateValue2 = (currentValue, newValue, maxValue) => {
    let finalValue;
    // console.log('maxValue:', maxValue);
    // console.log('maxValue:', maxValue);
    newValue = Math.floor(newValue);
    // console.log(currentValue, newValue);
    // Check if value is above minimum or equal to undefined (when input is empty)
    if (newValue > 0 || newValue === null) {
      // Check if value is less than maximum
      if (currentValue > maxValue || newValue >= maxValue) {
        finalValue = maxValue;
        setAttribute2(maxValue);
      } else {
        finalValue = newValue;
        setAttribute2(finalValue);
      }
    } else if (newValue < 0) {
      // console.log(newValue);
      finalValue = 0;
      setAttribute2(0);
    } else {
      setAttribute2(newValue);
      finalValue = newValue;
    }
    // Update parent component attribute and attribute 2
    updateAttribute2(finalValue);
  };

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
              maxWidth: "25ch",
              minWidth: "25ch",
            },
            // display: flex,
            // "justify-content": center,
            // "align-items": center,
            // alignItems: "center",
          }}
        />
        {isCurrentLevel ? (
          <TextField
            // label=""
            type="number"
            // defaultValue="0"
            value={attribute2}
            InputProps={{
              endAdornment: <InputAdornment>%</InputAdornment>,
            }}
            // Remove initial zero
            // value={('' + attribute).replace(/^0+/, '')}
            onChange={function (event) {
              checkAndUpdateValue2(attribute2, event.target.valueAsNumber, 99);
              // updateAttribute(newAttribute);
            }}
            sx={{
              "& > :not(style)": {
                margin: 1,
                // marginTop: 3,
                // width: "69ch",
                minWidth: "8ch",
                maxWidth: "8ch",
              },
              // display: flex,
              // "justify-content": center,
              // "align-items": center,
              // alignItems: "center",
            }}
          />

        ) : (
          <></>
        )}
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
