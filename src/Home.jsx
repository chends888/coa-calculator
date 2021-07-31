import React from "react";
import { Tabs, Tab, Box } from "@material-ui/core";
import Smithing from "./tabs/Smithing";
import Cooking from "./tabs/Cooking";
import Crafting from "./tabs/Crafting";
import Header from "./components/Header";

const Home = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: "smithing",
    1: "crafting",
    2: "cooking"
  };

  const indexToTabName = {
    smithing: 0,
    crafting: 1,
    cooking: 2,
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
            <Tab label="Mining (Coming soon)" disabled />
            <Tab label="Woodcutting (Coming soon)" disabled />
            <Tab label="Fishing (Coming soon)" disabled />
          </Tabs>
        </Box>
      </Box>
      {selectedTab === 0 && <Smithing />}
      {selectedTab === 1 && <Crafting />}
      {selectedTab === 2 && <Cooking />}
    </>
  );
};

export default Home;
