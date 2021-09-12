import React, { useState } from "react";

import "../App.css";
// import { styled } from "@material-ui/core/styles";
// import Slider from "./components/Slider";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
// import Dropdown from "./components/Dropdown";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";

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
    // console.log("update %", currentPercentage);
    setCurrentPercentage(currentPercentage);
  };
  // Person's target level
  const [targetLevel, setTargetLevel] = useState(1);
  const updateTargetLevel = (targetLevel) => {
    setTargetLevel(targetLevel);
  };
  // Person's target material
  const [material, setMaterial] = useState([
    "material",
    { name: "material", submaterials: {} },
  ]);
  const updateMaterial = (material) => {
    setMaterial(material);
  };

  // Person's target material
  const [artisanData, setArtisanData] = useState({});

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(["Boost name", false]);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate([updatedBoostName, !boostsDidUpdate[1]]);
    // console.log("Boosts update", updatedBoostName);
  };

  // Select foods or baits
  const [selectFoodOrBait, setSelectFoodOrBait] = useState(false);
  const updateselectFoodOrBait = (selectFoodOrBait) => {
    // console.log(selectFoodOrBait);
    setSelectFoodOrBait(selectFoodOrBait);
  };

  React.useEffect(() => {
    // fetch("http://localhost:8000/artisan")
    fetch("https://coa-calculator-backend.herokuapp.com/artisan")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setBusy(false);
        setArtisanData(data);
        // console.log("set busy");
      })
      .catch((error) => {
        // console.log("Error:", error);
      });
  }, []);

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
          updateMaterial={updateMaterial}
          skillsData={artisanData}
          skill="Cooking-Baits"
          currentLevel={currentLevel}
        />
      ) : (
        // Render baits buttons
        <ToggleButtons
          updateMaterial={updateMaterial}
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
          material={material}
          keywords={[""]}
          boosts={boosts}
          boostsDidUpdate={boostsDidUpdate}
        />
      ) : (
        // Results for baits
        <Display
          level={currentLevel}
          levelPercentage={currentPercentage}
          targetLevel={targetLevel}
          material={material}
          keywords={["Cooked"]}
          boosts={boosts}
          boostsDidUpdate={boostsDidUpdate}
          skill="Cooking"
        />
      )}
      {/* <Slider sliderName={"Your Smithing XP"}/>
      <Slider sliderName={"Ore 1"}/>
      <Slider sliderName={"Ore 2"}/> */}
      <Footer />
    </>
  );
};

export default Cooking;
