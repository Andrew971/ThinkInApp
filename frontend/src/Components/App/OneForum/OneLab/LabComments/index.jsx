import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneLab, addComment,GetComment } from '../../../../../Redux/Actions/labAction';
import {Zoom} from 'material-ui/transitions';


export class LabComments extends Component {


  componentWillMount = () => {
    const { dispatch } = this.props
    const lab = localStorage.getItem('prevParams')
    if (!this.props.redirect) {
      dispatch(GetOneLab({ labId: lab }));
    }
    dispatch(GetComment({ labId: lab }));
  }

  addComment=()=>{
    const { dispatch } = this.props
    if (this.comment.value!=='') {
      dispatch(addComment({ labId: this.props.labId,comment: this.comment.value, owner:this.props.owner}));
     }
    

  }

  render() {
    const List = this.props.comment.map((comment) => {

      return (
        <div className="list-group-item row" key={comment.id}>

          <div className="col-md-8" align="justify"><label htmlFor={comment.id} className="">{comment.Comment}</label></div>

        </div>);
    });

    return (
      <div>
        <form onSubmit={(e) => {e.preventDefault();this.addComment();}}>
          <input type="text" className="form-control col-md-12" ref={type => {
            this.comment = type;
          }} placeholder="What is your plan for today?" />
          <br />
        </form>

        <div className="list">
          <div className="list-group">
            {List}
      </div>
        </div>
      </div>

    );
  }

}


const mapStateToProps = (state) => {

  return {
    owner: state.user.id,
    data: state.lab.LabData,
    labId: state.lab.LabData.id,
    redirect: state.lab.redirect,
    redirectToReferer: state.lab.redirectToReferer,
    forumName: state.forum.ForumData.Name,
    path: state.lab.LabData.Path,
    comment:state.lab.Comment,
  };
};

export default connect(
  mapStateToProps
)(LabComments);
