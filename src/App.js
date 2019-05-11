import React, { Component } from 'react';
import './App.css';
import { Switch, Route, withRouter } from "react-router-dom";
import { Splash } from './components/Splash/Splash';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import Welcome from './components/Welcome/Welcome';
import AllBookmarks from './components/Bookmarks/AllBookmarks';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  componentDidMount() {
    this.renderCheckAuthenticated().then(res => {
      this.setState((prevState, props)=>{
        return { isAuthenticated: res}
      })
    })
}

  renderCheckAuthenticated = async () => {
    const response = await window.sessionStorage.jwtToken ? true : false;

    return response;
  }

  loginCheckAuthenticated = () => {
    if (window.sessionStorage.jwtToken) {
      this.setState((prevState, props)=>{
        return {isAuthenticated: !prevState.isAuthenticated}
      })
  }}

  render() {
    return (
      <div className="App">
        <NavBar
        isSignedIn={this.state.isAuthenticated}
        history={this.props.history}
        />
        <Switch>
          <Route 
            path="/signup"
            render={props => (
                <Signup history={this.props.history} loginCheckAuthenticated={this.loginCheckAuthenticated}/>
              )}
            />
          <Route 
            path="/login"
            render={props => (
                <Login history={this.props.history} loginCheckAuthenticated={this.loginCheckAuthenticated}/>
              )}
            />
          <Route 
          path="/home"
          render={props => (
              <Home history={this.props.history} />
            )}
          />
          <Route 
          path="/welcome"
          render={props => (
              <Welcome history={this.props.history} />
            )}
          />
          <Route 
          path="/bookmarks/all"
          render={props => (
              <AllBookmarks history={this.props.history} />
            )}
          />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
