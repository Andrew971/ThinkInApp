import React, { Component } from 'react';
import { connect } from 'react-redux';
import LabOption from './LabOption'
import Labview from './Labview'
import PrivateRoute from '../../../../js/PrivateRoute'
import { GetOneForum } from '../../../../Redux/Actions/forumAction';

import { Switch, Route, withRouter } from 'react-router-dom'

export class OneForum extends Component {

  componentDidUpdate=(prevProps)=>{
    if(prevProps.match.params !== this.props.match.params){
     const { dispatch } = this.props;
     dispatch(GetOneForum(this.props.match.params));
    }
  }
  render() {
    let {match}= this.props
    return (
       <div>
       
   <Switch>
   <Route exact path={match.url} render={(routeProps)=>
          <Labview 
          {...routeProps}
          match={match}
          />
        }
        />

        <PrivateRoute path={`${match.url}/option`} render={(routeProps)=>
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
  return {
  };
};

export default withRouter(connect(
  mapStateToProps
)(OneForum));
