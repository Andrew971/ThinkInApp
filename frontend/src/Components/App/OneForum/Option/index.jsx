import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GetOneForum, deleteForum, UpdateForum } from '../../../../Redux/Actions/forumAction';
import ContentEditable from 'react-contenteditable'

import { Redirect } from 'react-router-dom'

export class Option extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      subject: '',
      description: '',
      status: true
    };
  };

  componentDidMount = () => {
    const { dispatch } = this.props
    const forum = localStorage.getItem('prevParams')
    if (!this.props.redirect) {
      dispatch(GetOneForum({ forumName: forum }));
    }
  }

  ChangedName = evt => {
    this.setState({ name: evt.target.value })
  };

  ChangedSubject = evt => {
    this.setState({ subject: evt.target.value })
  };

  ChangedDescription = evt => {
    this.setState({ description: evt.target.value })
  };

  getModify = () => {
    this.setState({ status: false })
  }

  Save = () => {
    const name = (this.state.name) ? this.state.name : this.props.data.Name;
    const subject = (this.state.subject) ? this.state.subject : this.props.data.Subject;
    const description = (this.state.description) ? this.state.description : this.props.data.Description;

    const { dispatch } = this.props
    dispatch(UpdateForum({ forumId: this.props.forumid, name, subject, description }));

  }

  delete = () => {
    const { dispatch } = this.props
    dispatch(deleteForum({ forumId: this.props.forumid }));

  }

  render() {
    const { redirect, redirectToReferer, user } = this.props;

    if (redirect) {
      return <Redirect to={`${user}/forum`} />
    }

    if (redirectToReferer) {
      return <Redirect to={'/forum/' + this.props.data.Name} />
    }



    return (
      <section>
        <form>
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Name}
            disabled={this.state.status}
            onChange={this.ChangedName}
          /><br />
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Subject}
            disabled={this.state.status}
            onChange={this.ChangedSubject}
          /><br />
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Description}
            disabled={this.state.status}
            onChange={this.ChangedDescription}
          />
        </form><br />
        {
          (this.props.message)
            ? <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.message}</p>
            : ''
        }
        {
          (this.state.status)
            ? <button onClick={() => { this.getModify() }}>Modify</button>
            : <button onClick={() => { this.Save()}}>Save</button>
        }
        <button onClick={() => { this.delete()
          
           }}>Delete</button>

      </section>

    );
  }

}


const mapStateToProps = (state) => {
  return {
    data: state.forum.ForumData,
    forumid: state.forum.ForumData.id,
    redirect: state.forum.redirect,
    redirectToReferer: state.forum.redirectToReferer,
    user:state.user.username
  };
};

export default connect(
  mapStateToProps
)(Option);
