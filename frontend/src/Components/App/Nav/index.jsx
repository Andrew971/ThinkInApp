import React, { Component } from 'react';
import { connect } from 'react-redux';
import UiNavabar from './UiNavbar'

class Nav extends Component {

  render() {     
    return (
     <UiNavabar  history={this.props.history}/>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)

  return {
    token: state.login.token,
    redirectToReferrer: state.login.logged,

  };
};

export default connect(
  mapStateToProps
)(Nav);
