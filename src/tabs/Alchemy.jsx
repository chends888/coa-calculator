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
  const [selectedOption, setSelectedOption] = useState(0); // 0 = Potions, 1 = Elixirs, 2 = Brews
  const updateSelectedOption = (option) => {
    setSelectedOption(option);
    setElement(["loading"]); // Reset element to its original value
  };

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
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Alchemy"
          currentLevel={currentLevel}
        />
      )}
      {selectedOption === 1 && (
        <ToggleButtons
          updateElement={updateElement}
          skillsData={artisanData}
          skill="Alchemy"
          currentLevel={currentLevel}
        />
      )}
      {selectedOption === 2 && (
        <ToggleButtons
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Alchemy-Gathering"
          currentLevel={currentLevel}
        />
      )}

      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts)} exclusive={false} />
      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={[""]}
        boosts={boosts}
        boostsDidUpdate={boostsDidUpdate}
        skill="Alchemy"
      />
      <Footer />
    </>
  );
};

export default Alchemy;
