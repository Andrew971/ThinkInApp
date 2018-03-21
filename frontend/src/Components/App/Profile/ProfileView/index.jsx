import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles';

import { Typography } from 'material-ui';

import { FollowOneUser, GetmyList, GetListFolowed } from '../../../../Redux/Actions/followAction';
// import { gotFollow } from '../../../Redux/Selectors/followSelector';
import { GetProfile } from '../../../../Redux/Actions/getUserInfo';
const styles = theme => ({
  card: {
    width: '100%',
  },
  content: {
    width: '100%',
    padding: '5vh 10vh',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  media: {
    height: '20vh',
  },
});

export class ProfileView extends Component {


  render() {
    let { match, viewer, profile } = this.props


    return (
      <div>
        <Typography align="center" variant="headline" component="h1">
          bio:</Typography>
        <Typography align="center" component="p">
          {profile.bio}
        </Typography>


        <Typography align="center" component="p">
          age:{profile.age}
        </Typography>


      </div>
    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    viewer: state.user.id,
    profile: state.user.profile,
    logged: state.login.logged,
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    listLoaded: state.follow.listLoaded,
    owner: state.user.id

  };
};

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(ProfileView)))
  ;
