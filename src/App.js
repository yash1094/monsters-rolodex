import React, { Component } from "react";
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component";
import LoadingSpinner from "./components/loading/loading.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      monsters: [],
      searchField: "",
    };
  }

  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users, isLoading: false }));
  }

  render() {
    const { monsters, searchField, isLoading } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        {isLoading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div>
            <SearchBox
              placeholder="search monster"
              handleChange={this.handleChange}
            />
            <CardList monsters={filteredMonsters} />{" "}
          </div>
        )}
      </div>
    );
  }
}

export default App;
