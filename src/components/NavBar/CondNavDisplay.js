import React from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from 'prop-types'; 
import ModalForm from '../CreateBookmark/ModalForm';
import SearchBar from './SearchBar';

function SignedIn(props){

  // const handleUserProfile = () => {
  //   const user = firebase.auth().currentUser;
  //   const uid = user.uid;
  //   console.log(uid)
  //   props.history.push({
  //     pathname: '/user',
  //     search: '?id=' + uid,
  //   });
  // }

  const handleSignOut = () => {
    fetch('/logout')
      .then((response) => {response.json()
      })
      .then(() => {
        window.sessionStorage.setItem("jwtToken", "")
      })
      .then(()=> props.history.push("/"))
      .catch((err)=> console.log(err))
  }

  return(
  <ul className="navbar-nav ml-auto">
  <li style={{marginTop: 8+'px', marginRight: 325 + 'px'}} className="nav-item active">
      <SearchBar 
      location={props.location}
      history={props.history}/>
    </li>
    <li style={{marginTop: 8+'px'}} className="nav-item active">
      <ModalForm history={props.history}/>
    </li>
    <li className="nav-item active nav-icon">
      <a className="nav-link" href="#/saved">
        Notification
      </a>
    </li>
    <li className="nav-item active nav-icon">
      <a className="nav-link" href="#/user">
        User
      </a>
    </li>
    <li className="nav-item active nav-icon">
      <a className="nav-link" onClick={handleSignOut} href="">
        Sign Out
      </a>
    </li>
  </ul>
  );
}

function SignedOut(props){
  return(
      <ul className="navbar-nav ml-auto">
    <li className="nav-item active">
      <a className="nav-link" href="/#/login">
        Sign In
      </a>
    </li>
    <li className="nav-item active">
      <a className="nav-link" href="/#/signup">
        Sign Up
      </a>
    </li>
  </ul>
  );
}

function CondNavDisplay(props){
  const isSignedIn = props.isSignedIn;
  if (isSignedIn) {
    return <SignedIn
    location={props.location}
    history={props.history} 
    handleSignOut={props.handleSignOut} />;
  }
  return <SignedOut handleSignIn={props.handleSignIn} />;
}

CondNavDisplay.prototTypes ={
  handleSignOut: PropTypes.func,
  handleSignIn: PropTypes.func,
  isSignedIn: PropTypes.bool
}

export default CondNavDisplay;