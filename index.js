const EventEmitter = require('events')
const crypto = require('node-webcrypto-shim')

/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message extends EventEmitter {
  /**
   * @param {Object} opts
   * @param {ArrayBuffer} opts.data - the payload of the message
   * @param {Array<Object>} opts.caps - an array of capabilities to send in the message
   */
  constructor (opts = {}) {
    super()
    const defaults = this.constructor.defaults
    this._opts = Object.assign(defaults, opts)
    Object.keys(this._opts).forEach(key => {
      Object.defineProperty(this, key, {
        get: function () {
          return this._opts[key]
        },
        set: function (y) {
          this._opts[key] = y
        }
      })
    })

    // set by the kernel
    this._fromTicks = 0
  }

  toJSON () {
    return this._opts
  }

  /**
   * Gets the SHA-256 hash for some given data
   * @param {Buffer} data - the data to be hashed
   * @param {number} length - the number of bytes of the hash to return. must be <= 32
   * @returns {Promise} resolves with 32 bytes of hashed data
   */
  static hash (data, length = 32) {
    return crypto.subtle.digest({
      name: 'SHA-256'
    }, data).then(function (hash) {
      return new Uint8Array(hash).subarray(0, length)
    })
  }

  static get defaults () {
    return {
      ticks: 0,
      data: new Uint8Array([]),
      caps: []
    }
  }
}
