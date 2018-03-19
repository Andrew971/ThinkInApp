import React, { Component } from 'react';
import { connect } from 'react-redux';
import LabList from './LabList'
import AddLab from './AddLab'
import OneLab from '../OneLab'
import { ResetRedirect } from '../../../../Redux/Actions/labAction';
import { Route, Switch} from 'react-router-dom'

export class Labs extends Component {
  componentWillMount = () => {
    const { dispatch } = this.props
    dispatch(ResetRedirect())
  }
  render() {
    let {match}= this.props
   
      return (
        
          <Switch>
          <Route exact path={`${match.url}`} render={(routeProps) =>
          <LabList
            {...routeProps}
          />
        }
        />
          <Route path={`${match.url}/addlab`} render={(routeProps) =>
          <AddLab
            {...routeProps}
          />
        }
        />
        <Route path={`${match.url}/:labId`} render={(routeProps)=>
          <OneLab 
          {...routeProps}
          />
        }
        />
        </Switch>
  
  
  
      );
    }
    
  }


const mapStateToProps = (state) => {
  return {
    data: state.forum.ForumData
  };
};

export default connect(
  mapStateToProps
)(Labs);
