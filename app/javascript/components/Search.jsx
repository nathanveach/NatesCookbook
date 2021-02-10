import React from "react";
import { Link } from "react-router-dom";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      autoCompleteResults: [],
      collapsed: true,
    };

    this.showList = this.showList.bind(this);

    let url = "/search?q=" + this.state.term;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) =>
        this.setState({ autoCompleteResults: response.recipes })
      )
      .catch(() => this.props.history.push("/"));
  }

  getAutoCompleteResults(e) {
    this.setState(
      {
        term: e.target.value,
      },
      () => {
        let url = "/search?q=" + this.state.term;
        fetch(url)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((response) =>
            this.setState({ autoCompleteResults: response.recipes })
          )
          .catch(() => this.props.history.push("/"));
      }
    );
  }

  showList() {
    console.log(this.state.collapsed);
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    let autoCompleteList = this.state.autoCompleteResults.map(
      (response, index) => {
        if (!this.state.collapsed) {
          return (
            <ul key={index} className="list-group mt-2">
              <li className="list-group-item list-group-item-custom">
                <Link to={`/recipe/${response.id}`}>{response.name}</Link>
              </li>
            </ul>
          );
        }
        return null;
      }
    );

    return (
      <div className="container input-group-sm">
        <input
          ref={(input) => {
            this.searchBar = input;
          }}
          value={this.state.term}
          onChange={this.getAutoCompleteResults.bind(this)}
          type="search"
          placeholder="Search..."
          onClick={this.showList}
          className="form-control"
        />
        {autoCompleteList}
      </div>
    );
  }
}

export default Search;
