const EventEmitter = require('events')
const Capability = require('primea-capability')
const crypto = require('node-webcrypto-shim')
const leb128 = require('leb128').unsigned
const Pipe = require('buffer-pipe')

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

  /**
   * serializes the message
   * @return {Buffer}
   */
  serialize () {
    const args = [
      leb128.encode(this.ticks),
      leb128.encode(this.data.length),
      this.data,
      Buffer.concat(this.caps.map(c => c.serialize()))
    ]
    return Buffer.concat(args)
  }

  /**
   * deserializes the message and returns a new instance of `Message`
   * @param {Buffer} raw - the serialized raw message
   * @return {Promise} resolve with a new instance of `Message`
   */
  static deserialize (raw) {
    const p = new Pipe(raw)

    const json = {
      ticks: leb128.readBn(p).toNumber(),
      data: p.read(leb128.read(p))
    }

    json.caps = []
    while (!p.end) {
      const cap = Capability.deserializeFromPipe(p)
      json.caps.push(cap)
    }
    return new Message(json)
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
