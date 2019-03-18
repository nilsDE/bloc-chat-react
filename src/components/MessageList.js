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
        <div id="message-container">
          <h1>You are in {this.props.currentRoom.name}!</h1>
          <table id="message-list">
              <thead>
                <tr className="table-header">
                  <th>User and Message</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
              {this.state.messages.filter(msg => msg.roomId === parseInt(this.props.currentRoom.key)).map((msg) =>
              <tr key={msg.key}>
                <td>
                  <span className="username">{msg.username}</span>
                  <span>{msg.content}</span>
                </td>
                <td>{msg.sentAt}</td>
              </tr>
            
              )}      
              </tbody>
            </table>          
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