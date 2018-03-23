import React, { Component } from 'react';
import { connect } from 'react-redux';
import { UpdateProfile } from '../../../../Redux/Actions/getUserInfo';
import { GetProfile } from '../../../../Redux/Actions/getUserInfo';
import ContentEditable from 'react-contenteditable'
import PropTypes from 'prop-types';
import Delete from 'material-ui-icons/Delete';

import { Redirect } from 'react-router-dom'
import { Button } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});
export class Option extends Component {
  constructor() {
    super()
    this.state = {
      first: '',
      last: '',
      age: '',
      bio: '',
      status: true,
      redirect:false
    };
  };

  componentDidMount = () => {
    const { dispatch, redirectToReferer, profileId } = this.props
    if (!redirectToReferer) {
      dispatch(GetProfile(profileId));
    }
  }
  componentDidUpdate = (prevProps) => {
    const { dispatch, profileId,data } = this.props

    if(prevProps.data !== data)
    dispatch(GetProfile( profileId ));

  }

  ChangedFirst = evt => {
    this.setState({ first: evt.target.value })
  };
  ChangedLast = evt => {
    this.setState({ last: evt.target.value })
  };

  ChangedAge = evt => {
    this.setState({ age: evt.target.value })
  };

  ChangedBio = evt => {
    this.setState({ bio: evt.target.value })
  };

  getModify = () => {
    this.setState({ status: false })
  }

  Save = () => {
    const { dispatch, profileId, data } = this.props
    const first = (this.state.first) ? this.state.first : data.first_name;
    const last = (this.state.last) ? this.state.last : data.last_name;
    const age = (this.state.age) ? this.state.age : data.age;
    const bio = (this.state.bio) ? this.state.bio : data.bio;

    dispatch(UpdateProfile({ profileId: profileId, first, last, age, bio }));
    this.setState({ status: false, redirect:true })

  }


  render() {
    const { user, classes, data, message } = this.props;

    if (this.state.redirect) {
      return <Redirect to={'/' + user} />
    }



    return (
      <div>
        Last Update: {data.updated_at}
        <form>
          First Name
          <ContentEditable
            className="form-control"
            html={data.first_name}
            disabled={this.state.status}
            onChange={this.ChangedFirst}
          /><br />
          Last Name
          <ContentEditable
            className="form-control"
            html={data.last_name}
            disabled={this.state.status}
            onChange={this.ChangedLast}
          /><br />
          Age
          <ContentEditable
            className="form-control"
            html={data.age}
            disabled={this.state.status}
            onChange={this.ChangedAge}
          /><br />
          Bio

          <ContentEditable
            className="form-control"
            html={data.bio}
            disabled={this.state.status}
            onChange={this.ChangedBio}
          />
        </form><br />
        {
          (message)
            ? <p style={{ color: 'red', fontWeight: 'bold' }}>{message}</p>
            : ''
        }
        {
          (this.state.status)
            ? <Button className={classes.button} variant="flat" color="default" onClick={() => { this.getModify() }}>
              Modiy
        <Delete className={classes.rightIcon} />
            </Button>
            : <Button className={classes.button} variant="raised" color="secondary" onClick={() => { this.Save() }}>
              Save
        <Delete className={classes.rightIcon} />
            </Button>
        }



      </div>

    );
  }

}

Option.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  // console.log(state)

  return {
    data: state.user.profile,
    profileId: state.user.profile.id,
    redirectToReferer: state.user.redirectToReferer,
    user: state.user.username
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(Option));
