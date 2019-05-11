import React, { Component } from "react";
import "./NavBar.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CondNavDisplay from './CondNavDisplay';
import PropTypes from 'prop-types';

class NavBar extends Component {

  render() {
    return (
      <div className="NavBar">
        <nav id="top-navbar" className="navbar navbar-expand-sm">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a id="brand" className="nav-link nav-icon" href="">
                  {/* <FontAwesomeIcon icon="home" /> */}
                  Home
                </a>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <CondNavDisplay
            history={this.props.history}
            isSignedIn={this.props.isSignedIn}/>
          </div>

        </nav>
      </div>
    );
  }
}

NavBar.prototTypes ={
  isSignedIn: PropTypes.bool
}

export default NavBar;
