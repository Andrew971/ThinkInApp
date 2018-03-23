import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDate } from '../../../Redux/Actions/clockAction';
import { getTime } from '../../../Redux/Selectors/clockSelector';
import { getDate } from '../../../Redux/Selectors/clockSelector';
import { Greeting } from '../../../Redux/Selectors/clockSelector';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Grid, Typography } from 'material-ui/';
import green from 'material-ui/colors/green';
import Icon from 'material-ui/Icon';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop:'0',

  },
  button: {
    margin: theme.spacing.unit,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    '&:hover': {
      color: green[200],
    },
  },
});




export class Dashboard extends Component {

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { dispatch } = this.props;
    dispatch(changeDate(new Date()));
  }
  render() {
    const { classes, history, time, date, greeting,username} = this.props;

    return (
        <Grid component="main" style={{ background: "" }} className={classes.root} container alignItems="center"
          direction="row" justify="space-between" spacing={16}>

          <Grid item xs={12}>
            <Grid container alignItems="center"
              direction="row" justify="space-around" spacing={16}>
              <div className="time" align="center">
                <Grid item xs={11} md={12}>
                  <Typography variant="display4" >{time}</Typography>
                </Grid>
                <Grid item xs={11} md={12}>
                  <Typography variant="display3" component="h2">{date}</Typography>
                </Grid>
                <Grid item xs={11} md={12}>
                  <Typography variant="body1" component="h2">{greeting},{username}!</Typography>
                </Grid>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center"
              direction="row" justify="center" spacing={16}>
              <Grid item xs={6} sm={3} lg={2} align="center">

                <Grid container alignItems="center"
                  direction="row" justify="space-between" spacing={16}>

                  <Grid item xs={12} align="center">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: '15vh' }} onClick={() => { history.push("/" + this.props.username) }}>home</Icon>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography variant="headline" >Profile</Typography>
                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={6} sm={3} lg={2} align="center">

                <Grid container alignItems="center"
                  direction="row" justify="space-between" spacing={16}>

                  <Grid item xs={12} align="center">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: '15vh' }} onClick={() => { history.push("/" + this.props.username) }}>chat</Icon>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography variant="headline" >Messages</Typography>

                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={6} sm={3} lg={2} align="center">

                <Grid container alignItems="center"
                  direction="row" justify="space-between" spacing={16}>

                  <Grid item xs={12} align="center">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: '15vh' }} onClick={() => { history.push("/" + this.props.username) }}>assistant_photo</Icon>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography variant="headline" >Notifications</Typography>

                  </Grid>
                </Grid>

              </Grid>
              <Grid item xs={6} sm={3} lg={2} align="center">
                <Grid container alignItems="center"
                  direction="row" justify="space-between" spacing={16}>

                  <Grid item xs={12} align="center">
                    <Icon className={classes.iconHover} color="primary" style={{ fontSize: '15vh' }} onClick={() => { history.push("/" + this.props.username) }}>trending_up</Icon>
                  </Grid>
                  <Grid item xs={12} align="center">
                  <Typography variant="headline" >Stats</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    time: getTime(state),
    date: getDate(state),
    greeting: Greeting(state),
    username: state.user.username

  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(Dashboard));
