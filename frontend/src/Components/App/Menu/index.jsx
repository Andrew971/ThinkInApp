import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Menu extends Component {
  render() {
    
    return (

      <aside>
        <NavLink to='/dashboard' active="true"><i className="fa fa-tachometer"></i></NavLink>
        <NavLink to="/forum" ><i className="fa fa-book"></i></NavLink>
        <NavLink to="/lab" ><i className="fa fa-users"></i></NavLink>
       <NavLink to="/setting" className="settings"><i className="fa fa-cog"></i></NavLink>
      </aside>


    );
  }
}

export default Menu;
