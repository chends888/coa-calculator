import React from "react";
  import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const CustomSwitch = ({ value, updateValue, options }) => {
  if (!options || options.length === 0) {
    console.error("CustomSwitch requires a valid 'options' prop.");
    return null;
  }

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={(event, newValue) => {
        if (newValue !== null) {
          updateValue(newValue);
        }
      }}
      aria-label="Custom Switch"
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value} aria-label={option.label}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default CustomSwitch;
