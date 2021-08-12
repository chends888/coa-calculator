import React from "react";
import { Tabs, Tab, Box } from "@material-ui/core";

import Smithing from "./tabs/Smithing";
import Cooking from "./tabs/Cooking";
import Crafting from "./tabs/Crafting";
import Mining from "./tabs/Mining";
import Woodcutting from "./tabs/Woodcutting";
import Header from "./components/Header";

const Home = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "smithing",
    1: "crafting",
    2: "cooking",
    3: "mining",
    4: "woodcutting",
  };

  const indexToTabName = {
    smithing: 0,
    crafting: 1,
    cooking: 2,
    mining: 3,
    woodcutting: 4,
  };

  const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

  const handleChange = (event, newValue) => {
    history.push(`/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 1 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            variant="scrollable"
            // scrollButtons={false}
          >
            <Tab label="Smithing" />
            <Tab label="Crafting" />
            <Tab label="Cooking" />
            <Tab label="Mining" />
            <Tab label="Woodcutting" />
            <Tab label="Fishing (Coming soon)" disabled />
          </Tabs>
        </Box>
      </Box>
      {selectedTab === 0 && <Smithing />}
      {selectedTab === 1 && <Crafting />}
      {selectedTab === 2 && <Cooking />}
      {selectedTab === 3 && <Mining />}
      {selectedTab === 4 && <Woodcutting />}
    </>
  );
};

export default Home;
