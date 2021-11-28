import React, { useState } from "react";

import "../App.css";
// import { styled } from "@monster-ui/core/styles";
// import Slider from "./components/Slider";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import Alert from '@mui/material/Alert';




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
    // console.log("update %", currentPercentage);
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

  // Monster data
  const [monsterData, setMonsterData] = useState({});

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
    // console.log("Boosts update", updatedBoostName);
  };

  React.useEffect(() => {
    // Custom url depending if on develop or prod server
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      var url = "http://localhost:8000/monsters";
    } else {
      var url = "https://coa-calculator-backend.herokuapp.com/monsters";
    }
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setBusy(false);
        setMonsterData(data);
      })
      .catch((error) => {
        console.log("Error on fetch Monsters data:", error);
      });
  }, []);

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
      // currentLevel={9999}
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
      {/* <Slider sliderName={"Your Smithing XP"}/>
      <Slider sliderName={"Ore 1"}/>
      <Slider sliderName={"Ore 2"}/> */}
      <Footer />
    </>
  );
};

export default Combat;
