import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneLab, ResetRedirect } from '../../../../../Redux/Actions/labAction';
import { FollowOneLab } from '../../../../../Redux/Actions/followAction';
import LabComments from '../LabComments'

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
    const { dispatch, match } = this.props;
    localStorage.setItem('prevParams', match.params.labId)
    dispatch(GetOneLab(match.params));
    dispatch(ResetRedirect())
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch, match } = this.props

    if (prevProps.match.params !== match.params) {
      dispatch(GetOneLab(match.params));
    }
  }

  FollowLab = () => {
    const { dispatch, match, viewer} = this.props;
    const { labId } = match.params
    dispatch(FollowOneLab({ labId: Number(labId), userId: viewer }));
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
          (owner === viewer)
            ? <Button align="center" size="small" color="secondary" onClick={() => {
                    history.push(`${match.url}/option`)
                  }}>Option</Button>
            : ''
        }
        {
          (owner !== viewer)
            ? (hideFollow)
              ? <Chip
                label="UnFollow"
                onClick={() => { }}
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
  console.log(state)
  return {
    data: state.lab.LabData,
    viewer: state.user.id,
    owner: state.lab.LabData.user_id,
    mylabs: state.follow.FollowedLab
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(Labview));
