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



const ToggleButtons = ({ updateElement, skillsData, skill, currentLevel }) => {
  const [selectedElement, setSelectedElement] = React.useState();

  const handleChange = (event, newElement) => {
    if (event.currentTarget.value !== "loading") {
      setSelectedElement(newElement);
      if (newElement === null) {
        updateElement(['loading']);
      } else {
        updateElement([
          event.currentTarget.value,
          skillsData[skill][event.currentTarget.value],
        ]);
      }
    }
  };

  const createCombatButtons = (levelRange) => {
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

        <Accordion>
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
                  value={selectedElement}
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
                        src={process.env.PUBLIC_URL + `/images/${skill}/${attribute}.gif`}
                        width="22"
                        height="22"
                        value={attribute}
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
          maxWidth: 600,
          // marginBottom: 1,
          marginLeft: "auto",
          marginRight: "auto",
        },
      }}
    >
      {skillsData[skill] !== undefined ? (
        // Custom accordion for Combat
        skill === 'Combat' ? (
          <Box
            sx={{
              marginTop: 2,
              marginBottom: 3
            }}
          >
            {createCombatButtons([1, 50])}
            {createCombatButtons([51, 70])}
            {createCombatButtons([71, 90])}
            {createCombatButtons([91, 150])}
            {createCombatButtons([151, 200])}
          </Box>
        ) : (
          // All of other skill's buttons
          <StyledToggleButtonGroup
            size="small"
            value={selectedElement}
            exclusive
            onChange={handleChange}
            sx={{
              padding: 1,
            }}
          >
            {Object.keys(skillsData[skill]).map((element) =>
              currentLevel >= parseInt(skillsData[skill][element]['level']) ? (
                <ToggleButton
                  value={element}
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
                      src={process.env.PUBLIC_URL + `/images/${skill}/${element}.gif`}
                      width="22"
                      height="22"
                      value={element}
                      alt=""
                    />
                  </Box>
                  {element}
                </ToggleButton>
              ) : (
                <ToggleButton
                  value={element}
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
                  >
                    <img
                      src={process.env.PUBLIC_URL + `/images/${skill}/Gray ${element}.gif`}
                      width="22"
                      height="22"
                      value={element}
                      alt=""
                    />
                  </Box>
                  {element}
                </ToggleButton>
              )
            )}
          </StyledToggleButtonGroup>
        )) : (
        <ToggleButton value="loading" >Loading...</ToggleButton>
      )
      }
    </Box >
  );
};

export default ToggleButtons;
