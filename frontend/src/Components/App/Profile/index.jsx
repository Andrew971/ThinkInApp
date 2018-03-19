import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../../../js/PrivateRoute'
import { Link,Switch, withRouter } from 'react-router-dom'

import MyLab from './MyLab'
import ProfileView from './ProfileView'
import MyForum from './MyForum'
import Mates from './Mates'
import Setting from './Setting'

import { FollowOneUser, GetmyList, GetListFolowed } from '../../../Redux/Actions/followAction';
// import { gotFollow } from '../../../Redux/Selectors/followSelector';
import { GetProfile} from '../../../Redux/Actions/getUserInfo';


export class Profile extends Component {
  componentDidMount = () => {
    const { dispatch, profile } = this.props
    // localStorage.setItem('prevPath', this.props.location.pathname)
    dispatch(GetListFolowed(profile.user_id))
    dispatch(GetProfile(this.props.match.params.username));
  }

  componentDidUpdate = (prevProps) => {
    const { dispatch, profile,owner } = this.props
    if(prevProps.profile !== profile){
      dispatch(GetListFolowed(profile.user_id))

    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      dispatch(GetProfile(this.props.match.params.username));
      dispatch(GetmyList(owner))
    }
  }

  FollowLab = () => {
    const { dispatch,viewer,profile } = this.props;
    dispatch(FollowOneUser({user_id: viewer, foUser_id: profile.user_id }));
  }

  render() {
    let { match, viewer, profile } = this.props
    const friends = this.props.myFriends.filter(elm=> elm.id === profile.id)
    return (
      <main>
        <section style={{ background: "" }}>
          test ProfileView: {profile.first_name} {profile.last_name}
          <br />
          <Link to={`${match.url}`}>Profile</Link><br />
          <Link to={`${match.url}/forum`}>Forums</Link><br />
          <Link to={`${match.url}/lab`}>Follow</Link><br />
          <Link to={`${match.url}/settings`}>Settings</Link><br />
          {
            (viewer)
                ? (viewer !== profile.user_id)
                ?(friends.length === 0)
                ?<button onClick={() => { this.FollowLab() }}>Follow</button>
                : <button onClick={() => { }}>Unfollow</button>
                :''
                :''
          }<br />
          {
            (viewer === profile.user_id)
                ? <Link to={`${match.url}/option`}>Option</Link>
              : ''
          }<br />
          

          <Switch>
            <PrivateRoute exact path={match.url} render={(routeProps) =>
              <ProfileView
                {...routeProps}
              />
            }
            />
            <PrivateRoute path={`${match.url}/forum`} render={(routeProps) =>
              <MyForum
                {...routeProps}
              />
            }
            />
            <PrivateRoute path={`${match.url}/lab`} render={(routeProps) =>
              <MyLab
                {...routeProps}
              />
            }
            />
            <PrivateRoute path={`${match.url}/mates`} render={(routeProps) =>
              <Mates
                {...routeProps}
              />
            }
            />
            <PrivateRoute path={`${match.url}/settings`} render={(routeProps) =>
              <Setting
                {...routeProps}
              />
            }
            />
          </Switch>
        </section>


      </main>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    viewer: state.user.id,
    profile: state.user.profile,
    logged: state.login.logged,
    myFriends: state.follow.MyListuser,
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    owner:state.user.id

  };
};

export default withRouter(connect(
  mapStateToProps
)(Profile));
