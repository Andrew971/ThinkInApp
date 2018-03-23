import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList } from '../../../../../Redux/Actions/labAction';
// import { GetOneForum } from '../../../../../Redux/Actions/forumAction';
import { CircularProgress } from 'material-ui/Progress';


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
    const { dispatch,forumId } = this.props
    dispatch(GetList(forumId))
    
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch,labList,forumId,match } = this.props
    if (labList.length === 0) {
      dispatch(GetList(forumId))
    }
    if (prevProps.match.params !== match.params) {
      dispatch(GetList(forumId))
    }
  }

  render() {
    let { match, forumName, owner, viewer, labList, data,classes,history } = this.props

    let List = data.map((lab) => {
      return (

         <Grid item key={lab.id} xs={6} md={4}>
        <Grid container alignItems="center"
            direction="column" justify="center" spacing={16}>
              <Grid item xs={12} md={12}  align="center">
            <Button className={classes.button} onClick={() => { history.push('/forum/' + forumName + '/labs/' + lab.id) }}><Avatar
              className={classes.bigAvatar}
            >{lab.Title}</Avatar>
            </Button>
            </Grid>
              <Grid item xs={12} md={12} align="center">
              {lab.Title}
              </Grid>
              </Grid>
            
        </Grid>      );
    })

    if (!labList) {
      return (
      <div align="center"><CircularProgress className={classes.progress} color="secondary"  /></div>
      )
    } else {
      return (

           <Grid container alignItems="flex-start"
          direction="row" justify="space-around" spacing={16}>

          {List}<br />

          {
            (viewer === owner)
              ? <Grid item xs={6} md={12} align="right"><Button variant="fab" color="primary" aria-label="add" className={classes.fab} onClick={() => { history.push(`${match.url}/addlab`) }}>
                <AddIcon />
              </Button></Grid>
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
    // console.log(state)

  return {
    data: state.lab.labList,
    forumId: state.forum.ForumData.id,
    labListLoaded: state.lab.labListLoaded,
    forumName: state.forum.ForumData.Name,
    viewer: state.user.id,
    owner: state.forum.ForumData.user_id,
    labList:state.lab.labList
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(LabList));
