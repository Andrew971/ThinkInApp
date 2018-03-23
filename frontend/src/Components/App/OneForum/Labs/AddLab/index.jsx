import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add } from '../../../../../Redux/Actions/labAction';
import { GetOneForum } from '../../../../../Redux/Actions/forumAction';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom'
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

export class AddLabs extends Component {
  componentDidMount= () => {
    const { dispatch } = this.props
    const forum = localStorage.getItem('prevParams')
    if(!this.props.redirect) {
      dispatch(GetOneForum({forumName:forum}));
    }
  }

  AddLab= ()=>{
    const { title, subject,blog } = this.ForumForm

    const { dispatch } = this.props;
    dispatch(Add({forumId:this.props.forumId,title:title.value,subject:subject.value,blog:blog.value,forumName:this.props.forumName,owner:this.props.owner}));
  }




  render() {
    let { goto, forumName,classes, redirect} = this.props

    if (redirect === true) {
      return <Redirect to={'/forum/'+forumName+'/labs/'+ goto} />
    }

    return (
        <div>
      <form ref={self => this.ForumForm = self}>
            <input type="text" className="form-control col-md-12" placeholder="Type your Title here" name="title" /><br />
            <input type="test" className="form-control col-md-12" placeholder="Type your subject here" name="subject" /><br />
            <textarea type="textarea" className="form-control col-md-12" placeholder="Type your blog here" name="blog" rows="5"/>
            
          </form><br />
          {
          (this.props.message)
            ? <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.message}</p>
            : ''
        }
        <Button className={classes.button} variant="raised" color="primary" onClick={() => { this.AddLab() }}>
              Save
            </Button>
          </div>

    );
  }
}
AddLabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    forumId: state.forum.ForumData.id,
    forumName: state.forum.ForumData.Name ,
    redirect: state.lab.redirect,
    goto: state.lab.goto,
    owner:state.user.id,
    forumdata:state.forum.ForumData
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(AddLabs));
