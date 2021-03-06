import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RoomList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      rooms: []
    }
  
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.createRoom = this.createRoom.bind(this);  
  }
  
  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room)});  
    });
  }

  createRoom() {    
    let newRoom = document.getElementById('room-name').value;
    if(newRoom !== '') {
      this.roomsRef.push({
        name: newRoom
      });
      document.getElementById('room-name').value = '';
      } 
    }

  render() {
    return (     
      <div id="room-list">
        <h1>Bloc Chat</h1>
        {this.state.rooms.map((room) =>
            <Link to={`/room/${room.name}`} 
                  key={room.key} 
                  className={this.props.currentRoom === room ? "link active" : "link"}  
                  onClick={() => this.props.setActiveRoom(room)}  >
              <span>{room.name}</span>
            </Link>
        )}
        <form>
          <input type="text" id="room-name" name="roomname" placeholder="Enter name of new Chat Room"></input>
          <input type="button" id="room-button" value="Create new room" onClick={this.createRoom}></input>
        </form>
      </div>
    )
  }  
}

export default RoomList;