import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateRoute from '../../../js/PrivateRoute'
import { Switch, withRouter } from 'react-router-dom'
import MyFollowing from './MyFollowing'
import ProfileView from './ProfileView'
import MyForum from './MyForum'
import Setting from './Setting'
import { GetList } from '../../../Redux/Actions/forumAction';
import { GetmyList } from '../../../Redux/Actions/followAction';
import { unFollowOneUser, FollowOneUser, GetListFolowed } from '../../../Redux/Actions/followAction';
import { GetProfile } from '../../../Redux/Actions/getUserInfo';
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import { Paper, Button, Typography, Chip, Grid } from 'material-ui';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import img from '../../../Assets/img/profile.jpg'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '0',
  },
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
    const { dispatch,match,viewer } = this.props
    // localStorage.setItem('prevPath', this.props.location.pathname)
    dispatch(GetProfile(match.params.username));
    dispatch(GetmyList(viewer))

  }
  
  componentDidUpdate = (prevProps) => {
    const { dispatch, profile, match, location, viewer } = this.props
    if (prevProps.profile !== profile) {
      dispatch(GetListFolowed(profile.user_id))
      dispatch(GetmyList(viewer))

    }
    if (prevProps.location.pathname !== location.pathname) {
      dispatch(GetProfile(match.params.username));
      dispatch(GetList(profile.user_id))
      dispatch(GetmyList(viewer))

    }

    if (prevProps.match.params !== match.params) {
      dispatch(GetProfile(match.params.username));
      dispatch(GetList(profile.user_id))

    }
   
  }

  FollowOneUser = () => {
    const { dispatch, viewer, profile } = this.props;
    dispatch(FollowOneUser({ user_id: viewer, foUser_id: profile.user_id }));
  }

  UnFollowOneUser = () => {
    const { dispatch, viewer, profile } = this.props;
    dispatch(unFollowOneUser({ user_id: viewer, foUser_id: profile.user_id }));
  }

  render() {
    let { match, viewer, profile, classes, history, myFriends } = this.props

    const friends = myFriends.filter(elm => elm.id === profile.id)
    return (
      <Grid component="main" style={{ background: "" }} className={classes.root} container alignItems="center"
        direction="row" justify="center" spacing={16}>
        <Grid item xs={10} md={9}>
          <Card className={classes.card} align="center">

            <CardMedia className={classes.media}
              image={img}
              title="Contemplative Reptile" />
            <Typography variant="display2" component="h1" align="center">
              {profile.first_name} {profile.last_name}
            </Typography>
            <CardActions className={classes.actions}>
              <Button size="small" color="primary" onClick={() => {
                history.push(`${match.url}`)
              }}>
                Profile
              </Button>
              <Button size="small" color="primary" onClick={() => {
                history.push(`${match.url}/forum`)
              }}>
                Forums
              </Button>
              <Button size="small" color="primary" onClick={() => {
                history.push(`${match.url}/follow`)
              }}>
                Follow
              </Button>
              {
                (viewer === profile.user_id)
                  ?
                  <Button size="small" color="primary" onClick={() => {
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
                        label="Unfollow"
                        onClick={() => { this.UnFollowOneUser() }}
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
        </Grid>
      </Grid>
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
    myFriends: state.follow.MyListUsers,
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    viewerName: state.user.username
  };
};

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(Profile)));
