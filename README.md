# SYNOPSIS 
[![NPM Package](https://img.shields.io/npm/v/js-primea-message.js.svg?style=flat-square)](https://www.npmjs.org/package/js-primea-message.js)
[![Build Status](https://img.shields.io/travis/primea/js-primea-message.js.svg?branch=master&style=flat-square)](https://travis-ci.org/primea/js-primea-message.js)
[![Coverage Status](https://img.shields.io/coveralls/primea/js-primea-message.js.svg?style=flat-square)](https://coveralls.io/r/primea/js-primea-message.js)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

This implements messaging for Primae

# USAGE
```javascript
const Message = require('js-primea-message')
const message = new Message({
  to: ['some', 'path'],
  data: new ArrayBuffer()
})

```

# API
[./docs/](./API.md)

# LICENSE
[MPL-2.0](https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2))
