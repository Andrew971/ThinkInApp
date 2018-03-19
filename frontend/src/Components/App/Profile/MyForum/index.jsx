import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddForum from './AddForum'
import ListOf from './ListOf'

// import { changeDate } from '../../../../Redux/Actions/clockAction';
// import { getTime } from '../../../../Redux/Selectors/clockSelector';
// import { getDate } from '../../../../Redux/Selectors/clockSelector';
// import { Greeting } from '../../../../Redux/Selectors/clockSelector';

import {Route, Switch } from 'react-router-dom'

export class Forum extends Component {

  render() {
 let {match}= this.props
    return (
      <section style={{ background: "" }}>
      <Switch>

          <Route exact path={`${match.url}`} render={(routeProps) =>
          <ListOf
            {...routeProps}
          />
        }
        />

          <Route exact path={`${match.url}/addforum`} render={(routeProps) =>
          <AddForum
            {...routeProps}
          />
        }
        />
        </Switch>
      </section>


    );
  }
}


const mapStateToProps = (state) => {
  return {

  };
};

export default connect(
  mapStateToProps
)(Forum);
