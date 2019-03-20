import React, { Component } from 'react';

class User extends Component {

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return(
      <div className="login-btn">
        {this.props.activeUser === null ? 
          <div>
            <span className="user-message">Please log in</span>
            <input type="button" className="btn" value="Sign-in" onClick={() => this.signIn()}></input>
          </div>
        : 
          <div>
            <span className="user-message">Hello {this.props.activeUser.displayName}, thank you for using Bloc Chat!</span>
            <input type="button" className="btn" value="Sign-out" onClick={() => this.signOut()}></input>
          </div>}
      </div>
    )
  }

}

export default User;