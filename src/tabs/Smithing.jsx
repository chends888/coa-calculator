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
import BoostCheckbox from "../components/Checkbox";

// Max bar input: 567.019.187
const Smithing = () => {
  // Person's current level
  const [currentLevel, setCurrentLevel] = useState([1, 0]);
  const updateCurrentLevel = (currentLevel) => {
    setCurrentLevel(currentLevel);
  };
  // Person's target level
  const [targetLevel, setTargetLevel] = useState([1, 0]);
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
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Infernal Ring", value: 1.04, active: false },
    { name: "Infernal Hammer", value: 1.04, active: false },
  ]);
  const updateBoosts = (boosts) => {
    setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
    // console.log("Boosts update", updatedBoostName);
  };
  // Apply Boosts on bar smelting control
  const [applyBoostOnSmelt, setApplyBoostOnSmelt] = useState(false);
  const updateApplyBoostOnSmelt = (applyBoostOnSmelt) => {
    // console.log(applyBoostOnSmelt);
    setApplyBoostOnSmelt(applyBoostOnSmelt);
  };
  // Smelt or buy bars controll
  const [buyOrSmeltBars, setBuyOrSmeltBars] = useState(false);
  const updateBuyOrSmeltBars = (buyOrSmeltBars) => {
    // console.log(buyOrSmeltBars);
    // console.log(buyOrSmeltBars);
    setBuyOrSmeltBars(buyOrSmeltBars);
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
        console.log("Error on fetch Artisan Skills data:", error);
      });
  }, []);

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Smithing Level"}
        updateAttribute={updateCurrentLevel}
        isCurrentLevel={true}
      />
      <Attribute
        maxValue={120}
        attributeName={"Target Smithing Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      <ToggleButtons
        updateMaterial={updateMaterial}
        skillsData={artisanData}
        skill="Smithing"
      />
      <CustomSwitch
        value={buyOrSmeltBars}
        updateValue={updateBuyOrSmeltBars}
        falseText="Smelt Bars"
        trueText="Buy Bars"
      />
      <BoostCheckbox
        applyBoostOnSmelt={applyBoostOnSmelt}
        updateApplyBoostOnSmelt={updateApplyBoostOnSmelt}
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />
      <Display
        level={currentLevel}
        targetLevel={targetLevel}
        material={material}
        keywords={["Bars"]}
        boosts={boosts}
        applyBoostOnSmelt={applyBoostOnSmelt}
        buyOrSmeltBars={buyOrSmeltBars}
      />
      {/* <Slider sliderName={"Your Smithing XP"}/>
      <Slider sliderName={"Ore 1"}/>
      <Slider sliderName={"Ore 2"}/> */}
      <Footer />
    </>
  );
};

export default Smithing;
