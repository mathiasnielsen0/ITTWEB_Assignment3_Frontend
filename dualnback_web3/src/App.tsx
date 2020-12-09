import React from 'react';
import logo from './logo.svg';
import './App.css';
import Highscores from "./Pages/HighscoresPage"
import Game from "./Pages/GamePage"

import { Navbar, Nav, NavItem, NavDropdown, Container } from 'react-bootstrap'
import Home from "./Pages/HomePage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">

    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Dual n Back</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/game">Game</Nav.Link>
          <Nav.Link href="/highscores">Highscores</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div className="content-wrapper">
      <Container>
        <Switch>
          <Route path="/highscores">
            <Highscores />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </div>

    </div>
  </Router>
  );
}

export default App;
