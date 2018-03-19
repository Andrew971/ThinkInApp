import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { GetListFolowed,GetmyList  } from '../../../../Redux/Actions/followAction';

import { Link } from 'react-router-dom'

export class Mylabs extends Component {

  // componentDidMount = () => {
  //   const { dispatch } = this.props
  //   dispatch(GetListFolowed(this.props.userId))
  //   dispatch(GetmyList(this.props.owner))

  // }

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { dispatch } = this.props
  //   if (!this.props.listLoaded) {
  //     dispatch(GetListFolowed(this.props.userId))

  //     dispatch(GetmyList(this.props.owner))
  //   }
 
  // }

  // componentWillUnmount=()=>{

  // }

  render() {

    let ListLab = this.props.Labs.map((lab) => {
      return (
        <div key={lab.id} className=" col-6 col-md-4 col-lg-2">
          <div className="media">

            <Link to={`${lab.Path}${lab.id}`} className="media-heading">{lab.Title}</Link><br />
          </div>
        </div>

      );
    })
    let ListUser = this.props.User.map((lab) => {
      return (
        <div key={lab.id} className=" col-6 col-md-4 col-lg-2">
          <div className="media">

            <Link to={lab.link} className="media-heading">{`${lab.first_name} ${lab.last_name}`}</Link><br />
          </div>
        </div>

      );
    })

    if (this.props.listLoaded === false) {
      return (
        <div>Loading</div>
      )
    } else {
      return (
        <section>
          <div className="row">

            {ListLab}<br />
          </div>
          <div className="row">

            {ListUser}<br />
          </div>

        </section>
      );
    }

  }
}


const mapStateToProps = (state) => {
  return {
    Labs: state.follow.FollowedLab,
    User: state.follow.FollowedUser,
    userId: state.user.profile.user_id,
    listLoaded: state.follow.listLoaded,
    owner:state.user.id

  };
};

export default connect(
  mapStateToProps
)(Mylabs);
