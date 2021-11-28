import React, { useState } from "react";
import App from "./App";


import { ThemeProvider, createTheme } from "@mui/material/styles";

const AppContainer = () => {
  const [currentTheme, setCurrentTheme] = useState("dark");
  const updateCurrentTheme = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light");
    } else {
      setCurrentTheme("dark");
    }
  };

  const theme = createTheme({
    palette: {
      mode: currentTheme,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <App updateCurrentTheme={updateCurrentTheme} currentTheme={currentTheme}/>
    </ThemeProvider>
  );
};

export default AppContainer;
