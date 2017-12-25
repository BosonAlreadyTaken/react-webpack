const axios = require('axios');
const path = require('path');
const webpack = require('webpack');
const MemoryFs = require('memory-fs');
const proxy = require('http-proxy-middleware');
const serialize = require('serialize-javascript');
const ejs = require('ejs');
const asyncBootstrap = require('react-async-bootstrapper').default;
const ReactDomServer = require('react-dom/server');

const serverConfig = require('../../build/webpack.config.server.js')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/server.ejs')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

// const Module = module.constructor;
const NativeModule = require('module');
const vm = require('vm');
const getModuleFromString = (bundle, filename) => {
  const m = {exports: {}};
  const wrapper = NativeModule.wrap(bundle);
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  });
  const result = script.runInThisContext();
  result.call(m.exports, m.exports, require, m);
  return m;
}

const mfs = new MemoryFs;
const serverCompiler = webpack(serverConfig);
serverCompiler.outputFileSystem = mfs;
let serverBundle, createStoreMap;

serverCompiler.watch({}, (err, states) => {
  if(err) throw err
  states = states.toJson()
  states.errors.forEach(err => console.error(err))
  states.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  serverBundle = m.exports.default;
  createStoreMap = m.exports.createStoreMap;
})

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result;
  }, {})
}

module.exports = function(app) {

  app.use('/public', proxy({
    target: 'http://localhost:8888'
  }))
  app.get('*', function(req, res) {
    getTemplate().then(template => {

      const routerContext = {};
      const stores = createStoreMap();
      const app = serverBundle(stores, routerContext, req.url)

      asyncBootstrap(app).then(() => {
        if(routerContext.url) {
          res.status(302).setHeader('Location', routerContext.url)
          res.end();
          return;
        }
        const state = getStoreState(stores);
        const content = ReactDomServer.renderToString(app)

        const html = ejs.render(template, {
          appString: content,
          initialState: serialize(state),
        })
        res.send(html)
        // res.send(template.replace('<!-- app -->', content))
      })

    })
  })
}