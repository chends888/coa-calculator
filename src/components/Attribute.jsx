import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

const Attribute = ({
  maxValue,
  attributeName,
  value, // Value for the main level field
  percentageValue, // Value for the percentage field
  updateAttribute,
  updateAttribute2,
  isCurrentLevel,
}) => {
  const checkAndUpdateValue = (newValue) => {
    let finalValue;
    newValue = Math.floor(newValue);

    if (newValue > 0 || newValue === null) {
      if (newValue >= maxValue) {
        finalValue = maxValue;
      } else {
        finalValue = newValue;
      }
    } else if (newValue < 0) {
      finalValue = 0;
    } else {
      finalValue = newValue;
    }
    // Update parent component attribute
    updateAttribute(finalValue);
  };

  const checkAndUpdateValue2 = (newValue) => {
    let finalValue;
    newValue = Math.floor(newValue);

    if (newValue > 0 || newValue === null) {
      if (newValue >= 99) {
        finalValue = 99; // Cap percentage at 99
      } else {
        finalValue = newValue;
      }
    } else if (newValue < 0) {
      finalValue = 0;
    } else {
      finalValue = newValue;
    }
    // Update parent component attribute2
    updateAttribute2(finalValue);
  };

  const checkIfNaN = (value) => {
    if (Number.isNaN(value)) {
      updateAttribute2(0);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TextField
        label={attributeName}
        type="text" // Change to "text" to fully control input
        value={value || ""} // Ensure value is a valid string
        onFocus={(event) => {
          event.target.select();
        }}
        onChange={(event) => {
          const input = event.target.value;
          const sanitizedValue = input.replace(/[^0-9]/g, ""); // Remove non-numeric characters
          const numericValue = sanitizedValue === "" ? 0 : parseInt(sanitizedValue, 10);
          checkAndUpdateValue(numericValue);
        }}
        inputProps={{
          inputMode: "numeric", // Use numeric input mode
        }}
        sx={{
          "& > :not(style)": {
            margin: 1,
            maxWidth: "25ch",
            minWidth: "25ch",
          },
        }}
      />
      {isCurrentLevel ? (
        <TextField
          type="number"
          value={percentageValue.toString()} // Ensure the value is always a string
          InputProps={{
            endAdornment: <InputAdornment>%</InputAdornment>,
          }}
          onFocus={(event) => {
            event.target.select();
          }}
          onBlur={(event) => {
            checkIfNaN(event.target.valueAsNumber);
          }}
          onChange={(event) => {
            let newValue = event.target.value;

            // Prevent multiple leading zeros
            if (newValue.length > 1 && newValue.startsWith("0")) {
              newValue = newValue.replace(/^0+/, "0"); // Replace multiple leading zeros with a single "0"
            }

            // Ensure the value is numeric
            const numericValue = parseInt(newValue, 10);
            if (!Number.isNaN(numericValue)) {
              checkAndUpdateValue2(numericValue); // Update the percentage value in the parent state
            } else {
              updateAttribute2(0); // Default to 0 if the input is invalid
            }
          }}
          inputProps={{
            inputMode: "numeric", // Use numeric input mode
          }}
          sx={{
            "& > :not(style)": {
              margin: 1,
              minWidth: "8ch",
              maxWidth: "8ch",
            },
          }}
        />
      ) : null}
    </Box>
  );
};

export default Attribute;
