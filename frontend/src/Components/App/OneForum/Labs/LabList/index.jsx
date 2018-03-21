import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList } from '../../../../../Redux/Actions/labAction';
import { GetOneForum } from '../../../../../Redux/Actions/forumAction';


// import { Link, withRouter } from 'react-router-dom'
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
export class LabList extends Component {
  componentWillMount = () => {
    const { dispatch,redirect,forumId } = this.props

    const forum = localStorage.getItem('prevParams')
    if (!redirect) {
      dispatch(GetOneForum({ forumName: forum }));
    }

    dispatch(GetList(forumId))

  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch,labListLoaded,forumId } = this.props
    if (!labListLoaded) {
      dispatch(GetList(forumId))
    }
  }

  render() {
    let { match, forumName, owner, viewer, labListLoaded, data,classes,history } = this.props

    let List = data.map((lab) => {
      return (

         <Grid item key={lab.id} xs md={2}>
            <Button className={classes.button} onClick={() => { history.push('/forum/' + forumName + '/labs/' + lab.id) }}><Avatar
              className={classes.bigAvatar}
            >TN</Avatar>
            {lab.Title}
            </Button>
        </Grid>
      );
    })

    if (labListLoaded === false) {
      return (
        <div>Loading</div>
      )
    } else {
      return (

          <Grid container alignItems="center" 
           direction="row" justify="space-around" spacing={16}  >

          {List}<br />

          {
            (viewer === owner)
              ? <Button variant="fab" color="secondary" aria-label="add" className={classes.button} onClick={() => { history.push(`${match.url}/addlab`) }}>
                <AddIcon />
              </Button>
              : ''
          }



        </Grid>


      );
    }

  }
}
LabList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.lab.labList,
    forumId: state.forum.ForumData.id,
    labListLoaded: state.lab.labListLoaded,
    forumName: state.forum.ForumData.Name,
    viewer: state.user.id,
    owner: state.forum.ForumData.user_id
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(LabList));
