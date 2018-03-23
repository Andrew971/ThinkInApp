import React, { Component } from 'react';
import { connect } from 'react-redux';


import { withRouter } from 'react-router-dom'

import { Typography } from 'material-ui';

export class ForumView extends Component {


  render() {
    let { data } = this.props

    return (
      <div>
        <Typography align="center" variant="headline" component="h1">
          Subject:</Typography>
        <Typography align="center" component="p">
          {data.Subject}
        </Typography>

        <br />
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
    viewer: state.user.id,
    owner: state.forum.ForumData.user_id
  };
};

export default withRouter(connect(
  mapStateToProps
)(ForumView));
