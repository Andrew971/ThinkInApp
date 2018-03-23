import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './Assets/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './Redux/store'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
const initialState = {};
const store = configureStore(initialState)

const theme = createMuiTheme({
  palette: {
    primary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
    secondary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
  },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
  <Provider store={store}>
<Router>
  <Route path="/" component={App}/>
</Router>
</Provider>
</MuiThemeProvider>

, document.getElementById('root'));
