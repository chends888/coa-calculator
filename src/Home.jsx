import React, { useState } from "react";

import { Tabs, Tab, Box, TextField, Button } from "@mui/material";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

import Header from "./components/Header";
import Smithing from "./tabs/Smithing";
import Crafting from "./tabs/Crafting";
import Cooking from "./tabs/Cooking";
import Spellbinding from "./tabs/Spellbinding";
import Mining from "./tabs/Mining";
import Woodcutting from "./tabs/Woodcutting";
import Fishing from "./tabs/Fishing";
import Combat from "./tabs/Combat";

import expData from "./data/exp_data.json"; // Import your existing experience data

// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';

const Home = (props) => {
  const { match, history, currentTheme, updateCurrentTheme } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "smithing",
    1: "crafting",
    2: "cooking",
    3: "spellbinding",
    4: "mining",
    5: "woodcutting",
    6: "fishing",
    7: "combat",
  };

  const indexToTabName = {
    smithing: 0,
    crafting: 1,
    cooking: 2,
    spellbinding: 3,
    mining: 4,
    woodcutting: 5,
    fishing: 6,
    combat: 7,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const [skillLevels, setSkillLevels] = useState({
    smithing: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    crafting: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    cooking: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    spellbinding: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    mining: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    woodcutting: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    fishing: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
    combat: { currentLevel: null, targetLevel: null, currentPercentage: 0 },
  });

  const updateSkillLevel = (skill, type, value) => {
    setSkillLevels((prev) => ({
      ...prev,
      [skill]: {
        ...prev[skill],
        [type]: value,
      },
    }));
    console.log(`Updated ${skill} ${type} to ${value}`);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  const [username, setUsername] = useState("");

  const fetchUserLevel = async () => {
    try {
      const response = await fetch(`https://curseofaros.com/highscores-personal.json?user=${username}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log("API Response:", data); // Log the full response

      if (data) {
        const updatedSkillLevels = { ...skillLevels };

        // Iterate over the keys in the response and update skillLevels
        Object.keys(data).forEach((skill) => {
          if (updatedSkillLevels[skill]) {
            const currentLevel = data[skill].level;
            const currentExp = data[skill].xp;
            const nextLevelExp = expData[currentLevel + 1] || currentExp; // Handle max level
            const percentage = Math.round(
              ((currentExp - expData[currentLevel]) / (nextLevelExp - expData[currentLevel])) * 100
            ); // Round to 0 decimal places

            updatedSkillLevels[skill].currentLevel = currentLevel; // Assign the level
            updatedSkillLevels[skill].currentPercentage = Math.min(Math.max(percentage, 0), 99); // Cap percentage at 99
          }
        });

        setSkillLevels(updatedSkillLevels); // Update the state
      } else {
        console.error("No records found for the given username.");
      }
    } catch (error) {
      console.error("Error fetching user level:", error);
    }
  };

  return (
    <>
      <Header
        title="Curse of Aros Skills Calculator"
        updateTheme={updateCurrentTheme}
        currentTheme={currentTheme}
      />
      <Box sx={{ width: "100%", marginBottom: 2, paddingTop: 2, display: "flex", alignItems: "center" }}>
        <TextField
          label="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchUserLevel(); // Trigger fetchUserLevel on Enter key press
            }
          }}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained" // Use Material-UI's contained button style
          color="primary" // Match the primary color of the theme
          onClick={fetchUserLevel}
          sx={{ textTransform: "none" }} // Optional: Prevent uppercase text
        >
          Fetch Level
        </Button>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            // scrollButtons={false}
          >
            <Tab label="Smithing" />
            <Tab label="Crafting" />
            <Tab label="Cooking" />
            <Tab label="Spellbinding" />
            <Tab label="Mining" />
            <Tab label="Woodcutting" />
            <Tab label="Fishing" />
            <Tab label="Combat" />
          </Tabs>
        </Box>
      </Box>
      {selectedTab === 0 && (
        <Smithing
          currentLevel={skillLevels.smithing.currentLevel}
          targetLevel={skillLevels.smithing.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("smithing", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("smithing", "targetLevel", value)
          }
          currentPercentage={skillLevels.smithing.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("smithing", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 1 && (
        <Crafting
          currentLevel={skillLevels.crafting.currentLevel}
          targetLevel={skillLevels.crafting.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("crafting", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("crafting", "targetLevel", value)
          }
          currentPercentage={skillLevels.crafting.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("crafting", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 2 && (
        <Cooking
          currentLevel={skillLevels.cooking.currentLevel}
          targetLevel={skillLevels.cooking.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("cooking", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("cooking", "targetLevel", value)
          }
          currentPercentage={skillLevels.cooking.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("cooking", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 3 && (
        <Spellbinding
          currentLevel={skillLevels.spellbinding.currentLevel}
          targetLevel={skillLevels.spellbinding.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("spellbinding", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("spellbinding", "targetLevel", value)
          }
          currentPercentage={skillLevels.spellbinding.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("spellbinding", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 4 && (
        <Mining
          currentLevel={skillLevels.mining.currentLevel}
          targetLevel={skillLevels.mining.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("mining", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("mining", "targetLevel", value)
          }
          currentPercentage={skillLevels.mining.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("mining", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 5 && (
        <Woodcutting
          currentLevel={skillLevels.woodcutting.currentLevel}
          targetLevel={skillLevels.woodcutting.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("woodcutting", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("woodcutting", "targetLevel", value)
          }
          currentPercentage={skillLevels.woodcutting.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("woodcutting", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 6 && (
        <Fishing
          currentLevel={skillLevels.fishing.currentLevel}
          targetLevel={skillLevels.fishing.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("fishing", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("fishing", "targetLevel", value)
          }
          currentPercentage={skillLevels.fishing.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("fishing", "currentPercentage", value)
          }
        />
      )}
      {selectedTab === 7 && (
        <Combat
          currentLevel={skillLevels.combat.currentLevel}
          targetLevel={skillLevels.combat.targetLevel}
          updateCurrentLevel={(value) =>
            updateSkillLevel("combat", "currentLevel", value)
          }
          updateTargetLevel={(value) =>
            updateSkillLevel("combat", "targetLevel", value)
          }
          currentPercentage={skillLevels.combat.currentPercentage}
          updateCurrentPercentage={(value) =>
            updateSkillLevel("combat", "currentPercentage", value)
          }
        />
      )}
    </>
  );
};

export default Home;
