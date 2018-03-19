import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { Link,Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { LoginAction } from '../../../../Redux/Actions/loginAction';
import { ClearOut } from '../../../../Redux/Actions/loginAction';


class Login extends Component {
  static muiName = 'FlatButton';
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
        </div> );
  }
}

class LogNav extends Component {
  state = {
  };


  render() {
    return (
      <div>
        <AppBar
          iconElementRight={<Login />}
        />
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