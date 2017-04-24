/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message {
  /**
   * @param {*} payload what you want to send in a message
   */
  constructor (payload = {}) {
    this._payload = payload
    this._ticks = 0
    this._hops = 0
    this._fromPort = null
  }

  /**
   * Returns the messages payload
   * @returns {*}
   */
  get payload () {
    return this._payload
  }

  get fromPort () {
    return this._fromPort
  }

  /**
   * Returns the message's resources
   * @returns {*}
   */
  get resources () {
    return this._payload.resources
  }

  /**
   * returns the number of hops a packet has undergone
   * @returns {integer}
   */
  get hops () {
    return this._hops
  }
}
