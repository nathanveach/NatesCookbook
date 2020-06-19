import React from "react";
import { Link } from "react-router-dom";

class NewRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			ingredients: "",
			instructions: ""
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.stripHtmlEntities = this.stripHtmlEntities.bind(this);
	}

	stripHtmlEntities(str) {
		return String(str)
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/api/v1/recipes/create";
		const { name, ingredients, instructions } = this.state;

		if (name.length == 0 || ingredients.length == 0 || instructions.length == 0)
			return;

		const body = {
			name,
			ingredients,
			instructions: instructions.replace(/\n/g, "<br> <br>")
		};

		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "POST",
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
}



export default NewRecipe;
