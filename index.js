/**
 * This implements Messages for Primea
 */
module.exports = class Message {
  /**
   * @param {Object} opts
   * @param {Array} opts.data
   * @param {Array} opts.to
   * @param {Boolean} opts.atomic
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
