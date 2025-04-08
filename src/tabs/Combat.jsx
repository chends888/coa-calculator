import React, { useState } from "react";

import "../App.css";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

// import Alert from '@mui/material/Alert';

import monsterData from "../data/monsters_data.json";

const Combat = ({
  currentLevel,
  updateCurrentLevel,
  targetLevel,
  updateTargetLevel,
  currentPercentage, // Add currentPercentage prop
  updateCurrentPercentage, // Add updateCurrentPercentage prop
}) => {

  // Person's target monster
  const [monster, setMonster] = useState(['loading']);
  const updateMonster = (monster) => {
    setMonster(monster);
  };

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(false);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
    { name: "Exp Relic", value: 1.05, active: false },
    { name: "Small or Medium Exp Pot", value: 1.05, active: false },
    { name: "Large Exp Pot", value: 1.1, active: false },
  ]);
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate(!boostsDidUpdate);
  };

  return (
    <>
      {/* <Alert severity="info">Missing or bugged icons will be updated once new sprites are released</Alert> */}

      <Attribute
        maxValue={120}
        attributeName={"Your Combat Level"}
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
          attributeName={"Target Combat Level"}
          value={targetLevel} // Pass the targetLevel as the value
          updateAttribute={updateTargetLevel}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <img
          src={process.env.PUBLIC_URL + `/images/Mining/mining.gif`}
          alt="Combat Animation"
          style={{
            width: 'auto',
            height: "55px",
            marginLeft: "16px",
          }}
        />
      </Box>
      <ToggleButtons
        updateElement={updateMonster}
        skillsData={monsterData}
        skill="Combat"
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />

      <Display
        level={currentLevel}
        levelPercentage={currentPercentage}
        targetLevel={targetLevel}
        element={monster}
        boosts={boosts}
        boostsEquipSets={[]} // Provide a default empty array for boostsEquipSets
        keywords={[""]}
        skill="Combat"
      />
      <Footer />
    </>
  );
};

export default Combat;
