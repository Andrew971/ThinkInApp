import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoginAction, Signout } from '../../../../Redux/Actions/loginAction';
import { Link } from 'react-router-dom'


export class Logout extends Component {


  login = () => {

    const { username, password } = this.loginForm
    const { dispatch } = this.props
    dispatch(LoginAction({ username: username.value, password: password.value }));

  }

  Signout = () => {
    const { dispatch } = this.props
    dispatch(Signout(this.props.token));

  }

  render() {

    if (this.props.token) {
      return (
        <div className="logout col-6" align="right">
          
          <Link to="/dashboard">Dashboard</Link>
          <span  onClick={() => { this.Signout() }}>Sign Out</span>
        </div>
      )

    }


    return (
      <div className="logout col-6" align="right">
        <form ref={self => this.loginForm = self}>
          Username:
          <input type="text" className="" name="username" />
          Password:
          <input type="password" className="" name="password" />
          <button type="button" onClick={() => { this.login() }}>Log in</button>

        </form>
   
      </div>


    );
  }

}


const mapStateToProps = (state) => {

  return {
    token: state.login.token,
    redirectToReferrer: state.login.logged,

  };
};

export default connect(
  mapStateToProps
)(Logout);
