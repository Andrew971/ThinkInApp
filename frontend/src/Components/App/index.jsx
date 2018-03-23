import React, { Component } from 'react';
import Navbar from './Navbar'
import { Route, Switch,withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { GetUserInfo, ClearUserInfo } from '../../Redux/Actions/getUserInfo';
import PrivateRoute from '../../js/PrivateRoute'
import Log from './Log'
import Dashboard from './Dashboard'
import Profile from './Profile'
import OneForum from './OneForum'

export class App extends Component {
componentWillMount=()=>{
  const { dispatch } = this.props
  const token = localStorage.getItem('token')

  if (token) {
    dispatch(GetUserInfo(token))
  }
}
  componentDidUpdate = (prevProps) => {
    const { dispatch } = this.props
    const token = localStorage.getItem('token')

    if (!this.props.logged) {
      dispatch(ClearUserInfo())

    }
    if (token) {
      dispatch(GetUserInfo(token))
    }
  }


  render() {

    return (
      <div className="">
        <Navbar history={this.props.history}/>
        <Switch>
          <Route exact path='/' render={(routeProps) =>
            <Log
              {...routeProps}
            />

          }

          />

          <PrivateRoute path='/dashboard' render={(routeProps) =>
            <Dashboard
              {...routeProps}
            />
          }
          />
          <Route path='/forum/:forumName' render={(routeProps) =>
            <OneForum
              {...routeProps}
            />
          }
          />

          <Route path='/:username' render={(routeProps) =>
            <Profile
              {...routeProps}
            />
          }
          />

        </Switch>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state)

  return {
    logged: state.login.logged

  }

}
export default withRouter(connect(mapStateToProps)(App));