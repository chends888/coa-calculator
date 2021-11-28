import React from "react";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "&.Mui-selected": {
    borderColor: "#2e7d32",
    borderRadius: 9,
  },
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    borderColor: "#bdbdbd",
    "&.Mui-disabled": {},
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



const ToggleButtons = ({ updateMaterial, skillsData, skill, currentLevel }) => {
  const [selectedMaterial, setSelectedMaterial] = React.useState();

  const handleChange = (event, newMaterial) => {
    console.log('material:', event.currentTarget.value, newMaterial);
    if (event.currentTarget.value !== "loading") {
      // setSelectedMaterial(event.currentTarget.value);
      setSelectedMaterial(newMaterial);
      // console.log(newMaterial, selectedMaterial);
      if (newMaterial === null) {
        updateMaterial(["material", { name: "material", submaterials: {} }]);
      } else {
        // console.log(currentLevel);
        // console.log(skillsData['Crafting']['Wealth']['level']);
        // console.log("Skills data: ", currentLevel >= parseInt(skillsData[skill]['Gold']['level']));
        console.log('updating material:', event.currentTarget.value, skillsData[skill][event.currentTarget.value]);
        updateMaterial([
          event.currentTarget.value,
          skillsData[skill][event.currentTarget.value],
        ]);
      }
    }
  };
  const createButtons = (levelRange) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 600,
          marginBottom: 0.4,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >

        <Accordion
        // sx={{
        //   // display: "flex",
        //   // flexWrap: "wrap",
        //   // justifyContent: "center",
        //   // maxWidth: 450,
        //   maxWidth: 200,
        //   marginBottom: 1,
        //   marginLeft: "auto",
        //   marginRight: "auto",
        // }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Level {levelRange[0]}-{levelRange[1]}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.keys(skillsData[skill]).map((attribute) =>
              parseInt(skillsData[skill][attribute]['level']) >= levelRange[0] && parseInt(skillsData[skill][attribute]['level']) <= levelRange[1] ? (
                <StyledToggleButtonGroup
                  size="small"
                  value={selectedMaterial}
                  exclusive
                  onChange={handleChange}
                  sx={{
                    padding: 0,
                  }}
                >
                  <ToggleButton
                    value={attribute}
                    onClick={handleChange}
                    sx={{
                      "& > :not(style)": {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        marginRight: 0.4,
                      }}
                    >
                      <img
                        src={`/images/${skill}/${attribute}.gif`}
                        width="22"
                        height="22"
                        value={attribute}
                        // onClick={handleChange}
                        alt=""
                      />
                    </Box>
                    {attribute}
                  </ToggleButton>
                </StyledToggleButtonGroup>
              ) : (
                <></>
              )
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        "& > :not(style)": {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: 450,
          // marginBottom: 1,
          marginLeft: "auto",
          marginRight: "auto",
        },
      }}
    >
      {skillsData[skill] !== undefined ? (
        skill === 'Combat' ? (
          <Box
            sx={{
              marginTop: 2,
              marginBottom: 3
            }}
          >
            {createButtons([1, 50])}
            {createButtons([51, 70])}
            {createButtons([71, 90])}
            {createButtons([91, 150])}
          </Box>
        ) : (

          <StyledToggleButtonGroup
            size="small"
            value={selectedMaterial}
            exclusive
            onChange={handleChange}
            sx={{
              padding: 1,
            }}
          >
            {Object.keys(skillsData[skill]).map((material) =>
              currentLevel >= parseInt(skillsData[skill][material]['level']) ? (
                <ToggleButton
                  value={material}
                  onClick={handleChange}
                  sx={{

                    "& > :not(style)": {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Box
                    sx={{
                      marginRight: 0.4,
                    }}
                  // onClick={handleChange}
                  >
                    <img
                      src={`/images/${skill}/${material}.gif`}
                      width="22"
                      height="22"
                      value={material}
                      // onClick={handleChange}
                      alt=""
                    />
                  </Box>
                  {material}
                </ToggleButton>
              ) : (
                <ToggleButton
                  value={material}
                  disabled
                  sx={{
                    "& > :not(style)": {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  }}
                >
                  <Box
                    sx={{
                      marginRight: 0.4,
                    }}
                  // onClick={handleChange}
                  >
                    <img
                      src={`/images/${skill}/Gray ${material}.gif`}
                      width="22"
                      height="22"
                      value={material}
                      // onClick={handleChange}
                      alt=""
                    />
                  </Box>
                  {material}
                </ToggleButton>
              )
            )}
          </StyledToggleButtonGroup>
        )) : (
        <ToggleButton value="loading" > Loading...</ToggleButton>
      )
      }
    </Box >
  );
};

export default ToggleButtons;
