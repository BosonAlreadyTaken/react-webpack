import AppState from './app.state.js';
import TopicStore from './topic-store.js'

export {AppState, TopicStore}

export default {
  AppState,
  TopicStore,
}

export const createStoreMap = () => {
  return {
    appState: new AppState(),
    topicStore: new TopicStore(),
  }
}
