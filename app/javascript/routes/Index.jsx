import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import EditRecipe from "../components/EditRecipe";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Recipes} />
      <Route path="/recipes" exact component={Recipes} />
      <Route path="/recipe/:id" exact component={Recipe} />
      <Route path="/recipe" exact component={NewRecipe} />
      <Route path="/update/:id" exact component={EditRecipe} />
    </Switch>
  </Router>
);
