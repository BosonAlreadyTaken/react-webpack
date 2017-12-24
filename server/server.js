const express = require('express');
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const serverEntry = require('../dist/server-entry.js').default

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = express()
app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('*', function(req,res) {
  const appString = ReactSSR.renderToString(serverEntry);
  res.result = template.replace('<!-- app -->', appString)
  res.send(res.result);
})
app.listen(3333, function() {
  console.log('server listen on 3333')
})