import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAy9FdetXgHsczC94xvjb2-hfys4BmkH1A",
  authDomain: "bloc-chat-react-8ac89.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-8ac89.firebaseio.com",
  projectId: "bloc-chat-react-8ac89",
  storageBucket: "bloc-chat-react-8ac89.appspot.com",
  messagingSenderId: "949149821633"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>This is my App</p>
        <RoomList firebase={firebase}/>
      </div>      
    );
  }
}

export default App;
