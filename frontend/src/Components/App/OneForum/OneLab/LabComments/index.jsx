import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment, GetComment } from '../../../../../Redux/Actions/labAction';

import { Grid } from 'material-ui';

export class LabComments extends Component {



  componentDidUpdate=(prevProps)=>{
    const { dispatch, labId } = this.props

    if(!prevProps.labId || (prevProps.labId !== labId)){
    dispatch(GetComment({ labId: labId }));
    }
  }

  addComment = () => {
    const { dispatch } = this.props
    if (this.comment.value !== '') {
      dispatch(addComment({ labId: this.props.labId, comment: this.comment.value, owner: this.props.owner }));
    }


  }

  render() {
    const List = this.props.comment.map((comment) => {

      return (
        <div className="list-group-item" key={comment.id}>

          <div className="" align="justify"><label htmlFor={comment.id} className="">{comment.Comment}</label></div>

        </div>);
    });

    return (
      <Grid style=
      {{marginTop:'4vh'}} container alignItems="flex-start"
        direction="row" justify="space-around" spacing={16}>
        <Grid item xs={12} md={12} align="right">
          <form onSubmit={(e) => { e.preventDefault(); this.addComment(); }}>
            <input type="text" className="form-control col-md-12" ref={type => {
              this.comment = type;
            }} placeholder="What did you think?" />
            <br />
          </form>
        </Grid>
        <Grid item xs={12} md={12} align="right">
          {List}
        </Grid>
      </Grid>

    );
  }

}


const mapStateToProps = (state) => {
  // console.log(state)

  return {
    owner: state.user.id,
    data: state.lab.LabData,
    labId: state.lab.LabData.id,
    redirect: state.lab.redirect,
    redirectToReferer: state.lab.redirectToReferer,
    forumName: state.forum.ForumData.Name,
    path: state.lab.LabData.Path,
    comment: state.lab.Comment,
  };
};

export default connect(
  mapStateToProps
)(LabComments);
