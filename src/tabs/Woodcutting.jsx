import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import LoadingIndicator from "../components/LoadingIndicator";
import useSkillData from "../hooks/useSkillData";
import { Box } from "@mui/material";

const Woodcutting = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage,
  updateCurrentPercentage,
}) => {
  const { data: gatheringData, isLoading: gatheringLoading } = useSkillData("gathering");

  const [element, setElement] = useState(['loading']);
  const updateElement = (element) => {
    setElement(element);
  };

  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Relic of Wisdom", value: 1.05, active: false }
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Ent's Set I, II and III", value: 1.06, active: false },
    { name: "Dryad's (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Woodcutting Level"}
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
          attributeName={"Target Woodcutting Level"}
          value={targetLevel}
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Woodcutting Animation"
          style={{
            width: 'auto',
            height: "55px",
            marginLeft: "16px",
          }}
        />
      </Box>

      {gatheringLoading || !gatheringData ? (
        <LoadingIndicator text="Loading Woodcutting resources..." />
      ) : (
        <ToggleButtons
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Woodcutting"
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
        keywords={[""]}
        boosts={boosts}
        boostsEquipSets={boostsEquipSets}
        boostsDidUpdate={boostsDidUpdate}
        skill="Woodcutting"
      />
      <Footer />
    </>
  );
};

export default Woodcutting;
