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
    this.messagesRef.on('child_removed', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      let messages = this.state.messages.filter(msg => msg.key !== message.key);
      this.setState({messages: messages})
    });
  }

  createMessage() {  
    if(this.props.activeUser !== null) {  
    let newMessage = document.getElementById('text-field').value;
    if(newMessage !== '') {
      this.messagesRef.push({
        content: newMessage,
        roomId: this.props.currentRoom.key,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        username: this.props.activeUser.displayName
      });
      document.getElementById('text-field').value = '';
      } 
    } else {
      alert('You need to be logged in to be able to chat!');
      document.getElementById('text-field').value = '';
    }
  }

  deleteMessage(msg) {
    let newRef = this.messagesRef.child(msg.key);
    newRef.remove();
  }

    getCorrectTime(t) {
      let dt = new Date(t);
      let hr = dt.getHours();
      let m = "0" + dt.getMinutes();
      return hr+ ':' +m.substr(-2);
  }

  render() {
    return (        
      this.props.currentRoom.length !== 0 ?
        <div className="container">
          <h1 className="headline">You are in {this.props.currentRoom.name}!</h1>
          <div className="message-container">
            {this.state.messages.filter(msg => msg.roomId.toString() === this.props.currentRoom.key)
                                .sort((a, b) => a - b)
                                .map((msg) =>
              <div key={msg.key} className="message">
                <span>({this.getCorrectTime(msg.sentAt)})</span>
                <span className="username"> {msg.username}: </span>
                <span>{msg.content}</span>
                <button className="delete-btn" onClick={() => this.deleteMessage(msg)}>x</button>
              </div>            
            )}      
          </div>
          <div className="input-container">
            <input type="button" className="send-btn" value="send" onClick={() => this.createMessage()}></input>
            <div className="text-box">
              <input type="text" id="text-field" placeholder="Enter your message here"></input>
            </div>            
          </div>
        </div>
      :
        <div className="container">
          <h1 className="headline">Please select a room!</h1>
        </div>
    )
  }
}

export default MessageList;