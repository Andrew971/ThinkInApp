import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeDate } from '../../../Redux/Actions/clockAction';
import { getTime } from '../../../Redux/Selectors/clockSelector';
import { getDate } from '../../../Redux/Selectors/clockSelector';
import { Greeting } from '../../../Redux/Selectors/clockSelector';

import {Link} from 'react-router-dom'

export class Dashboard extends Component {

  componentDidMount = () => {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { dispatch } = this.props;
    dispatch(changeDate(new Date()));
  }
  render() {
    return (
      <main>
      <section style={{ background: "" }}>
        <div className="time" align="center">
          <h1>{this.props.time}</h1>
          <h2>{this.props.date}</h2>
          <h3>{this.props.greeting}, {this.props.username}!</h3>

        </div>
        <div className="container">
          <div className="row" align="center">
            <div className="col-lg-3">
              <Link to={"/"+this.props.username} className="dash_icon">
                <i className="fa fa-home"></i>
              </Link>
            </div>
            <div className="col-lg-3">
              <Link to="/login" className="dash_icon">
                <i className="fa fa-comments"></i>
              </Link>
            </div>
            <div className="col-lg-3">
              <Link to="/" className="dash_icon">
                <i className="fa fa-bell"></i>
              </Link>
            </div>
            <div className="col-lg-3">
              <Link to="/" className="dash_icon">
                <i className="fa fa-bar-chart"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </main>

    );
  }
}


const mapStateToProps = (state) => {
  return {
    time: getTime(state),
    date: getDate(state),
    greeting: Greeting(state),
    username: state.user.username

  };
};

export default connect(
  mapStateToProps
)(Dashboard);
