import AppStateClass from './app.state.js';

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
