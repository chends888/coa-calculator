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

const Mining = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage,
  updateCurrentPercentage,
  onPriceUpdate,
}) => {
  const { data: gatheringData, isLoading: gatheringLoading } = useSkillData("gathering");

  const [element, setElement] = useState(['loading']);
  const updateElement = (element) => {
    setElement(element);
    // Ore Bag doesn't apply to Naturite (it already uses its own inventory
    // size), so deactivate it if it was on when switching to Naturite.
    if (element[0] === "Naturite") {
      setBoosts((prev) =>
        prev.map((boost) =>
          boost.name === "Ore Bag" ? { ...boost, active: false } : boost
        )
      );
    }
  };

  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Prospector's Necklace", value: 1.05, active: false },
    { name: "Relic of Wisdom", value: 1.05, active: false },
    { name: "Ore Bag", label: "Ore Bag (18 extra ores)", value: 1, active: false },
  ]);
  const [boostsEquipSets, setBoostsEquipSets] = useState([
    { name: "Golem's Set I, II and III", value: 1.06, active: false },
    { name: "Seismic (Elite) Set", value: 1.12, active: false },
  ]);
  const updateBoosts = (boosts, isEquipSet = false) => {
    isEquipSet ? setBoostsEquipSets(boosts) : setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  const isNaturiteSelected = element[0] === "Naturite";
  const disabledBoostNames = isNaturiteSelected ? ["Ore Bag"] : [];
  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Mining Level"}
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
          attributeName={"Target Mining Level"}
          value={targetLevel}
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Mining Animation"
          style={{
            width: 'auto',
            height: "55px",
            marginLeft: "16px",
          }}
        />
      </Box>

      {gatheringLoading || !gatheringData ? (
        <LoadingIndicator text="Loading Mining resources..." />
      ) : (
        <ToggleButtons
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Mining"
          currentLevel={currentLevel}
        />
      )}

      <Boosts
        boosts={boosts}
        updateBoosts={(boosts) => updateBoosts(boosts, false)}
        exclusive={false}
        disabledNames={disabledBoostNames}
      />
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
        skill="Mining"
        onPriceTotalsChange={onPriceUpdate}
      />
      <Footer />
    </>
  );
};

export default Mining;
