import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { LoginAction } from '../../../../Redux/Actions/loginAction';
import { ClearOut } from '../../../../Redux/Actions/loginAction';


export class LogNav extends Component {
 
  login = () => {

    const { username, password } = this.loginForm
    const { dispatch } = this.props
    dispatch(LoginAction({ username: username.value, password: password.value }));

  }

  componentWillUnmount = () => {
    const { dispatch } = this.props
    dispatch(ClearOut());
  }

  render() {
    const { redirectToReferrer } = this.props
    if (redirectToReferrer === true) {
        return <Redirect to='/dashboard' />
    }
    return (
      <div className="logout col-12" align="right">
        <form  ref={self => this.loginForm = self}>
          Username:
          <input type="text" className="" name="username" />
          Password:
          <input type="password" className="" name="password" />
          <button type="button" onClick={() => { this.login() }}>Log in</button>
          <Link to='/'>Sign up</Link>

        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    redirectToReferrer: state.login.logged,
    message:state.login.message
  }

}
export default connect(mapStateToProps)(LogNav);