import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import CssBaseline from "@material-ui/core/CssBaseline";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

let currentTheme = "dark";
const theme = createTheme({
  palette: {
    mode: currentTheme,
  },
});
// const updateTheme = (theme) => {
//   currentTheme = theme;
//   // console.log("updated theme", currentTheme);
//   theme = createTheme({
//     palette: {
//       mode: theme,
//     },
//   });
// };



const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
