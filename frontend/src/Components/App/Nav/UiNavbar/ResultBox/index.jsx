import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { searchStatus } from '../../../../../Redux/Actions/searchAction'

class ResultBox extends Component {

  render() {
    const { dispatch } = this.props
    if(!this.props.status){
      return ''
    }
    return (
      <div className="result_box">
        <u>Profile:</u>
        <ul className="list-group">
          {
            this.props.profile.map(user => {
              return (
                <li key={user.id}>
                  <Link to={user.link} onClick={() => {
                    dispatch(searchStatus(false))
                  }}>{user.first_name +user.last_name }</Link>
                </li>
              )
            })
          }
        </ul><br />
        <u>Forum:</u>
        <ul className="list-group">
          {
            this.props.forums.map(forum => {
              return (
                <li key={forum.id}>
                  <Link to={`/forum/${forum.Name}`} onClick={() => {
                    dispatch(searchStatus(false))
                  }}>{forum.Name}</Link>
                </li>
              )
            })
          }
        </ul><br />
        <u>Labs:</u>
        <ul className="list-group">
          {
            this.props.labs.map(lab => {
              return (
                <li key={lab.id}>
                  <Link to={`/forum${lab.Path}${lab.id}`} onClick={() => {
                    dispatch(searchStatus(false))
                  }}>{lab.Title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.search.status,
    labs: state.search.labFilter,
    forums: state.search.forumFilter,
    profile: state.search.profileFilter,

  }
}


export default connect(mapStateToProps)(ResultBox);
