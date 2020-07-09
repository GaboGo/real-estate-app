import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./routes/Home"
import Details from "./routes/Details"

export default function App() {
  
  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact 
                   path="/properties/:propertyId" 
                   render={(props) => {
                       return (
                         <Details {...props} />
                       )
                   }}
            />
            <Redirect to="/" />
        </Switch>
    </div>
  );
}
