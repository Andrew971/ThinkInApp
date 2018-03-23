import React, { Component } from 'react';
import { connect } from 'react-redux';
import LabOption from './LabOption'
import Labview from './Labview'
import PrivateRoute from '../../../../js/PrivateRoute'
import { GetOneForum } from '../../../../Redux/Actions/forumAction';
import { GetmyList } from '../../../../Redux/Actions/followAction';
import { Switch, Route, withRouter } from 'react-router-dom'
import { GetOneLab } from '../../../../Redux/Actions/labAction';

export class OneLab extends Component {
  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch, match, viewer, labid } = this.props
    // if (prevProps.labid === undefined || prevProps.labid !== Number(match.params.labId)) {
    //   dispatch(GetOneLab(match.params));
    //   dispatch(GetmyList(viewer))
    // }

  }

  render() {
    let { match } = this.props
 
    return (
      <div>

        <Switch>
          <Route exact path={match.url} render={(routeProps) =>
            <Labview
              {...routeProps}
              match={match}
            />
          }
          />

          <PrivateRoute path={`${match.url}/option`} render={(routeProps) =>
            <LabOption
              {...routeProps}
            />
          }
          />
        </Switch>
      </div>


    );
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.forum.ForumData,
    viewer: state.user.id
  };
};

export default withRouter(connect(
  mapStateToProps
)(OneLab));
