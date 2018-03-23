import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FollowOneLab, unFollowOneLab, GetmyList } from '../../../../../Redux/Actions/followAction';
import LabComments from '../LabComments'

import { GetOneLab, ResetRedirect, GetComment } from '../../../../../Redux/Actions/labAction';

import { Typography, Chip, Button } from 'material-ui';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

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
export class Labview extends Component {
  componentWillMount = () => {
    const { dispatch, match, viewer,data } = this.props;
    localStorage.setItem('prevParamslab', match.params.labId)
    dispatch(GetOneLab(match.params));
    dispatch(ResetRedirect())
    dispatch(GetmyList(viewer))
    dispatch(GetComment({ labId: data.id }));

  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch, match, viewer,data } = this.props
   
    console.log(prevProps.labid, Number(match.params.labId))

    if ((Object.keys(prevProps.data).length === 0) || 
    (prevProps.labid !== Number(match.params.labId))) {
      dispatch(GetOneLab(match.params));
      dispatch(GetmyList(viewer))
       
    }


  
  }

  FollowLab = () => {
    const { dispatch, match, viewer } = this.props;
    const { labId } = match.params
    dispatch(FollowOneLab({ labid: Number(labId), userId: viewer }));
  }

  UnFollowLab = () => {
    const { dispatch, viewer, match } = this.props;
    const { labId } = match.params

    dispatch(unFollowOneLab({ user_id: viewer, labid: Number(labId) }));
  }
  render() {
    let { match, mylabs, data, owner, viewer, classes, history } = this.props
    let hideFollow = mylabs.filter(elm => {
      return elm.id === data.id
    })
    return (
      <div>
        <Typography align="center" variant="headline" component="h1">
          {data.Title}
        </Typography>
        <Typography align="center" component="p">
          {data.Subject}
        </Typography>

        {
          (owner.user_id === viewer)
            ? <Button align="center" size="small" color="secondary" onClick={() => {
              history.push(`${match.url}/option`)
            }}>Option</Button>
            : ''
        }
        {
          (viewer)
            ? (owner.user_id !== viewer)
              ? (hideFollow.length !== 0)
                ? <Chip
                  label="UnFollow"
                  onClick={() => { this.UnFollowLab() }}
                  className={classes.chip}
                  color="secondary"
                />
                : <Chip
                  label="Follow"
                  onClick={() => { this.FollowLab() }}
                  className={classes.chip}
                  color="secondary"
                />
              : ''
            : ''
        }

        <Typography align="justify" component="p">
          {data.Blog}

        </Typography>
        <LabComments />
      </div>


    );
  }
}

Labview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    data: state.lab.LabData,
    viewer: state.user.id,
    owner: state.lab.LabData,
    mylabs: state.follow.MyListLabs,
    labid:state.lab.LabData.id,

  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(Labview));
