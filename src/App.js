import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Switch, Redirect } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

// import { ThemeProvider, createTheme } from "@mui/material/styles";

const App = ({currentTheme, updateCurrentTheme}) => {
  // const [currentTheme, setCurrentTheme] = useState("dark");
  // const updateCurrentTheme = () => {
  //   if (currentTheme === "dark") {
  //     setCurrentTheme("light");
  //   } else {
  //     setCurrentTheme("dark");
  //   }
  //   updateTheme(currentTheme);
  // };

  // const theme = createTheme({
  //   palette: {
  //     mode: currentTheme,
  //   },
  // });

  return (
      <HttpsRedirect>
        <Switch>
          <Redirect exact from="/" to="/smithing" />
          <Route
            exact
            path="/:page?"
            render={(props) => (
              <Home
                {...props}
                currentTheme={currentTheme}
                updateCurrentTheme={updateCurrentTheme}
              />
            )}
          />
        </Switch>
      </HttpsRedirect>
  );
};

export default App;
