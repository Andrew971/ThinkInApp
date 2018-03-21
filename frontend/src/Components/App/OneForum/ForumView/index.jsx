import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneForum,ResetRedirect } from '../../../../Redux/Actions/forumAction';

import { withRouter } from 'react-router-dom'

import { Typography } from 'material-ui';

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
    let { data } = this.props

    return (
      <div>
        <Typography align="center" variant="headline" component="h1">
          Subject:</Typography>
        <Typography align="center" component="p">
          {data.Subject}
        </Typography>


        <Typography align="center" component="p">
          Description:{data.Description}

        </Typography>


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

export default withRouter(connect(
  mapStateToProps
)(ForumView));
