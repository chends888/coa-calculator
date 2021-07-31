import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Switch, Redirect } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/smithing" />
      <Route exact path="/:page?" render={(props) => <Home {...props} />} />
      {/* <Route render={() => <Redirect to={{ pathname: "/smithing" }} />} /> */}
    </Switch>
  );
};

export default App;
