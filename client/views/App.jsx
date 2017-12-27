import React from 'react';

import Routes from '../config/router.jsx';

import AppBar from './layout/app-bar.js';

export default class App extends React.Component {
  componentDidMount() {
    // do something here
  }

  render() {
    return [
      <AppBar key="AppBar" />,
      <Routes key="routes" />
    ]
  }
}