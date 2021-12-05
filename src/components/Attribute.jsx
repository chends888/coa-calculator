import React from "react";
// import { styled } from "@mui/material/styles";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

const Attribute = ({
  maxValue,
  attributeName,
  updateAttribute,
  updateAttribute2,
  isCurrentLevel,
}) => {
  const [attribute, setAttribute] = React.useState(null);
  const [attribute2, setAttribute2] = React.useState(0);

  const checkAndUpdateValue = (currentValue, newValue) => {
    let finalValue;
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
    // Update parent component attribute 2
    updateAttribute2(finalValue);
  };

  const checkIfNaN = (value) => {
    console.log("Value: ", value);
    if (Number.isNaN(value)) {
      // Update attribute 2
      setAttribute2(0);
      // Update parent component attribute 2
      updateAttribute2(0);
    }
    // else {
    //   // Update parent component attribute 2
    //   updateAttribute2(value);
    // }
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
          onFocus={(event) => {
            event.target.select();
          }}
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
            onFocus={(event) => {
              event.target.select();
            }}
            // onBlur={checkIfNaN(event.target.valueAsNumber)}
            onBlur={function (event) {
              checkIfNaN(event.target.valueAsNumber);
              // updateAttribute(newAttribute);
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
