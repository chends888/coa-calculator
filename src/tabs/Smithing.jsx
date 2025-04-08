import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";
import BoostCheckbox from "../components/Checkbox";

import artisanData from "../data/artisan_data.json";

const Smithing = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage, // Add currentPercentage prop
  updateCurrentPercentage, // Add updateCurrentPercentage prop
}) => {
  // Person's target element
  const [element, setElement] = useState(["loading"]);
  const updateElement = (element) => {
    setElement(element);
    // Exception for Naturite and others that might not forge
    if (element[0] === "Naturite") {
      setBuyOrSmeltBars(false);
    }
  };

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Infernal Ring", value: 1.04, active: false },
    { name: "Infernal Hammer", value: 1.04, active: false },
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Smith's Set I, II and III", value: 1.06, active: false },
    { name: "Infernal (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };
  // Apply Boosts on bar smelting control
  const [applyBoostOnSmelt, setApplyBoostOnSmelt] = useState(false);
  const updateApplyBoostOnSmelt = (applyBoostOnSmelt) => {
    setApplyBoostOnSmelt(applyBoostOnSmelt);
  };
  // Smelt or buy bars control
  const [buyOrSmeltBars, setBuyOrSmeltBars] = useState(true);
  const updateBuyOrSmeltBars = (buyOrSmeltBars) => {
    setBuyOrSmeltBars(buyOrSmeltBars);
    // Exception for Naturite and others that might not forge
    if (element[0] === "Naturite") {
      setBuyOrSmeltBars(true);
    }
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Smithing Level"}
        value={currentLevel} // Pass the currentLevel as the value
        percentageValue={currentPercentage} // Pass the percentage value directly
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Attribute
        maxValue={120}
        attributeName={"Target Smithing Level"}
        value={targetLevel} // Pass the targetLevel as the value
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ToggleButtons
        updateElement={updateElement}
        skillsData={artisanData}
        skill="Smithing"
        currentLevel={currentLevel}
      />
      <CustomSwitch
        value={buyOrSmeltBars}
        updateValue={updateBuyOrSmeltBars}
        element={element}
        trueText="Smelt Bars"
        falseText="Buy Bars"
      />
      <BoostCheckbox
        applyBoostOnSmelt={applyBoostOnSmelt}
        updateApplyBoostOnSmelt={updateApplyBoostOnSmelt}
        element={element}
      />
      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts, false)} exclusive={false} />
      <Boosts boosts={boostsEquipSets} updateBoosts={(boosts) => updateBoosts(boosts, true)} exclusive={true} />
      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={["Bars"]}
        boosts={boosts}
        boostsEquipSets={boostsEquipSets}
        applyBoostOnSmelt={applyBoostOnSmelt}
        buyOrSmeltBars={buyOrSmeltBars}
        skill="Smithing"
        boostsDidUpdate={boostsDidUpdate}
      />
      {/* <StickyHeadTable/> */}
      <Footer />
    </>
  );
};

export default Smithing;
