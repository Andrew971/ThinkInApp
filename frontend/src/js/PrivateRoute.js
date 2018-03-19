import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';


const PrivateRoute = ({ component: Component, render: Render, ...restOfProps }) => (
  <Route {...restOfProps} render={(routeProps) => {
    //Check if the user is authenticated. 
   
    return (restOfProps.token
      ? Component 
        ? <Component {...routeProps} /> 
        : Render({...restOfProps, ...routeProps})
      : <Redirect to={{
        pathname: '/',
        state: { from: routeProps.location }
    }} />
    )   
  }} />
)


const mapStateToProps = (state) => {
  return {
    token:state.login.token
  };
};

export default connect(
  mapStateToProps
)(PrivateRoute);