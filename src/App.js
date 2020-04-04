import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./Home";
import TodoList from "./TodoList";

const App = () => {
  return (
    <div className="container">
      <h1 className="mb">Todo App</h1>
      <ul className="navbar">
        <li>
          <Link to="/" data-testid="to-home">
            Home
          </Link>
        </li>
        <li>
          <Link to="/todos" data-testid="to-todos">
            Todos
          </Link>
        </li>
      </ul>
      <hr className="mt mb" />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/todos">
          <TodoList />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
