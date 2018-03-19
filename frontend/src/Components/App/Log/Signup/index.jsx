import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { SignupAction } from '../../../../Redux/Actions/signupAction';
import { getMessage } from '../../../../Redux/Selectors/SignupSelector';
export class LogSignup extends Component {


  Signup = () => {
    const { first, last, username, email, password, gender } = this.signupForm
    const { dispatch } = this.props

    dispatch(SignupAction({ first: first.value, last: last.value, username: username.value, email: email.value, password: password.value, gender: gender.value }));

  }


  render() {

   
    return (
      <div className="container" align="center">
        <div className="col-md-6 col-md-offset-3">
          <form ref={self => this.signupForm = self}>
            <div className="row" >
              <input type="text" className="form-control col-md-6" placeholder="First Name" name="first" />
              <input type="text" className="form-control col-md-6" placeholder="Last Name" name="last" />
            </div>
            <input type="text" className="form-control col-md-12" placeholder="Username" name="username" />
            <input type="email" className="form-control col-md-12" placeholder="Type your email here" name="email" />
            <input type="password" className="form-control col-md-12" placeholder="Type your password here" name="password" />
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="male" value="Male" />
              <label className="form-check-label" htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" id="female" value="Female" />
              <label className="form-check-label" htmlFor="female">Female</label>
            </div>

            {
              (this.props.message)
                ? <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.message}</p>
                : ''
            }
            <div type="button" onClick={() => { this.Signup() }}>signup</div>
          </form>


        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    status: state.signup.redirect,
    message: getMessage(state)
  }

}
export default connect(mapStateToProps)(LogSignup);