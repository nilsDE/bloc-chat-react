import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import Landing from './components/Landing.js';

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
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: []
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(selectedRoom) {
    this.setState({activeRoom: selectedRoom})
  };

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} currentRoom={this.state.activeRoom} />
        <Route exact path="/" component={Landing} />
        <Route path="/room/:slug" render={() => <MessageList currentRoom={this.state.activeRoom} firebase={firebase}  /> } />
      </div>      
    );
  }
}

export default App;
