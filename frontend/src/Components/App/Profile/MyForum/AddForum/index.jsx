import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add } from '../../../../../Redux/Actions/forumAction';
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router-dom'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

export class AddForum extends Component {

  AddForum= ()=>{
    const { name, subject,description } = this.ForumForm

    const { dispatch } = this.props;
    dispatch(Add({userId:this.props.userId,name:name.value,subject:subject.value,description:description.value}));
  }



  render() {
    const { redirect,classes } = this.props
    if (redirect === true) {
      return <Redirect to={'/forum/'+ this.props.goto} />
    }

    return (
        <div>
      <form ref={self => this.ForumForm = self}>
            <input type="text" className="form-control col-md-12" placeholder="Type your Forum's name here" name="name" /><br />
            <input type="test" className="form-control col-md-12" placeholder="Type your subject here" name="subject" /><br />
            <textarea type="textarea" className="form-control col-md-12" placeholder="Type your description here" name="description" rows="5"/>
            
          </form><br />
          {
          (this.props.message)
            ? <p style={{ color: 'red', fontWeight: 'bold' }}>{this.props.message}</p>
            : ''
        }
        <Button className={classes.button} variant="raised" color="primary" onClick={() => { this.AddForum() }}>
              Save
            </Button>
          </div>

    );
  }
}

AddForum.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    userId:state.user.id,
    redirect: state.forum.redirect,
    goto: state.forum.goto
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(AddForum));
