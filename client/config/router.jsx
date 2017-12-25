import React from 'react';

import {
  Route,
  Redirect
} from 'react-router-dom'

import TopicList from '../views/topic-list/index.jsx'
import TopicDetail from '../views/topic-detail/index.jsx'
import TestApi from '../views/test/api-test.jsx'

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} exact={true} key="first" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail" component={TopicDetail} key="detail" />,
  <Route path="/test" component={TestApi} key="test" />,
]


