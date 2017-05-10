/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message {
  /**
   * @param {*} payload what you want to send in a message
   */
  constructor (opts = {}) {
    const defaults = {
      resources: {
        ticks: 0,
        priority: 0
      },
      data: new ArrayBuffer([]),
      ports: []
    }

    Object.assign(defaults.resources, opts.resources)
    this._opts = Object.assign(defaults, opts)

    // set by the kernel
    this._ticks = 0
    this._priority = 0
    this._hops = 0
    this._fromPort = null
    this._fromPortsTicks = 0
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
    return this._opts.resources.ticks
  }

  /**
   * Returns an array of ports that a message is carrying
   * @returns {[]}
   */
  get priority () {
    return this._opts.resources.priority
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
