import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable'
import { Redirect } from 'react-router-dom'
import { GetOneLab, UpdateLab,deleteLab } from '../../../../../Redux/Actions/labAction';


export class LabOption extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      subject: '',
      blog: '',
      status: true
    };
  };

  componentDidMount = () => {
    const { dispatch } = this.props
    const lab = localStorage.getItem('prevParams')
    if (!this.props.redirect) {
      dispatch(GetOneLab({labId: lab}));
    }
  }

  ChangedTitle = evt => {
    this.setState({ title: evt.target.value })
  };

  ChangedSubject = evt => {
    this.setState({ subject: evt.target.value })
  };

  ChangedBlog = evt => {
    this.setState({ blog: evt.target.value })
  };

  getModify = () => {
    this.setState({ status: false })
  }

  Save = () => {
    const title = (this.state.title) ? this.state.title : this.props.data.Title;
    const subject = (this.state.subject) ? this.state.subject : this.props.data.Subject;
    const blog = (this.state.blog) ? this.state.blog : this.props.data.Blog;

    const { dispatch } = this.props
    dispatch(UpdateLab({ labId: this.props.labId, title, subject, blog }));
  }

  delete = () => {
    const { dispatch } = this.props
    dispatch(deleteLab({ labId: this.props.labId }));
  }

  render() {
    const { redirect, redirectToReferer } = this.props;
    const { labId, forumName,path} = this.props

    if (redirect) {
      return <Redirect to={'/'+forumName} />
    }

    if (redirectToReferer) {
      return <Redirect to={path + labId}  />
    }

    return (
      <section>
        <form>
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Title}
            disabled={this.state.status}
            onChange={this.ChangedTitle}
          /><br />
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Subject}
            disabled={this.state.status}
            onChange={this.ChangedSubject}
          /><br />
          <ContentEditable
            className="form-control col-md-12"
            html={this.props.data.Blog}
            disabled={this.state.status}
            onChange={this.ChangedBlog}
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
            : <button onClick={() => { this.Save() }}>Save</button>
        }
        <button onClick={() => { this.delete() }}>Delete</button>

      </section>
  
      );
    }
    
  }


const mapStateToProps = (state) => {
  console.log(state)

  return {
    data: state.lab.LabData,
    labId: state.lab.LabData.id,
    redirect: state.lab.redirect,
    redirectToReferer: state.lab.redirectToReferer,
    forumName: state.forum.ForumData.Name,
    path: state.lab.LabData.Path


  };
};

export default connect(
  mapStateToProps
)(LabOption);
