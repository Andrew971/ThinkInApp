import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { LoginAction } from '../../../../Redux/Actions/loginAction';
import { ClearOut } from '../../../../Redux/Actions/loginAction';


export class Login extends Component {
  constructor() {
    super()
    this.state = {
      errorMessage: ''
    }
  }
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

    
    return (

      <div className="container userlog">

        <div className="col-md-6 col-md-offset-3" align="center">
          
          plese log in or sign up 

          <Link to="/">Signup</Link>


        </div>

      </div>
    );
  };
}
const mapStateToProps = (state) => {
  return {
    redirectToReferrer: state.login.logged,
    message:state.login.message
  }

}
export default connect(mapStateToProps)(Login);