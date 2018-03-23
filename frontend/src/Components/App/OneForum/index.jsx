import React, { Component } from 'react';
import { connect } from 'react-redux';
import Labs from './Labs'
import Option from './Option'
import ForumView from './ForumView'
import PrivateRoute from '../../../js/PrivateRoute'
import { GetOneForum, ResetRedirect } from '../../../Redux/Actions/forumAction';
import { Switch, Route, withRouter } from 'react-router-dom'
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import { Paper, Button, Typography, Grid } from 'material-ui';
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

export class Forum extends Component {

  componentWillMount = () => {
    const { dispatch } = this.props;
    localStorage.setItem('prevParams',this.props.match.params.forumName)
    dispatch(GetOneForum(this.props.match.params));
    dispatch(ResetRedirect())
  }

  componentDidUpdate = (prevProps) => {
    const { dispatch,match } = this.props;

    if (prevProps.match !== match) {
      dispatch(GetOneForum(match.params));
    }

  

  }

  render() {
    let { match, viewer, profile, classes, data } = this.props
    return (
     
      <Grid component="main" style={{ background: "" }}className={classes.root} container alignItems="center"
        direction="row" justify="center" spacing={16}>
        <Grid item xs={10} md={9}>

          <Card className={classes.card}>
            <CardMedia className={classes.media}
              image={img}
              title="Contemplative Reptile" />
            <Typography variant="display2" component="h1" align="center">
              {data.Name}
            </Typography>
            <CardActions>
              <Button size="small" color="primary" onClick={() => {
                this.props.history.push(`${match.url}`)
              }}>
                Overview
              </Button>
              <Button size="small" color="primary" onClick={() => {
                this.props.history.push(`${match.url}/labs`)
              }}>
                Labs
              </Button>
              {
                (viewer === profile.user_id)
                  ?
                  <Button size="small" color="primary" onClick={() => {
                    this.props.history.push(`${match.url}/settings`)
                  }}>
                    Settings
              </Button>
                  : ''
              }


            </CardActions>
          </Card>
          <Paper className={classes.content} elevation={4}>

            <Switch>
              <Route exact path={match.url} render={(routeProps) =>
                <ForumView
                  {...routeProps}
                  match={match}
                />
              }
              />
              <Route path={`${match.url}/labs`} render={(routeProps) =>
                <Labs
                  {...routeProps}
                />
              }
              />
              <PrivateRoute path={`${match.url}/settings`} render={(routeProps) =>
                <Option
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

Forum.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    data: state.forum.ForumData,
    viewer: state.user.id,
    profile: state.user.profile,
    owner: state.forum.ForumData.user_id,
  };
};

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(Forum)));
