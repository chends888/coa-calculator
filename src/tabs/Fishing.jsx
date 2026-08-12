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
import { Box } from "@mui/material";

const Fishing = ({
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
  const [lolliPrice, setLolliPrice] = useState(0);
  const updateLolliPrice = (lolliPrice) => {
    setLolliPrice(lolliPrice);
  };

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

  const [selectFishOrBait, setSelectFishOrBait] = useState(false);
  const updateselectFishOrBait = (selectFishOrBait) => {
    setSelectFishOrBait(selectFishOrBait);
    setElement(["loading"]);
  };

  return (
    <>
      <Attribute
        maxValue={120}
        attributeName={"Your Fishing Level"}
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
          attributeName={"Target Fishing Level"}
          value={targetLevel}
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Fishing Animation"
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
          value={selectFishOrBait}
          updateValue={updateselectFishOrBait}
          options={[
            { label: "Fish", value: false },
            { label: "Bait", value: true },
          ]}
        />
      </Box>

      {gatheringLoading || !gatheringData ? (
        <LoadingIndicator text="Loading Fishing resources..." />
      ) : selectFishOrBait === true ? (
        <ToggleButtons
          key={selectFishOrBait}
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Fishing-Baits"
          currentLevel={currentLevel}
        />
      ) : (
        <ToggleButtons
          key={selectFishOrBait}
          updateElement={updateElement}
          skillsData={gatheringData}
          skill="Fishing"
          currentLevel={currentLevel}
        />
      )}

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
