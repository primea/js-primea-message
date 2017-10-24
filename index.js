/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message {
  /**
   * @param {Object} opts
   * @param {ArrayBuffer} opts.data - the payload of the message
   * @param {Array<Object>} opts.ports - an array of ports to send in the message
   */
  constructor (opts = {}) {
    const defaults = {
      ticks: 0,
      data: new ArrayBuffer([]),
      ports: []
    }

    this._opts = Object.assign(defaults, opts)

    // set by the kernel
    this._hops = 0
    this._fromPort = null
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
   * Returns an array of ports that a message is carrying
   * @returns {[]}
   */
  get ports () {
    return this._opts.ports
  }

  /**
   * Returns the messages payload
   * @returns {ArrayBuffer}
   */
  get ticks () {
    return this._opts.ticks
  }

  /**
   * Returns the port from which the message arrived
   * @returns {*}
   */
  get fromPort () {
    return this._fromPort
  }

  /**
   * returns the number of hops a packet has undergone
   * @returns {integer}
   */
  get hops () {
    return this._hops
  }
}
