import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList,ResetRedirect } from '../../../../../Redux/Actions/forumAction';

import { Link } from 'react-router-dom'

export class ForumList extends Component {

  componentWillMount = () => {
    const { dispatch } = this.props
    dispatch(ResetRedirect())
    dispatch(GetList(this.props.userId))
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch } = this.props

    if(!this.props.forumListLoaded) {
      dispatch(GetList(this.props.userId))
    }
  }

  render() {
    let {match}= this.props

    let List = this.props.data.map((forum) => {
      return (
        <div key={forum.id} className=" col-6 col-md-4 col-lg-2">
          <div className="media">
            
            <Link to={'/forum/'+forum.Name} className="media-heading">{forum.Name}</Link><br />
          </div>
        </div>

      );
    })

    if(this.props.forumListLoaded === false){
     return(
<div>Loading</div>
     ) 
    }else{
      return (

        <div className="row">
  
              {List}<br />

{
  (this.props.userId === this.props.profile.user_id)
  ?<Link to={`${match.url}/addforum`}><i className="fa fa-plus"></i></Link>
  :''
}
               


          </div>
  
  
  
      );
    }
    
  }
}


const mapStateToProps = (state) => {
  // console.log(state)
  return {
    data: state.forum.forumList,
    userId: state.user.id,
    forumListLoaded: state.forum.forumListLoaded,
    profile:state.user.profile
  };
};

export default connect(
  mapStateToProps
)(ForumList);
