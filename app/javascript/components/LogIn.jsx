import React from 'react';
import { Link } from 'react-router-dom';


class LogIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = { admin: {
			email: "",
			password: ""
		}};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(event) {
		this.setState({ [event.target.name]: event.target.value })
	}

	onSubmit(event) {
		event.preventDefault();
		const url = "/admins/sign_in";
		const { email, password } = this.state;

		const body = {
			email,
			password
		};

		const token = document.querySelector('meta[name="csrf-token"]').content;
		fetch(url, {
			method: "POST",
			headers: {
      	"Content-Type": 'application/json',
				"X-CSRF-Token": token
			},
			body: JSON.stringify(body)
		})
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw new Error("Network response was not ok.");
			})
			.then(response => this.props.history.push("/recipes"))
			.catch(error => console.log(error.message));
	}
	render() {
		return (
			<form onSubmit={this.onSubmit}>
			  <div className="form-group">
          <label htmlFor="adminEmail">Email:</label>
          <input
            type="email"
            name="email"
            id="adminEmail"
            className="form-control"
            required
            onChange={this.onChange}
          />
        </div>
			  <div className="form-group">
          <label htmlFor="adminPassword">Password:</label>
          <input
            type="text"
            name="password"
            id="adminPassword"
            className="form-control"
            required
            onChange={this.onChange}
          />
        </div>
        <button type="submit" className="btn custom-button mt-3">
          Log In!
        </button>
			</form>
		)
	}
}

export default LogIn;
