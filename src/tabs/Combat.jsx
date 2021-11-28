import React, { useState } from "react";

import "../App.css";
// import { styled } from "@monster-ui/core/styles";
// import Slider from "./components/Slider";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
// import Dropdown from "./components/Dropdown";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";



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
    // fetch("http://localhost:8000/monsters")
    fetch("https://coa-calculator-backend.herokuapp.com/monsters")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setBusy(false);
        console.log("got data", data);
        setMonsterData(data);
      })
      .catch((error) => {
        // console.log("Error:", error);
      });
  }, []);

  return (
    <>
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
      {/* <Dropdown
        updateAttribute={updateMonster}
        data={monsterData}
        skill="Combat"
        // currentLevel={currentLevel}
      /> */}
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
