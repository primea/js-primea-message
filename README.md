# SYNOPSIS 

[![NPM Package](https://img.shields.io/npm/v/primea-message.svg?style=flat-square)](https://www.npmjs.org/package/primea-message)
[![Build Status](https://img.shields.io/travis/primea/js-primea-message.svg?branch=master&style=flat-square)](https://travis-ci.org/primea/js-primea-message)
[![Coverage Status](https://img.shields.io/coveralls/primea/js-primea-message.svg?style=flat-square)](https://coveralls.io/r/primea/js-primea-message)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)  

This implements messaging for Primea

# USAGE
```javascript
const Message = require('primea-message')
const params = {
  data: 'test',
  caps: [],
  resources: {
    ticks: 77,
    priority: 100
  }
}

const message = new Message(params)

```

# API
[./docs/](./API.md)

# LICENSE
[MPL-2.0][LICENSE]

[LICENSE]: https://tldrlegal.com/license/mozilla-public-license-2.0-(mpl-2)
