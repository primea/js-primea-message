/**
 * This implements Messages for Primea
 * @module primea-message
 */
module.exports = class Message {
  /**
   * @param {ArrayBuffer} payload what you want to send in a message
   * @param {Object} resources resources allocated to this message
   */
  constructor (payload, resources) {
    this._payload = payload
    this._resources = resources
    this._from = ''
    this._hops = 0
  }

  get payload () {
    return this._payload
  }

  get hops () {
    return this._hops
  }

  /**
   * returns the `from` path of the message
   * @returns {Array}
   */
  get from () {
    return this._from
  }
}
