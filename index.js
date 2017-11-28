const EventEmitter = require('events')

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

  static get defaults () {
    return {
      ticks: 0,
      data: new Uint8Array([]),
      caps: []
    }
  }
}
