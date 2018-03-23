import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList, ResetRedirect } from '../../../../../Redux/Actions/forumAction';
import { GetProfile } from '../../../../../Redux/Actions/getUserInfo';
import { CircularProgress } from 'material-ui/Progress';


import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Avatar, Grid } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  bigAvatar: {
    width: '10vh',
    height: '10vh',
  },
  fab: {
    marginTop:'10vh',
    position: 'relative',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

export class ForumList extends Component {

  componentDidMount = () => {
    const { dispatch, profile } = this.props
    dispatch(ResetRedirect())
    dispatch(GetList(profile.user_id))
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch, user, profile,data } = this.props


    if(data.length === 0){
      dispatch(GetList(profile.user_id))
      dispatch(GetProfile(user.id));
    }
    
  }

  render() {
    let { match, data, forumListLoaded, classes, user, profile, history } = this.props

    let List = data.map((forum) => {
      return (
        <Grid item key={forum.id} xs={6} md={4}>
        <Grid container alignItems="center"
            direction="column" justify="center" spacing={16}>
              <Grid item xs={12} md={12}  align="center">
            <Button className={classes.button} onClick={() => { history.push('/forum/' + forum.Name) }}>
                <Avatar className={classes.bigAvatar}>
                  {forum.Name}
                  </Avatar>
                  </Button>
              </Grid>
              <Grid item xs={12} md={12} align="center">
                {forum.Name}
              </Grid>
              </Grid>
            
        </Grid>

      );
    })

    if (forumListLoaded === false) {
      return (
      <div align="center"><CircularProgress className={classes.progress} color="secondary"  /></div>
      )
    } else {
      return (

        <Grid container alignItems="flex-start"
          direction="row" justify="space-around" spacing={16}>

          {List}

          {
            (user.id === profile.user_id)
              ? <Grid item xs={6} md={12} align="right"><Button variant="fab" color="primary" aria-label="add" className={classes.fab} onClick={() => { history.push(`${match.url}/addforum`) }}>
                <AddIcon />
              </Button></Grid>
              : ''
          }



        </Grid>



      );
    }

  }
}


ForumList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.forum.forumList,
    user: state.user,
    forumListLoaded: state.forum.forumListLoaded,
    profile: state.user.profile
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(ForumList));
