import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import Alert from '@mui/material/Alert';

import monsterData from "../data/monsters_data.json";

const Combat = () => {
  // Person's current level
  const [currentLevel, setCurrentLevel] = useState(1);
  const updateCurrentLevel = (currentLevel) => {
    setCurrentLevel(currentLevel);
  };
  // Person's current level percentage
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const updateCurrentPercentage = (currentPercentage) => {
    currentPercentage = currentPercentage / 100;
    setCurrentPercentage(currentPercentage);
  };
  // Person's target level
  const [targetLevel, setTargetLevel] = useState(1);
  const updateTargetLevel = (targetLevel) => {
    setTargetLevel(targetLevel);
  };
  // Person's target monster
  const [monster, setMonster] = useState(['loading']);
  const updateMonster = (monster) => {
    setMonster(monster);
  };

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Exp Relic", value: 1.05, active: false },
    { name: "Small or Medium Exp Pot", value: 1.05, active: false },
    { name: "Large Exp Pot", value: 1.1, active: false },
  ]);
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  return (
    <>
      <Alert severity="info">Missing or bugged icons will be updated once new sprites are released</Alert>

      <Attribute
        maxValue={120}
        attributeName={"Your Combat Level"}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Attribute
        maxValue={120}
        attributeName={"Target Combat Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ToggleButtons
        updateElement={updateMonster}
        skillsData={monsterData}
        skill="Combat"
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />

      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={monster}
        boosts={boosts}
        keywords={[""]}
        skill="Combat"
      />
      <Footer />
    </>
  );
};

export default Combat;
