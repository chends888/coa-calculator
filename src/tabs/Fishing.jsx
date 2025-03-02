import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";

import gatheringData from "../data/gathering_data.json";

const Fishing = () => {
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
  // Lollipop price input, to calculate Remote Bank price
  const [lolliPrice, setLolliPrice] = useState(0);
  const updateLolliPrice = (lolliPrice) => {
    setLolliPrice(lolliPrice);
  };

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Shark's Set I, II and III", value: 1.06, active: false },
    { name: "Megalodon's (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  //   Select fished or baits
  const [selectFishOrBait, setSelectFishOrBait] = useState(false);
  const updateselectFishOrBait = (selectFishOrBait) => {
    setSelectFishOrBait(selectFishOrBait);
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Fishing Level"}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Attribute
        maxValue={120}
        attributeName={"Target Fishing Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {selectFishOrBait === true ? (
        // Render bait buttons
        <ToggleButtons
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Fishing-Baits"
          currentLevel={currentLevel}
        />
      ) : (
        // Render fish buttons
        <ToggleButtons
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Fishing"
          currentLevel={currentLevel}
        />
      )}
      <CustomSwitch
        value={selectFishOrBait}
        updateValue={updateselectFishOrBait}
        element={element}
        falseText="Fish"
        trueText="Bait"
      />
      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts, false)} exclusive={false} />
      <Boosts boosts={boostsEquipSets} updateBoosts={(boosts) => updateBoosts(boosts, true)} exclusive={true} />

      {element[0] === 'Bass bait' ? (
        <Attribute
          maxValue={9999999999}
          attributeName={"Current Lolli Price"}
          updateAttribute={updateLolliPrice}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      ) : (
        <></>
      )}

      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={[""]}
        boosts={boosts}
        boostsEquipSets={boostsEquipSets}
        boostsDidUpdate={boostsDidUpdate}
        skill="Fishing"
        lolliPrice={lolliPrice}
      />
      <Footer />
    </>
  );
};

export default Fishing;
