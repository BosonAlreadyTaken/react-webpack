import React from "react";
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'

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
      <div>
        <input type="text" onChange={this.changeName} />
        <span>{this.props.appState.msg}</span>
      </div>
    )
  }
}