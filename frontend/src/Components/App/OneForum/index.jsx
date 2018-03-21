import React, { Component } from 'react';
import { connect } from 'react-redux';
import Labs from './Labs'
import Option from './Option'
import ForumView from './ForumView'
import PrivateRoute from '../../../js/PrivateRoute'

import { Switch, Route , withRouter} from 'react-router-dom'
import Card, { CardActions, CardMedia } from 'material-ui/Card';
import {Paper, Button, Typography} from 'material-ui';
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

export class Forum extends Component {


  render() {
    let { match, viewer, profile, classes, data } = this.props
    return (
      <main>
        <section style={{ background: "" }}>
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

        </section>


      </main>

    );
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.forum.ForumData,
    viewer: state.user.id,
    profile: state.user.profile,
    owner:state.forum.ForumData.user_id

  };
};

export default withStyles(styles)(withRouter(connect(
  mapStateToProps
)(Forum)));
