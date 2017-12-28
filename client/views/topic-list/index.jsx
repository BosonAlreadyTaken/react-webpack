import React from "react";
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import queryString from 'query-string';

import {AppState} from '../../store/app.state.js';

import Tabs, {Tab} from 'material-ui/Tabs';
import List from 'material-ui/List';
import {CircularProgress} from 'material-ui/Progress';
import Button from 'material-ui/Button';

import Container from '../layout/container.jsx';
import TopicListItem from './list-item.jsx';
import {tabs} from '../../util/variable-define.js';

@inject(stores => {
  return {
    appState: stores.appState,
    topicStore: stores.topicStore,
  }
}) @observer

export default class TopicList extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
  }

  componentDidMount() {
    // do something here
    const tab = this.getTab();
    this.props.topicStore.fetchTopics(tab);
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search));
    }
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
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }
  getTab(search) {
    search = search || this.props.location.search;
    const query = queryString.parse(search);
    return query.tab || 'all';
  }
  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/index',
      search: `?tab=${value}`,
    })
  }
  listItemClick() {

  }
  render() {
    const {
      topicStore
    } = this.props;
    const topicList = topicStore.topics;
    const syncingTopics = topicStore.syncing;
    const tab = this.getTab();

    return (
      <Container>
        <Helmet>
          <title>This is topic list</title>
          <meta name="description" content="This is a description" />
        </Helmet>
        <Tabs value={tab} onChange={this.changeTab}>
          {
            Object.keys(tabs).map((t) => (
              <Tab key={t} label={tabs[t]} value={t} />
            ))
          }
        </Tabs>
        <List>
          {
            topicList.map(topic => <TopicListItem  key={topic.id} onClick={this.listItemClick} topic={topic} />)
          }
        </List>
        {
          syncingTopics ? 
            (
              <div>
                <CircularProgress color="accent" size={100} />
              </div>
            ) :
            null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
  topicStore: PropTypes.object.isRequired,
}
TopicList.propTypes = {
  location: PropTypes.object.isRequired,
}
