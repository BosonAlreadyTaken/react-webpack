import React from "react";
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'

@inject('appState') @observer
export default class TopicDetail extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }
  componentDidMount() {
    // do something here
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

TopicDetail.propTypes = {
  appState: PropTypes.object,
}