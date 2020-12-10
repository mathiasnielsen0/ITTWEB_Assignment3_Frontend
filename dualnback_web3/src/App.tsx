import React from 'react';
import logo from './logo.svg';
import './App.css';
import Highscores from "./Pages/HighscoresPage"
import Game from "./Pages/GamePage"
import JwtTokenApi from "./Apis/JwtTokenApi"

import { Navbar, Nav, NavItem, NavDropdown, Container } from 'react-bootstrap'
import Home from "./Pages/HomePage"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Offline from "./Pages/Offline";
interface IProps {
  
}
interface IState {
  Online:boolean
}

class App extends React.Component<IProps,IState>{
  constructor(props: IProps) {
    super(props);
    
    this.state = {
      Online : navigator.onLine
    }
  }
  componentDidMount(): void {
    JwtTokenApi.getJwtToken();

    window.addEventListener('online',  () => {
      this.setState({Online: true})
    });
    window.addEventListener('offline',  () => {
      this.setState({Online: false})
    });


  }

render(){
  return (
      <Router>
        <div className="App">

          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Dual n Back</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/highscores">Highscores</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <div className="content-wrapper">
            <Container>
              <Switch>
                <Route path="/highscores">
                  {this.state.Online? <Highscores/> : <Offline/>}
                </Route>
                <Route path="/">
                  <Game />
                </Route>
              </Switch>
            </Container>
          </div>

        </div>
      </Router>
  );
}

 
}

export default App;
