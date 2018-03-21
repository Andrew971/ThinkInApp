import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneForum,ResetRedirect } from '../../../../Redux/Actions/forumAction';


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

    return (
      <div style={{ background: "" }}>
         test:
   {this.props.data.Name}
<br />




  </div>


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
