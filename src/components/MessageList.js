import React, { Component } from 'react'

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
        this.setState({ messages: this.state.messages.concat(message)}); 
      
    });
  }

  render() {
    if(this.props.currentRoom.length !== 0) {
      return (
        <div>
          <h1>You are in {this.props.currentRoom.name}!</h1>
       </div>
      )
    } else {
      return (
        <h1>Please select a room!</h1>
      )
    }
  }
}

export default MessageList;