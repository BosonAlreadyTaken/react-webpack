import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react'
import {AppContainer} from 'react-hot-loader';
import App from './views/App.jsx'
import appState from './store/app.state.js'

const initialState = window.__INITIAL__STATE__ || {};

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer >
      <Provider appState={new AppState()}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    root,
  )
}
render(App)

if(module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default;
    // ReactDom.hydrate(<NextApp />, document.getElementById('root'))
    render(NextApp)
  })
}