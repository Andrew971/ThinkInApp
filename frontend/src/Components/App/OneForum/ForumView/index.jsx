import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneForum,ResetRedirect } from '../../../../Redux/Actions/forumAction';

import { Link } from 'react-router-dom'

export class ForumView extends Component {

  componentWillMount=()=>{
    const { dispatch } = this.props;
    localStorage.setItem('prevParams',this.props.match.params.forumName)
    dispatch(GetOneForum(this.props.match.params));
    dispatch(ResetRedirect())
   }

   componentDidUpdate=(prevProps)=>{
     if(prevProps.match.params !== this.props.match.params){
      const { dispatch } = this.props;
      dispatch(GetOneForum(this.props.match.params));
     }
  
  }

  render() {

let {match} = this.props
    return (
      <section style={{ background: "" }}>
         test:
   {this.props.data.Name}
<br />
<Link to={`${match.url}/labs`}>Labs</Link><br />
{
(this.props.owner===this.props.viewer)
?<Link to={`${match.url}/option`}>Option</Link>
:''
}


  </section>


    );
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.forum.ForumData,
    viewer:state.user.id,
    owner:state.forum.ForumData.user_id
  };
};

export default connect(
  mapStateToProps
)(ForumView);
