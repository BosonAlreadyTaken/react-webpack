import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react'
import {AppContainer} from 'react-hot-loader';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles'
import {lightBlue, pink} from 'material-ui/colors'

import App from './views/App.jsx';
import {AppState, TopicStore} from './store/store.js';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    accent: lightBlue,
    type: 'light',
  }
})

const initialState = window.__INITIAL__STATE__ || {};

const createApp = (TheApp) => {
  class Main extends React.Component {
    componentDidMount() {
      const jssStyles = document.getElementById('jss-server-side');
      if(jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }
    render() {
      return <TheApp />
    }
  }
  return Main;
}

const appState = new AppState(initialState.appState);
const topicStore = new TopicStore(initialState.topicStore);

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer >
      <Provider appState={appState} topicStore={topicStore}>
        <BrowserRouter>
          <MuiThemeProvider theme = {theme}>
            <Component />
            </MuiThemeProvider>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(createApp(App))

if(module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default;
    // ReactDom.hydrate(<NextApp />, document.getElementById('root'))
    render(createApp(NextApp))
  })
}