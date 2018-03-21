import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetList } from '../../../../../Redux/Actions/labAction';
import { GetOneForum } from '../../../../../Redux/Actions/forumAction';


import { Link } from 'react-router-dom'

export class LabList extends Component {
  componentWillMount = () => {
    const { dispatch } = this.props

    const forum = localStorage.getItem('prevParams')
    if(!this.props.redirect) {
      dispatch(GetOneForum({forumName:forum}));
    }

    dispatch(GetList(this.props.forumId))

  }

  componentDidUpdate = (prevProps, prevState) => {
    const { dispatch } = this.props
    if(!this.props.labListLoaded) {
      dispatch(GetList(this.props.forumId))
    }
  }

  render() {
    let {match, forumName,owner, viewer,labListLoaded,data } = this.props

    let List = data.map((lab) => {
      return (
        <div key={lab.id} className=" col-6 col-md-4 col-lg-2">
          <div className="media">
            
            <Link to={'/forum/'+forumName+'/labs/'+ lab.id} className="media-heading">{lab.Title}</Link><br />
          </div>
        </div>

      );
    })

    if(labListLoaded === false){
     return(
<div>Loading</div>
     ) 
    }else{
      return (
      <section style={{ background: "" }}>

        <div className="row">
  
        {List}<br />
        {
(owner===viewer)
?<Link to={`${match.url}/addlab`}> <i className="fa fa-plus"></i></Link> 
:''
}
          </div>
  
  </section>
  
      );
    }
    
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.lab.labList,
    forumId: state.forum.ForumData.id,
    labListLoaded: state.lab.labListLoaded,
    forumName: state.forum.ForumData.Name ,
    viewer:state.user.id,
    owner:state.forum.ForumData.user_id
  };
};

export default connect(
  mapStateToProps
)(LabList);
