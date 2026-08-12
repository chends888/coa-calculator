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

// Single reusable image element: color when unlocked, grayscale (via CSS
// filter) when locked. Replaces the old approach of loading a separate
// "Gray X.gif" file per item, so only one image copy is needed per item.
const ItemImage = ({ skill, name, locked }) => (
  <img
    src={process.env.PUBLIC_URL + `/images/${skill}/${name}.gif`}
    width="22"
    height="22"
    alt=""
    style={{
      filter: locked ? "grayscale(100%)" : "none",
      opacity: locked ? 0.5 : 1,
    }}
  />
);

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
          width: "100%",
          maxWidth: 600,
          marginBottom: 0.4,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >

        <Accordion sx={{ width: "100%" }}>
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
                      <ItemImage skill={skill} name={attribute} locked={false} />
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
            {(() => {
              const levels = Object.values(skillsData[skill]).map((m) => parseInt(m['level']));
              const maxLevel = Math.max(...levels);
              const bucketSize = 50;
              const ranges = [];
              for (let start = 1; start <= maxLevel; start += bucketSize) {
                ranges.push([start, start + bucketSize - 1]);
              }
              return ranges.map((range) => (
                <React.Fragment key={range[0]}>{createCombatButtons(range)}</React.Fragment>
              ));
            })()}
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
            {Object.keys(skillsData[skill]).map((element) => {
              const isUnlocked = currentLevel >= parseInt(skillsData[skill][element]['level']);
              return (
                <ToggleButton
                  value={element}
                  onClick={isUnlocked ? handleChange : undefined}
                  disabled={!isUnlocked}
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
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ marginRight: 0.4 }}>
                        <ItemImage skill={skill} name={element} locked={!isUnlocked} />
                      </Box>
                      {element}
                    </Box>
                    <Box
                      component="span"
                      sx={{
                        fontSize: "0.65rem",
                        color: "text.secondary",
                        lineHeight: 1.2,
                      }}
                    >
                      Lvl {skillsData[skill][element]['level']}
                    </Box>
                  </Box>
                </ToggleButton>
              );
            })}
          </StyledToggleButtonGroup>
        )) : (
        <ToggleButton value="loading" >Loading...</ToggleButton>
      )
      }
    </Box >
  );
};

export default ToggleButtons;
