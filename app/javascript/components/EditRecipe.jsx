import React from "react";
import { Link } from "react-router-dom";

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        name: "",
        ingredients: "",
        instructions: "",
        image: "",
      },
    };

    this.onChange = this.onChange.bind(this);
    this.onUpload = this.onUpload.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    const url = `/api/v1/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.setState({ recipe: response }))
      .catch(() => this.props.history.push("/recipes"));
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onUpload(event) {
    this.setState({ image: event.target.files[0] });
  }

  onSubmit(event) {
    event.preventDefault();
    const url = `/api/v1/update/${this.state.recipe.id}`;
    const { name, ingredients, instructions, image } = this.state;

    const formData = new FormData();
    formData.append("recipe[image]", image);
    // values will be undefined if onchange doesn't fire
    if (name != undefined) formData.append("recipe[name]", name);
    if (ingredients != undefined)
      formData.append("recipe[ingredients]", ingredients);
    if (instructions != undefined)
      formData.append(
        "recipe[instructions]",
        instructions.replace(/\n/g, "<br> <br>")
      );

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PATCH",
      headers: {
        "X-CSRF-Token": token,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => this.props.history.push(`/recipe/${response.id}`))
      .catch((error) => console.log(error.message));
  }

  render() {
    const { recipe } = this.state;
    const recipeInstructions = recipe.instructions.replace(
      new RegExp("<br>", "g"),
      " / "
    );

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
                  defaultValue={recipe.name}
                />
              </div>
              <div className="form-group">
                <label htmlFor="recipeImage">Recipe image</label>
                <input
                  type="file"
                  name="image"
                  id="recipeImage"
                  className="form-control"
                  required
                  onChange={this.onUpload}
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
                  defaultValue={recipe.ingredients}
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
                defaultValue={recipeInstructions}
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
