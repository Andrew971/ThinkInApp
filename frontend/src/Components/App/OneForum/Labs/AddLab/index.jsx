import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Add } from '../../../../../Redux/Actions/labAction';
import { GetOneForum } from '../../../../../Redux/Actions/forumAction';

import { Redirect } from 'react-router-dom'

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
    let { goto, forumName} = this.props
    const { redirect } = this.props
    if (redirect === true) {
      return <Redirect to={'/forum/'+forumName+'/labs/'+ goto} />
    }

    return (
        <section>
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
        <button onClick={() => { this.AddLab() }}>Submit</button>
        
          </section>

    );
  }
}


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

export default connect(
  mapStateToProps
)(AddLabs);
