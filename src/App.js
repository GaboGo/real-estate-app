import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./routes/Home"
import Details from "./routes/Details"

export default function App() {

  const [cards, setCards] = useState([])

  const fillCards=(obj)=>{
    setCards(obj)
  }
  
  return (
    <div className="App">
        <Switch>
            <Route exact path="/">
              <Home setCrds={fillCards}/>
            </Route>
            <Route exact 
                   path="/properties/:propertyId" 
                   render={(props) => {
                       return (
                         <Details data={cards} {...props} />
                       )
                   }}
            />
            <Redirect to="/" />
        </Switch>
    </div>
  );
}
