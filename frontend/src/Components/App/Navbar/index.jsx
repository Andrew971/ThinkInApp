import React, { Component } from 'react';
import SearchBar from 'material-ui-search-bar'
import { connect } from 'react-redux';
import { LoginAction, Signout } from '../../../Redux/Actions/loginAction';
import { searchWord, searchStatus } from '../../../Redux/Actions/searchAction'
import Fade from 'material-ui/transitions/Fade';

import ResultBox from './ResultBox'
import { withStyles } from 'material-ui/styles';
import { Grid, Divider, AppBar, Toolbar, Typography, IconButton, Button } from 'material-ui';

import AccountCircle from 'material-ui-icons/AccountCircle';
import Menu, { MenuItem } from 'material-ui/Menu';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  typo: {
    margin: 'auto',

  },
  menu: {
    top: '-2vh',
    position: 'absolute',

  },
  Profile: {
    flex: 2,

  },
  button: {
    margin: theme.spacing.unit,
  },
});

class logged extends Component {
  state = {
    open: null,
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
        <AppBar position="static" color="primary">
          <Toolbar>
            <Grid container className={classes.root} alignItems="center"
              direction="row" justify="space-around" spacing={16}>
              <Grid item xs={12} md={1}>

                <Typography variant="title" color="inherit" style={{ textAlign: 'center' }}>
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
                        id="simple-menu"
                        anchorEl={open}
                        open={opened}
                        onClose={this.handleClose}
                        transition={Fade}

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
                  <Grid container alignItems="center" justify="flex-end" spacing={16}>
                    <Grid item xs={12} md={4} align="center">
                      <Grid container alignItems="center" justify="center" spacing={16}>

                        <Grid item xs={12} md={6} align="center">

                          <Typography color="inherit" style={{ textAlign: 'center' }}>Username:</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} align="center">

                          <input type="text" className="" name="username" />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={4} align="center">
                      <Grid container alignItems="center" justify="center" spacing={16}>

                        <Grid item xs={12} md={6} align="center">
                          <Typography color="inherit" style={{ textAlign: 'center' }}>Password: </Typography>
                        </Grid>

                        <Grid item xs={12} md={6} align="center">
                          <input type="password" className="" name="password" />
                        </Grid>

                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={1} align="center">
                      <Button color="default" className={classes.button} onClick={() => { this.login() }}>Log in</Button>
                    </Grid>
                  </Grid>
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
    username: state.user.username
  };
};

export default withStyles(styles)(connect(
  mapStateToProps
)(logged));
