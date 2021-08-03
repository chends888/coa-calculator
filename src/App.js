import React from "react";
import "./App.css";
import Home from "./Home";
import { Route, Switch, Redirect } from "react-router-dom";
import HttpsRedirect from 'react-https-redirect';


const App = () => {
  return (
    <Switch>
      <HttpsRedirect>
      <Redirect exact from="/" to="/smithing" />
      <Route exact path="/:page?" render={(props) => <Home {...props} />} />
      {/* <Route render={() => <Redirect to={{ pathname: "/smithing" }} />} /> */}
      </HttpsRedirect>
    </Switch>
  );
};

export default App;
