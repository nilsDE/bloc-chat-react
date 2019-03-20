import React, { Component } from 'react';

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
        <div className="container">
          <h1 className="headline">You are in {this.props.currentRoom.name}!</h1>
          <div id="message-container">
            {this.state.messages.filter(msg => msg.roomId === parseInt(this.props.currentRoom.key)).map((msg) =>
              <div key={msg.key} className="message">
                  <span>({msg.sentAt})</span>
                  <span className="username"> {msg.username}: </span>
                  <span>{msg.content}</span>
              </div>            
            )}      
        </div>
       </div>
      )
    } else {
      return (
        <div className="container">
          <h1 className="headline">Please select a room!</h1>
        </div>
      )
    }
  }
}

export default MessageList;