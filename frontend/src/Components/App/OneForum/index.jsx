import React, { Component } from 'react';
import { connect } from 'react-redux';
import Labs from './Labs'
import Option from './Option'
import ForumView from './ForumView'
import PrivateRoute from '../../../js/PrivateRoute'

import { Switch, Route } from 'react-router-dom'

export class ForumOption extends Component {


  render() {
    let {match}= this.props
    return (
       <main>
   <Switch>
   <Route exact path={match.url} render={(routeProps)=>
          <ForumView 
          {...routeProps}
          match={match}
          />
        }
        />
      <Route path={`${match.url}/labs`} render={(routeProps)=>
          <Labs
          {...routeProps}
          />
        }
        />
        <PrivateRoute path={`${match.url}/option`} render={(routeProps)=>
          <Option 
          {...routeProps}
          />
        }
        />    
        </Switch>
        </main>

    );
  }
}


const mapStateToProps = (state) => {
  return {
  };
};

export default connect(
  mapStateToProps
)(ForumOption);
