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
import Results from './components/SearchResults/Results';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-default.css';
import { Provider } from 'react-redux';
import store from './store/configureStore';

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
      <Provider store={store}>
        <div className="App">
          <NavBar
          isSignedIn={this.state.isAuthenticated}
          history={this.props.history}
          location={this.props.location}
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
                <Home 
                  history={this.props.history}
                  location={this.props.location}
                  />
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
            <Route 
            path="/bookmarks/search"
            render={props => (
                <Results 
                history={this.props.history}
                location={this.props.location} />
              )}
            />
            </Switch>
            <Alert stack={{limit: 3}} />
        </div>
      </Provider>
    );
  }
}

export default withRouter(App);
