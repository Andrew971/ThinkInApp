import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add } from '../../../../../Redux/Actions/forumAction';

import { Redirect } from 'react-router-dom'

export class AddForum extends Component {

  
  AddForum= ()=>{
    const { name, subject,description } = this.ForumForm

    const { dispatch } = this.props;
    dispatch(Add({userId:this.props.userId,name:name.value,subject:subject.value,description:description.value}));
  }



  render() {
    const { redirect } = this.props
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
        <button onClick={() => { this.AddForum() }}>Submit</button>
        
          </div>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    userId:state.user.id,
    redirect: state.forum.redirect,
    goto: state.forum.goto
  };
};

export default connect(
  mapStateToProps
)(AddForum);
