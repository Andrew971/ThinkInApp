import React, { Component } from 'react';
import Search from './Search'
import Menu from './Menu'
import LogNav from './LogNav'
import { connect } from 'react-redux';
import UiLog from './UiLog'

class Nav extends Component {



  render() {
    const { token } = this.props

    if (!token) {
     return( <nav className="row">
        <LogNav />
      </nav>
     )}
    return (
      <nav className="row">

        <Search />
        <Menu />
      </nav>
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
