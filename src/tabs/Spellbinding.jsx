import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

import artisanData from "../data/artisan_data.json";

const Spellbinding = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage, // Add currentPercentage prop
  updateCurrentPercentage, // Add updateCurrentPercentage prop
}) => {
  // Person's target element
  const [element, setElement] = useState(['loading']);
  const updateElement = (element) => {
    setElement(element);
  };

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Binder's Set I, II and III", value: 1.06, active: false },
    { name: "Weaver's (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Spellbinding Level"}
        value={currentLevel} // Pass the currentLevel as the value
        percentageValue={currentPercentage} // Pass the percentage value directly
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center horizontally
          height: "70px", // Set a height to center vertically
        }}
      >
        <Attribute
          maxValue={120}
          attributeName={"Target Spellbinding Level"}
          value={targetLevel} // Pass the targetLevel as the value
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: 'auto',
            height: "55px",
            marginLeft: "16px",
          }}
        >
          <source src={`${process.env.PUBLIC_URL}/images/Mining/mining.webm`} type="video/webm" />
          <source src={`${process.env.PUBLIC_URL}/images/Mining/mining.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Box>
      <ToggleButtons
        updateElement={updateElement}
        skillsData={artisanData}
        skill="Spellbinding"
        currentLevel={currentLevel}
      />
      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts, false)} exclusive={false} />
      <Boosts boosts={boostsEquipSets} updateBoosts={(boosts) => updateBoosts(boosts, true)} exclusive={true} />

      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={[""]}
        boosts={boosts}
        boostsEquipSets={boostsEquipSets}
        boostsDidUpdate={boostsDidUpdate}
        skill="Spellbinding"
      />
      <Footer />
    </>
  );
};

export default Spellbinding;
