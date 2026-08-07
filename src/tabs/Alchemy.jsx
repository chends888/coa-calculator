import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";
import { Box } from "@mui/material";

import artisanData from "../data/artisan_data.json";
import gatheringData from "../data/gathering_data.json";

// Hoisted outside the component so this array keeps the same reference across
// renders. Defining it inline in JSX (keywords={[""]}) creates a brand new
// array every render, which was causing Display's useEffect to refire
// endlessly (new reference -> effect runs -> fetch -> state update ->
// re-render -> new reference again -> ...).
const ALCHEMY_KEYWORDS = [""];

// Maps the CustomSwitch's selectedOption to which skill/data-source combo
// should be used for both ToggleButtons and Display, so they always agree.
const OPTION_CONFIG = {
  0: { skillsData: gatheringData, skill: "Alchemy", calcSkill: "Alchemy" },
  1: { skillsData: artisanData, skill: "Alchemy", calcSkill: "Alchemy-Brew" },
  2: { skillsData: gatheringData, skill: "Alchemy-Gathering", calcSkill: "Alchemy-Gathering" },
};

const Alchemy = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage,
  updateCurrentPercentage,
}) => {
  const [element, setElement] = useState(["loading"]);
  const updateElement = (element) => {
    setElement(element);
  };

  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const updateBoosts = (boosts) => {
    setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  // Add a state to handle the user's selection (3 options)
  const [selectedOption, setSelectedOption] = useState(0); // 0 = Gather + Brew, 1 = Brew Only, 2 = Gather Only
  const updateSelectedOption = (option) => {
    setSelectedOption(option);
    setElement(["loading"]); // Reset element to its original value
  };

  const activeCalcSkill = OPTION_CONFIG[selectedOption].calcSkill;

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Alchemy Level"}
        value={currentLevel}
        percentageValue={currentPercentage}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70px",
        }}
      >
        <Attribute
          maxValue={120}
          attributeName={"Target Alchemy Level"}
          value={targetLevel}
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Alchemy Animation"
          style={{
            width: "auto",
            height: "55px",
            marginLeft: "16px",
          }}
        />
      </Box>

      {/* Render a switch or buttons for the three options */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 2,
        }}
      >
        <CustomSwitch
          value={selectedOption}
          updateValue={updateSelectedOption}
          options={[
            { label: "Gather + Brew", value: 0 },
            { label: "Brew Only", value: 1 },
            { label: "Gather Only", value: 2 },
          ]}
        />
      </Box>

      {/* Render ToggleButtons based on the selected option */}
      {selectedOption === 0 && (
        <ToggleButtons
          key={selectedOption}
          updateElement={updateElement}
          skillsData={OPTION_CONFIG[0].skillsData}
          skill={OPTION_CONFIG[0].skill}
          currentLevel={currentLevel}
        />
      )}
      {selectedOption === 1 && (
        <ToggleButtons
          key={selectedOption}
          updateElement={updateElement}
          skillsData={OPTION_CONFIG[1].skillsData}
          skill={OPTION_CONFIG[1].skill}
          currentLevel={currentLevel}
        />
      )}
      {selectedOption === 2 && (
        <ToggleButtons
          key={selectedOption}
          updateElement={updateElement}
          skillsData={OPTION_CONFIG[2].skillsData}
          skill={OPTION_CONFIG[2].skill}
          currentLevel={currentLevel}
        />
      )}

      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts)} exclusive={false} />
      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={ALCHEMY_KEYWORDS}
        boosts={boosts}
        boostsDidUpdate={boostsDidUpdate}
        skill={activeCalcSkill}
      />
      <Footer />
    </>
  );
};

export default Alchemy;
