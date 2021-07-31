import React from "react";
import { styled } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = styled((theme) => ({
  formControl: {
    width: 120,
    margin: theme.spacing(1),
  },
}));

const Dropdown = ({ updateMaterial }) => {
  const [material, setMaterial] = React.useState("");

  const handleChange = (event) => {
    setMaterial(event.target.value);
    updateMaterial(event.target.value);
  };
  return (
    <>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Material</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={material}
          onChange={handleChange}
        >
          <MenuItem value={"Iron bar"}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default Dropdown;
