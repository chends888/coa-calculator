import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Switch, Redirect } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

const App = ({ currentTheme, updateCurrentTheme }) => {

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
