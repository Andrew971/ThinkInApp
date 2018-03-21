import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../../../js/PrivateRoute'
import { Switch, withRouter } from 'react-router-dom'
import MyFollowing from './MyFollowing'
import ProfileView from './ProfileView'
import MyForum from './MyForum'
import Setting from './Setting'

import { FollowOneUser, GetmyList, GetListFolowed } from '../../../Redux/Actions/followAction';
// import { gotFollow } from '../../../Redux/Selectors/followSelector';
import { GetProfile } from '../../../Redux/Actions/getUserInfo';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import { Paper, Button, Typography, Chip } from 'material-ui';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import img from '../../../Assets/img/profile.jpg'

const styles = theme => ({
  card: {
    width: '100%',
  },
  actions: {
    display: 'flex',
  },
  content: {
    width: '100%',
    padding: '5vh 5vh',
  },
  chip: {
    margin: theme.spacing.unit,
  },
  media: {
    height: '20vh',
  },
});

export class Profile extends Component {
  componentDidMount = () => {
    const { dispatch, profile } = this.props
    // localStorage.setItem('prevPath', this.props.location.pathname)
    dispatch(GetListFolowed(profile.user_id))
    dispatch(GetProfile(this.props.match.params.username));
  }

  componentDidUpdate = (prevProps) => {
    const { dispatch, profile, owner } = this.props
    if (prevProps.profile !== profile) {
      dispatch(GetListFolowed(profile.user_id))

    }

    if (prevProps.location.pathname !== this.props.location.pathname) {
      dispatch(GetProfile(this.props.match.params.username));
      dispatch(GetmyList(owner))
    }
  }

  FollowOneUser = () => {
    const { dispatch, viewer, profile } = this.props;
    dispatch(FollowOneUser({ user_id: viewer, foUser_id: profile.user_id }));
  }

  render() {
    let { match, viewer, profile, classes, history } = this.props

    const friends = this.props.myFriends.filter(elm => elm.id === profile.id)
    return (
      <main>
        <section style={{ background: "" }}>
          <Card className={classes.card} align="center">
            
            <CardMedia className={classes.media}
              image={img}
              title="Contemplative Reptile" />
              <Typography variant="display2" component="h1" align="center">
              {profile.first_name} {profile.last_name}
            </Typography>
            <CardActions className={classes.actions}>
              <Button size="small" color="secondary" onClick={() => {
                history.push(`${match.url}`)
              }}>
                Profile
              </Button>
              <Button size="small" color="secondary" onClick={() => {
                history.push(`${match.url}/forum`)
              }}>
                Forums
              </Button>
              <Button size="small" color="secondary" onClick={() => {
                history.push(`${match.url}/follow`)
              }}>
                Follow
              </Button>
              {
                (viewer === profile.user_id)
                  ?
                  <Button size="small" color="secondary" onClick={() => {
                    history.push(`${match.url}/settings`)
                  }}>
                    Settings
              </Button>
                  : ''
              }
              {
                (viewer)
                  ? (viewer !== profile.user_id)
                    ? (friends.length === 0)
                      ? <Chip
                        label="Follow"
                        onClick={() => { this.FollowOneUser() }}
                        className={classes.chip}
                        color="secondary"
                      />
                      : <Chip
                        label="followed"
                        onClick={() => { }}
                        className={classes.chip}
                        color="secondary"
                      />
                    : ''
                  : ''
              }

            </CardActions>
          </Card>

          <Paper className={classes.content} elevation={4}>

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
              <PrivateRoute path={`${match.url}/follow`} render={(routeProps) =>
                <MyFollowing
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

          </Paper>

        </section>


      </main>
    );
  }
}
Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    owner: state.user.id

  };
};

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(Profile)));
