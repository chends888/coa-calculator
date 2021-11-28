import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

const BoostCheckbox = ({ applyBoostOnSmelt, updateApplyBoostOnSmelt }) => {
  const handleChange = () => {
    updateApplyBoostOnSmelt(!applyBoostOnSmelt);
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
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox checked={applyBoostOnSmelt} onChange={handleChange} />
          }
          label="Apply Boosts on bar Smelting"
        />
        {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
      </FormGroup>
    </Box>
  );
};

export default BoostCheckbox;
