import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}


  componentDidMount() {
      const url = "/api/v1/recipes/index";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(response => this.setState({ recipes: response }))
        .catch(() => this.props.history.push("/"));
  }

  render() {
    const { recipes } = this.state;
    const allRecipes = recipes.map((recipe, index) => (
      <div key={index} className="col-md-6 col-lg-4">
        <div className="card mb-4">
          <img
            src={recipe.image.url}
            className="card-img-top"
            alt={`${recipe.name} image`}
          />
          <div className="card-body">
            <h3 className="card-title text-center">{recipe.name}</h3>
            <Link to={`/recipe/${recipe.id}`} className="stretched-link"></Link>
          </div>
        </div>
      </div>
    ));
    
    const noRecipe = (
      <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
        <h4>
          No recipes yet. Why not <Link to="/recipe">create one</Link>
        </h4>
      </div>
    );

    return (
      <>
        <section className="jumbotron jumbotron-fluid jumbotron-img img-fluid">
          <div className="container-fluid pt-5 mt-5">
            <h1 className="display-4 text-white ml-2">Nate's Cookbook.</h1>
            <br/><br/>
          </div>
        </section>
        <Search/>
        <div>
          <main className="container">
            <div className="text-right mb-3">
              <Link to="/recipe" className="btn custom-button mt-3">
                Create New Recipe
              </Link>
              <br/>              
              <a href="/admins/sign_in" className="btn btn-link">Log In</a>
            </div>
            <div className="row">
              {recipes.length > 0 ? allRecipes : noRecipe}
            </div>
            <Link to="/" className="btn btn-link">
              Home
            </Link>
          </main>
        </div>
      </>
    );
  }	  
}

export default Recipes;
