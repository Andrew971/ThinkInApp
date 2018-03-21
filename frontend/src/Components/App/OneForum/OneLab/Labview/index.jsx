import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneLab,ResetRedirect } from '../../../../../Redux/Actions/labAction';
import { FollowOneLab } from '../../../../../Redux/Actions/followAction';
import LabComments from '../LabComments'

import { Link } from 'react-router-dom'

export class Labview extends Component {
  componentWillMount = () => {
    const { dispatch } = this.props;
    localStorage.setItem('prevParams',this.props.match.params.labId)
    dispatch(GetOneLab(this.props.match.params));
    dispatch(ResetRedirect())
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch } = this.props

    if (prevProps.match.params !== this.props.match.params) {
      dispatch(GetOneLab(this.props.match.params));
    }
  }

  FollowLab = () => {
    const { dispatch } = this.props;
    const { labId } = this.props.match.params
    dispatch(FollowOneLab({ labId: Number(labId), userId: this.props.viewer }));
  }
  
  render() {
    let { match } = this.props
    let hideFollow = this.props.mylabs.filter(elm => {
      return elm.id === this.props.data.id
    })
    return (
      <div>
        test: ok1
         <br />
        {this.props.data.Title}
        <br />
        {
          (this.props.owner === this.props.viewer)
            ? <Link to={`${match.url}/option`}>Option</Link>
            : ''
        }
        {
          (this.props.owner !== this.props.viewer)
            ? (hideFollow)
              ? <button>Followed</button>
              : <button onClick={() => { this.FollowLab() }}>Followed</button>
            : ''
        }

        <LabComments />
      </div>


    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.lab.LabData,
    viewer: state.user.id,
    owner: state.lab.LabData.user_id,
    mylabs: state.follow.FollowedLab
  };
};

export default connect(
  mapStateToProps
)(Labview);
