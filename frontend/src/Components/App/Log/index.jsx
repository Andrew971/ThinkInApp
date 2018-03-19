import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { SignupAction } from '../../../Redux/Actions/signupAction';
import { resetStatus } from '../../../Redux/Actions/signupAction';
import { getMessage } from '../../../Redux/Selectors/SignupSelector';
import Signup from './Signup'
import Login from './Login'



export class Log extends Component {

  Signup = () => {
    const { username, email, password } = this.signupForm
    const { dispatch } = this.props

    dispatch(SignupAction({ username: username.value, email: email.value, password: password.value }));

  }

  componentWillUnmount = () => {
    const { dispatch } = this.props
    dispatch(resetStatus({ status: false }));
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer,status, } = this.props

    if (redirectToReferrer === true) {
      return <Redirect to='/dashboard' />
    }
    return (
      <main>
      {
      (status || from.pathname !== '/')
      ?<Login />
      :<Signup />
    }
       
      </main>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    status: state.signup.redirect,
    redirectToReferrer: state.login.logged,
    message: getMessage(state)
  }

}
export default connect(mapStateToProps)(Log);