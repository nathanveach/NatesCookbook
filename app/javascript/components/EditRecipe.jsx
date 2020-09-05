import React from "react";
import { Link } from "react-router-dom";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { recipe: {
      name: "",
      ingredients: "",
      instructions: ""
    }};

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }

  stripHtmlEntities(str) {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value)
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/update/${this.state.recipe.id}`;
    const { name, ingredients, instructions } = this.state;

    if (name == undefined && ingredients == undefined && instructions == undefined)
      return;
   
    const body = {
      name,
      ingredients,
      instructions: (instructions == undefined ? instructions : instructions.replace(/\n/g, "<br> <br>"))
    };  

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => this.props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Edit this recipe you fool!
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">Recipe name</label>
                <input
                  type="text"
                  name="name"
                  id="recipeName"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  defaultValue={this.state.recipe.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <input
                  type="text"
                  name="ingredients"
                  id="recipeIngredients"
                  className="form-control"
                  required
                  onChange={this.onChange}
                  defaultValue={this.state.recipe.ingredients}
                />
                <small id="ingredientsHelp" className="form-text text-muted">
                  Separate each ingredient with a comma.
                </small>
              </div>
              <label htmlFor="instructions">Preparation Instructions</label>
              <textarea
                className="form-control"
                id="instructions"
                name="instructions"
                rows="5"
                required
                onChange={this.onChange}
                defaultValue={this.state.recipe.instructions}
              />
              <button type="submit" className="btn custom-button mt-3">
                Update Recipe
              </button>
              <Link to="/recipes" className="btn btn-link mt-3">
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default EditRecipe;
