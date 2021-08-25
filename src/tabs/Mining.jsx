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

const Mining = () => {
  // Person's current level
  const [currentLevel, setCurrentLevel] = useState(1);
  const updateCurrentLevel = (currentLevel) => {
    setCurrentLevel(currentLevel);
  };
  // Person's target level
  const [targetLevel, setTargetLevel] = useState(1);
  const updateTargetLevel = (targetLevel) => {
    setTargetLevel(targetLevel);
  };
  // Person's current level percentage
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const updateCurrentPercentage = (currentPercentage) => {
    currentPercentage = currentPercentage / 100;
    console.log("update %", currentPercentage);
    setCurrentPercentage(currentPercentage);
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
  const [gatheringData, setGatheringData] = useState({});

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(["Boost name", false]);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Prospector's Necklace", value: 1.05, active: false },
  ]);
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate([updatedBoostName, !boostsDidUpdate[1]]);
    // console.log("Boosts update", updatedBoostName);
  };

  React.useEffect(() => {
    // fetch("http://localhost:8000/gathering")
    fetch("https://coa-calculator-backend.herokuapp.com/gathering")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setBusy(false);
        setGatheringData(data);
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
        attributeName={"Your Mining Level"}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Attribute
        
        maxValue={120}
        attributeName={"Target Mining Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ToggleButtons
        updateMaterial={updateMaterial}
        skillsData={gatheringData}
        skill="Mining"
        currentLevel={currentLevel}
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />

      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        material={material}
        keywords={[""]}
        boosts={boosts}
        boostsDidUpdate={boostsDidUpdate}
      />
      {/* <Slider sliderName={"Your Smithing XP"}/>
      <Slider sliderName={"Ore 1"}/>
      <Slider sliderName={"Ore 2"}/> */}
      <Footer />
    </>
  );
};

export default Mining;
