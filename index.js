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

    // set by the kernel
    this._hops = 0
    this._fromTicks = 0
  }

  toJSON () {
    return this._opts
  }

  /**
   * Returns the messages payload
   * @returns {ArrayBuffer}
   */
  get data () {
    return this._opts.data
  }

  /**
   * Returns an array of capabilities that a message is carrying
   * @returns {[]}
   */
  get caps () {
    return this._opts.caps
  }

  /**
   * Returns the messages payload
   * @returns {ArrayBuffer}
   */
  get ticks () {
    return this._opts.ticks
  }

  /**
   * returns the number of hops a packet has undergone
   * @returns {integer}
   */
  get hops () {
    return this._hops
  }

  static get defaults () {
    return {
      ticks: 0,
      data: new ArrayBuffer([]),
      caps: []
    }
  }
}
