import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import { Provider } from "react-redux";

import {
  BrowserRouter as Router
} from 'react-router-dom'
import App from './App'
import store from "./store/";

describe('user view landing', () => {
  test('app rendered, landing page view and navbar', () => {
    const app = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
  
    expect(app.queryByText('Welcome to Todo App, manage your tasks easily!')).toBeInTheDocument();
    expect(app.queryByPlaceholderText('Enter your todo')).not.toBeInTheDocument();
    expect(app.queryByTestId('to-home')).toBeInTheDocument();
    expect(app.queryByTestId('to-todos')).toBeInTheDocument();
  })
  test('snapshot?', () => {
    const app = render(
      <Router>
        <App />
      </Router>
    );

    expect(app).toMatchSnapshot();
  })
})

describe('user interact navbar', () => {
  test('app rendered, user click todos, then user click home', () => {
    const app = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
    const leftClick = { button: 0 }

    fireEvent.click(
      app.getByTestId('to-todos'),
      leftClick
    )

    expect(app.queryByText('Your todos')).toBeInTheDocument();
    expect(app.queryByText('Welcome to Todo App, manage your tasks easily!')).not.toBeInTheDocument();

    fireEvent.click(
      app.getByTestId('to-home'),
      leftClick
    )
    expect(app.queryByText('Your todos')).not.toBeInTheDocument();
    expect(app.queryByText('Welcome to Todo App, manage your tasks easily!')).toBeInTheDocument();
  })
})

describe('user interact todos', () => {
  test('app rendered, user click todos, fill value, submit form, new item rendered', async () => {
    const app = render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
    const leftClick = { button: 0 }
    fireEvent.click(
      app.getByTestId('to-todos'),
      leftClick
    )
    fireEvent.change(
      app.getByPlaceholderText('Enter your todo'),
      { target: {
        value: "lelegoyang"
      }}
    )
    expect(app.queryByText("lelegoyang")).not.toBeInTheDocument()
    expect(app.queryByDisplayValue("lelegoyang")).toBeInTheDocument()
    fireEvent.click(
      app.getByText('Add'),
      leftClick
    )
    expect(app.queryByDisplayValue("lelegoyang")).not.toBeInTheDocument()
    await waitForElement(() => app.queryByText("lelegoyang");
    expect(app.queryByText("lelegoyang")).toBeInTheDocument();
  })
})
