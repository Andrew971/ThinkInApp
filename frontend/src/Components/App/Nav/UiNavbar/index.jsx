import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux';
import { LoginAction, Signout } from '../../../../Redux/Actions/loginAction';
import { searchWord, searchStatus } from '../../../../Redux/Actions/searchAction'

import ResultBox from './ResultBox'
import { withStyles } from 'material-ui/styles';
import { Grid, Divider, AppBar, Toolbar, Typography, IconButton } from 'material-ui';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';

const styles = {
  root: {
    flexGrow: 1,
  },
  typo: {
    margin: 'auto',

  },
  Profile: {
    flex: 2,

  }
};

class logged extends Component {
  state = {
    open: false,
  };


  login = () => {

    const { username, password } = this.loginForm
    const { dispatch } = this.props
    dispatch(LoginAction({ username: username.value, password: password.value }));

  }

  Signout = () => {
    const { dispatch } = this.props

    dispatch(Signout(this.props.token))

  }

  Search = (val) => {
    const { dispatch } = this.props
    console.log(val)

    if (val !== '') {
      dispatch(searchWord(val))
      dispatch(searchStatus(true))
    } else {
      dispatch(searchStatus(false))
    }
  }


  handleMenu = event => {
    this.setState({ open: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: null });
  };

  render() {
    const { dispatch, token } = this.props
    const { classes } = this.props;
    const { open } = this.state;
    const opened = Boolean(open);


    return (
      <div>
        <AppBar position="static" color="secondary">
          <Toolbar>
          <Grid container className={classes.root} alignItems="center" 
           direction="row" justify="space-around" spacing={16}>
          <Grid item xs={12} md>

                <Typography variant="title" color="inherit" style={{textAlign:'center'}}>
                  ThinkIn
              </Typography>
              </Grid>

              {token ? (
                <Grid item xs md={11}>
                <Grid container spacing={16}>
                    <Grid item xs={9} md={11}>
                    <SearchBar
                  
                      onRequestSearch={() => { dispatch(searchStatus(false)) }}
                      onChange={(value) => { this.Search(value) }}
                      style={{
                        margin: 'auto auto .5rem auto',
                        maxWidth: 800,
                      }}
                    />
                  </Grid>
                  <Grid item xs md>
                    <IconButton
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={opened}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={() => {
                        this.props.history.push('/dashboard')
                        this.handleClose()
                      }}>Dashboard</MenuItem>
                      <MenuItem onClick={() => {
                        this.props.history.push(`/${this.props.username}`)
                        this.handleClose()
                      }}>My Profile</MenuItem>
                      <Divider />
                      <MenuItem onClick={() => {
                        this.Signout()
                        this.handleClose()
                      }}>Sign Out</MenuItem>
                    </Menu>
                  </Grid>
                  </Grid>
                </Grid>
              ) : (<Grid item xs>
                <form ref={self => this.loginForm = self}>
                  Username:
 <input type="text" className="" name="username" />
                  Password:
 <input type="password" className="" name="password" />
                  <button type="button" onClick={() => { this.login() }}>Log in</button>

                </form>
              </Grid>)}
              </Grid>

          </Toolbar>
        </AppBar>
        <ResultBox />

      </div>
    )
  }
}
logged.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.login.token,
    redirectToReferrer: state.login.logged,
    labs: state.search.labFilter,
    forums: state.search.forumFilter,
    profile: state.search.profileFilter,
    username:state.user.username
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(logged));
