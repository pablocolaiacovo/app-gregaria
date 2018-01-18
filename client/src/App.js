import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import firebase from "firebase";
import "firebase/auth";
import { FirebaseAuth } from "react-firebaseui";
import "./firebaseui-overrides.global.css"; // Import globally.

// Get the Firebase config from the auto generated file.
const firebaseConfig = require("./firebase-config.json").result;

// Instantiate a Firebase app.
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  uiConfig = {
    signInFlow: "redirect",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: (user) => {
        console.log(user);
        this.setState({ signedIn: true });
        return false;
      }
    }
  };

  state = {
    signedIn: false
  };

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {!this.state.signedIn && (
          <div>
            <FirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()}
            />
          </div>
        )}
        {this.state.signedIn && <div>You are now signed In!</div>}
      </div>
    );
  }
}

export default App;
