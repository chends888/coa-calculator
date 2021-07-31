import React from "react";
import { styled } from "@material-ui/core/styles";
import ToggleButton from "@material-ui/core/ToggleButton";
import ToggleButtonGroup from "@material-ui/core/ToggleButtonGroup";
import { Box } from "@material-ui/core";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "&.Mui-selected": {
    borderColor: "#2e7d32",
    borderRadius: 9,
  },
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    // borderLeft: 1,
    borderColor: "#bdbdbd",
    "&.Mui-disabled": {
      border: 1,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      borderColor: "#bdbdbd",
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      borderColor: "#bdbdbd",
    },
  },
}));

const ToggleButtons = ({ updateMaterial, artisanData, skill }) => {
  const [selectedMaterial, setSelectedMaterial] = React.useState();

  const handleChange = (event, newMaterial) => {
    if (event.currentTarget.value !== "loading") {
      // setSelectedMaterial(event.currentTarget.value);
      setSelectedMaterial(newMaterial);
      console.log(newMaterial, selectedMaterial);
      if (newMaterial === null) {
        updateMaterial(["material", { name: "material", submaterials: {} }]);
      } else {
        updateMaterial([
          event.currentTarget.value,
          artisanData[skill][event.currentTarget.value],
        ]);
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            marginBottom: 1,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 450,
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <StyledToggleButtonGroup
          size="small"
          value={selectedMaterial}
          exclusive
          onChange={handleChange}
          sx={{
            // border: 1,
            // borderColor: "#c4c4c4",
            padding: 1,
            // borderTop: 2,
            // borderTop: 2,
          }}
        >
          {artisanData[skill] !== undefined ? (
            Object.keys(artisanData[skill]).map((material) => (
              <ToggleButton
                value={material}
                sx={{
                  // outlineColor: "red",
                  // outlineWidth: "1px",
                  // outlineStyle: "solid",
                  // borderWidth: 4,
                  // borderRadius: "2px",
                  // margin: "20px",
                  "& > :not(style)": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  // border: 1,
                  // borderColor: "#b4b4b4",
                }}
              >
                <Box
                  sx={{
                    marginRight: 0.4,
                  }}
                >
                  <img
                    src={`/images/${skill}/${material}.png`}
                    width="22"
                    height="22"
                    value={material}
                    onClick={handleChange}
                    alt="Material icon"
                  />
                </Box>
                {material}
              </ToggleButton>
            ))
          ) : (
            <ToggleButton value="loading">Loading</ToggleButton>
          )}
          {/* <ToggleButton value="justify" aria-label="justified" disabled>
            qqqqqq
          </ToggleButton> */}
        </StyledToggleButtonGroup>
      </Box>
    </>
  );
};

export default ToggleButtons;
