/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message {
  /**
   * @param {ArrayBuffer} payload what you want to send in a message
   * @param {Object} resources resources allocated to this message
   */
  constructor (payload = {}) {
    this._payload = payload
    this._hops = 0
  }

  /**
   * Returns the messages payload
   * @returns {*}
   */
  get payload () {
    return this._payload
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
