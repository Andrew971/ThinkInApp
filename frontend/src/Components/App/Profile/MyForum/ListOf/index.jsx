import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList, ResetRedirect } from '../../../../../Redux/Actions/forumAction';

import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Button, Avatar,Grid } from 'material-ui';
import AddIcon from 'material-ui-icons/Add';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  bigAvatar: {
    width: '10vh',
    height: '10vh',
  }
});

export class ForumList extends Component {

  componentWillMount = () => {
    const { dispatch, userId } = this.props
    dispatch(ResetRedirect())
    dispatch(GetList(userId))
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch, forumListLoaded, userId } = this.props

    if (!forumListLoaded) {
      dispatch(GetList(userId))
    }
  }

  render() {
    let { match, data, forumListLoaded, classes, userId, profile, history } = this.props

    let List = data.map((forum) => {
      return (
        <Grid item key={forum.id} xs md={2}>
            <Button className={classes.button} onClick={() => { history.push('/forum/' + forum.Name) }}><Avatar
              className={classes.bigAvatar}
            >{forum.Name}</Avatar>
              {forum.Name}
            </Button>
        </Grid>

      );
    })

    if (forumListLoaded === false) {
      return (
        <div>Loading</div>
      )
    } else {
      return (

        <Grid container alignItems="center" 
           direction="row" justify="space-around" spacing={16}  >

          {List}<br />

          {
            (userId === profile.user_id)
              ? <Button variant="fab" color="secondary" aria-label="add" className={classes.button} onClick={() => { history.push(`${match.url}/addforum`) }}>
                <AddIcon />
              </Button>
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
  // console.log(state)
  return {
    data: state.forum.forumList,
    userId: state.user.id,
    forumListLoaded: state.forum.forumListLoaded,
    profile: state.user.profile
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(ForumList));
