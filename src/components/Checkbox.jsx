import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Box from "@material-ui/core/Box";

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
