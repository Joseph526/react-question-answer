import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Questions from "./components/Questions";
import Question from "./components/Question";
import Callback from "./components/Callback";
import NewQuestion from "./components/NewQuestion";
import SecuredRoute from "./components/SecuredRoute";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Questions} />
          <Route exact path="/question/:questionId" component={Question} />
          <Route exact path="/callback" component={Callback} />
          <SecuredRoute path="/new-question" component={NewQuestion} />
        </div>
      </Router>
    );
  }
}

export default App;
