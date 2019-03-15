import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    }
    this.roomsRef = this.props.firebase.database().ref('rooms');    
  }
  
  componentDidMount() {
    console.log('Component did mount');
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)});    
    });
  }
  
  createRoom() {
    let newRoom = document.getElementById('room-name').value;
    console.log(newRoom);
    this.roomsRef.push({
      name: newRoom
    });
    }

  render() {
    return (     
      <div id="room-list">
        <h1>Bloc Chat</h1>
        <ul>
        {this.state.rooms.map((room) =>
          <li key={room.key}>{room.name}</li>
        )}
        </ul>
        <form>
          <input type="text" id="room-name" name="roomname" placeholder="Enter name of new Chat Room"></input>
          <input type="button" id="room-button" value="Create new room" onClick={this.createRoom}></input>
        </form>
      </div>
    )
  }  
}


export default RoomList;