import React from "react";
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import {AppState} from '../../store/app.state.js';
import Button from 'material-ui/Button';

import Container from '../layout/container.jsx';

@inject('appState') @observer

export default class TopicList extends React.Component {
  componentDidMount() {
    // do something here
  }
  asyncBootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      })
    })
  }
  constructor() {
    super();
    this.changeName = this.changeName.bind(this)
  }
  changeName(event) {
    this.props.appState.changeName(event.target.value);
  }
  render() {
    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is a description" />
        </Helmet>
        <Button raised color="primary">This is a button</Button>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </Container>
    )
  }
}