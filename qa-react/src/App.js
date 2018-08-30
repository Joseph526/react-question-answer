import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar";
import Questions from "./components/Questions";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Questions />
        </div>
      </Router>
    );
  }
}

export default App;
