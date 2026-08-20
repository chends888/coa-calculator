import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";
import LoadingIndicator from "../components/LoadingIndicator";
import useSkillData from "../hooks/useSkillData";
import { Box, Alert } from "@mui/material";

const ALCHEMY_KEYWORDS = [""];

const MODE_NOTES = {
  0: "Gather + Brew considers you will gather the plants and brew them. So the exp is shared between Gathering and Brewing.",
  1: "Brew Only uses just the brewing XP for each potion, assuming you already have the ingredients (bought or gathered separately).",
  2: "Gather Only calculates raw ingredients (Brightrose, Snowdrops, etc.) for their own gathering XP — no potions are brewed in this mode.",
};

const Alchemy = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage,
  updateCurrentPercentage,
  onPriceUpdate,
}) => {
  const { data: artisanData, isLoading: artisanLoading } = useSkillData("artisan");
  const { data: gatheringData, isLoading: gatheringLoading } = useSkillData("gathering");
  const isLoading = artisanLoading || gatheringLoading || !artisanData || !gatheringData;

  const OPTION_CONFIG = isLoading ? null : {
    0: { skillsData: gatheringData, skill: "Alchemy", calcSkill: "Alchemy" },
    1: { skillsData: artisanData, skill: "Alchemy", calcSkill: "Alchemy-Brew" },
    2: { skillsData: gatheringData, skill: "Alchemy-Gathering", calcSkill: "Alchemy-Gathering" },
  };

  const [element, setElement] = useState(["loading"]);
  const updateElement = (element) => {
    setElement(element);
  };

  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Alchemist's Set I, II and III", value: 1.06, active: false },
    { name: "Alchemist's (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  const [selectedOption, setSelectedOption] = useState(0);
  const updateSelectedOption = (option) => {
    setSelectedOption(option);
    setElement(["loading"]);
  };

  const activeCalcSkill = isLoading ? null : OPTION_CONFIG[selectedOption].calcSkill;

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Alchemy Level"}
        value={currentLevel}
        percentageValue={currentPercentage}
        updateAttribute={updateCurrentLevel}
        updateAttribute2={updateCurrentPercentage}
        isCurrentLevel={true}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70px",
        }}
      >
        <Attribute
          maxValue={120}
          attributeName={"Target Alchemy Level"}
          value={targetLevel}
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Alchemy Animation"
          style={{
            width: "auto",
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
          value={selectedOption}
          updateValue={updateSelectedOption}
          options={[
            { label: "Gather + Brew", value: 0 },
            { label: "Brew Only", value: 1 },
            { label: "Gather Only", value: 2 },
          ]}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2, paddingX: 2 }}>
        <Alert severity="info" sx={{ maxWidth: 600 }}>
          {MODE_NOTES[selectedOption]}
        </Alert>
      </Box>

      {isLoading ? (
        <LoadingIndicator text="Loading Alchemy resources..." />
      ) : (
        <ToggleButtons
          key={selectedOption}
          updateElement={updateElement}
          skillsData={OPTION_CONFIG[selectedOption].skillsData}
          skill={OPTION_CONFIG[selectedOption].skill}
          currentLevel={currentLevel}
        />
      )}

      <Boosts boosts={boosts} updateBoosts={(boosts) => updateBoosts(boosts, false)} exclusive={false} />
      <Boosts boosts={boostsEquipSets} updateBoosts={(boosts) => updateBoosts(boosts, true)} exclusive={true} />
      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={element}
        keywords={ALCHEMY_KEYWORDS}
        boosts={boosts}
        boostsEquipSets={boostsEquipSets}
        boostsDidUpdate={boostsDidUpdate}
        skill={activeCalcSkill}
        onPriceTotalsChange={onPriceUpdate}
      />
      <Footer />
    </>
  );
};

export default Alchemy;
