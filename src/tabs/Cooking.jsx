import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";

import artisanData from "../data/artisan_data.json";

const Cooking = () => {
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
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  // Select foods or baits
  const [selectFoodOrBait, setSelectFoodOrBait] = useState(false);
  const updateselectFoodOrBait = (selectFoodOrBait) => {
    setSelectFoodOrBait(selectFoodOrBait);
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Cooking Level"}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Attribute
        maxValue={120}
        attributeName={"Target Cooking Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {selectFoodOrBait === true ? (
        // Render food buttons
        <ToggleButtons
          updateElement={updateElement}
          skillsData={artisanData}
          skill="Cooking-Baits"
          currentLevel={currentLevel}
        />
      ) : (
        // Render baits buttons
        <ToggleButtons
          updateElement={updateElement}
          skillsData={artisanData}
          skill="Cooking"
          currentLevel={currentLevel}
        />
      )}
      <CustomSwitch
        value={selectFoodOrBait}
        updateValue={updateselectFoodOrBait}
        falseText="Food"
        trueText="Bait"
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />

      {selectFoodOrBait === true ? (
        // Results for food
        <Display
          level={currentLevel}
          levelPercentage={currentPercentage}
          targetLevel={targetLevel}
          element={element}
          keywords={[""]}
          boosts={boosts}
          boostsDidUpdate={boostsDidUpdate}
          skill="Cooking"
        />
      ) : (
        // Results for baits
        <Display
          level={currentLevel}
          levelPercentage={currentPercentage}
          targetLevel={targetLevel}
          element={element}
          keywords={["Cooked"]}
          boosts={boosts}
          boostsDidUpdate={boostsDidUpdate}
          skill="Cooking"
        />
      )}
      <Footer />
    </>
  );
};

export default Cooking;
