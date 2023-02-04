import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

const BoostCheckbox = ({
  applyBoostOnSmelt,
  updateApplyBoostOnSmelt,
  element,
}) => {
  const handleChange = () => {
    if (element[0] === "Naturite") {
      updateApplyBoostOnSmelt(true);
    } else {
      updateApplyBoostOnSmelt(!applyBoostOnSmelt);
    }
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
      {element[0] === "Naturite" ? (
        // Exception for Naturite
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={true}
                onChange={handleChange()}
                disabled={true}
                onLoad={handleChange()}
              />
            }
            label="Apply Boosts on bar Smelting"
          />
          {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
        </FormGroup>
      ) : (
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={applyBoostOnSmelt}
                onChange={handleChange}
                disabled={false}
              />
            }
            label="Apply Boosts on bar Smelting"
          />
          {/* <FormControlLabel disabled control={<Checkbox />} label="Disabled" /> */}
        </FormGroup>
      )}
    </Box>
  );
};

export default BoostCheckbox;
