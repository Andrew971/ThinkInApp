import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetmyList,GetListFolowed  } from '../../../../Redux/Actions/followAction';


import Tabs, { Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid, Avatar, Button } from 'material-ui';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
  },
  button: {
    margin: theme.spacing.unit,
  },
  bigAvatar: {
    width: '10vh',
    height: '10vh',
  }
});
export class MyFollowing extends Component {
  state = {
    value: 0,
  };
  componentDidMount = () => {
    const { dispatch } = this.props
    dispatch(GetListFolowed(this.props.userId))
    dispatch(GetmyList(this.props.owner))

  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch } = this.props
    if (!this.props.listLoaded) {
      dispatch(GetListFolowed(this.props.userId))

      dispatch(GetmyList(this.props.owner))
    }

  }

  // componentWillUnmount=()=>{

  // }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };


  render() {
    let { Labs, User, listLoaded, history, classes, theme } = this.props

    let ListLab = Labs.map((lab) => {
      return (
        <Grid item key={lab.id} xs={7} md={4}>
          <Grid container alignItems="center"
            direction="column" justify="center" spacing={16}>
            <Grid item xs={12} md={12} align="center">

              <Button className={classes.button} onClick={() => { history.push(`/forum${lab.Path}${lab.id}`) }}><Avatar
                className={classes.bigAvatar}
              >{lab.Title}</Avatar>

              </Button>
            </Grid>
            <Grid item xs={12} md={12} align="center">
              {lab.Title}
            </Grid>
          </Grid>

        </Grid>

      );
    })
    let ListUser = User.map((user) => {
      return (
        <Grid item key={user.id} xs={7} md={4}>
          <Grid container alignItems="center"
            direction="column" justify="center" spacing={16}>
            <Grid item xs={12} md={12} align="center">
              
              <Button className={classes.button} onClick={() => { history.push(user.link) }}><Avatar
                className={classes.bigAvatar}
              >TN</Avatar>

              </Button>
            </Grid>
            <Grid item xs={12} md={12} align="center">
              {`${user.first_name} ${user.last_name}`}
            </Grid>
          </Grid>

        </Grid>
      );
    })

    if (listLoaded === false) {
      return (
        <div>Loading</div>
      )
    } else {
      return (
        <div>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="Thinker" />
            <Tab label="Labs" />

          </Tabs>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={this.state.value}
            onChangeIndex={this.handleChangeIndex}
          >
            <TabContainer dir={theme.direction}>
              <Grid container alignItems="flex-start"
                direction="row" justify="space-around" spacing={16}  >
                {ListUser}

              </Grid>
            </TabContainer>
            <TabContainer dir={theme.direction}>
              <Grid container alignItems="flex-start"
                direction="row" justify="space-around" spacing={16}  >
                {ListLab}
              </Grid>
            </TabContainer>
          </SwipeableViews>

        </div>
      );
    }

  }
}
MyFollowing.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    listLoaded: state.follow.listLoaded,
    owner: state.user.id

  };
};

export default withStyles(styles, { withTheme: true })(connect(
  mapStateToProps
)(MyFollowing));
