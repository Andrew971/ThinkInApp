import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './Assets/css/styles.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './Redux/store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from './js/MuiTheme'
const initialState = {};
const store = configureStore(initialState)

ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
  <Provider store={store}>
<Router>
  <Route path="/" component={App}/>
</Router>
</Provider>
</MuiThemeProvider>

, document.getElementById('root'));
