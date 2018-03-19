import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'


import { FollowOneUser, GetmyList, GetListFolowed } from '../../../../Redux/Actions/followAction';
// import { gotFollow } from '../../../Redux/Selectors/followSelector';
import { GetProfile} from '../../../../Redux/Actions/getUserInfo';


export class ProfileView extends Component {


  render() {
    let { match, viewer, profile } = this.props
    
  
    return (
      <section>

test

      </section>
    );
  }
}


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    viewer: state.user.id,
    profile: state.user.profile,
    logged: state.login.logged,
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    listLoaded: state.follow.listLoaded,
    owner:state.user.id

  };
};

export default withRouter(connect(
  mapStateToProps
)(ProfileView));
