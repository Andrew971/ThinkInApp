import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContentEditable from 'react-contenteditable'
import { Redirect } from 'react-router-dom'
import { GetOneLab, UpdateLab,deleteLab } from '../../../../../Redux/Actions/labAction';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import Delete from 'material-ui-icons/Delete';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

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
    const lab = localStorage.getItem('prevParamslab')
    console.log(lab)
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
    const { dispatch,forumName } = this.props
    dispatch(UpdateLab({ forumName:forumName, labId: this.props.labId, title, subject, blog }));
  }

  delete = () => {
    const { dispatch } = this.props
    dispatch(deleteLab({ labId: this.props.labId }));
  }

  render() {
    const { redirect, redirectToReferer, labId, forumName,path, classes } = this.props;

    if (redirect) {
      return <Redirect to={'/forum/'+forumName} />
    }

    if (redirectToReferer) {
      return <Redirect to={'/forum'+path + labId}  />
    }

    return (
      <div>
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
            ? <Button className={classes.button} variant="flat" color="default" onClick={() => { this.getModify()}}>
        Modiy
        <Delete className={classes.rightIcon} />
      </Button>
            : <Button className={classes.button} variant="raised" color="primary" onClick={() => { this.Save()}}>
        Save
        <Delete className={classes.rightIcon} />
      </Button>
        }

        <Button className={classes.button} variant="raised" color="secondary" onClick={() => { this.delete()}}>
        Delete
        <Delete className={classes.rightIcon} />
      </Button>

      </div>
  
      );
    }
    
  }

  Option.propTypes = {
    classes: PropTypes.object.isRequired,
  };
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

export default withStyles(styles)(connect(
  mapStateToProps
)(LabOption));
