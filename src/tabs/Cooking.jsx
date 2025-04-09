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

const Cooking = ({
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
    { name: "Cook's Set I, II and III", value: 1.06, active: false },
    { name: "Chef's (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  // Select foods or baits
  const [selectFoodOrBait, setSelectFoodOrBait] = useState(false);
  const updateselectFoodOrBait = (selectFoodOrBait) => {
    setSelectFoodOrBait(selectFoodOrBait);
    setElement(["loading"]); // Reset element to its original value
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Cooking Level"}
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
          attributeName={"Target Cooking Level"}
          value={targetLevel} // Pass the targetLevel as the value
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Cooking Animation"
          style={{
            width: 'auto',
            height: "55px",
            marginLeft: "16px",
          }}
        />

      </Box>
         <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 2,
              }}
            >
      <CustomSwitch
        value={selectFoodOrBait}
        updateValue={updateselectFoodOrBait}
        options={[
          { label: "Food", value: false },
          { label: "Bait", value: true },
        ]}
        />
        </Box>
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

      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts, false)} exclusive={false} />
      <Boosts boosts={boostsEquipSets} updateBoosts={(boosts) => updateBoosts(boosts, true)} exclusive={true} />

      {selectFoodOrBait === false ? (
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
          boostsEquipSets={boostsEquipSets}
          boostsDidUpdate={boostsDidUpdate}
          skill="Cooking"
        />
      )}
      <Footer />
    </>
  );
};

export default Cooking;
