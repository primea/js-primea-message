/**
 * This implements Messages for Primea
 */
module.exports = class Message {
  /**
   * @param {Object} opts
   * @param {Uint8Array} opts.data
   * @param {Array} opts.to
   * @param {Boolean} opts.atomic
   */
  constructor (opts) {
    const defaults = {
      to: [],
      data: new Uint8Array(),
      caps: [],
      atomic: true
    }
    this.parameters = {}
    Object.assign(this.parameters, defaults, opts)
    Object.freeze(this.parameters)

    // kernel tracking variables
    this._hops = 0
    this._from = []
    this._visitedKernels = []
    this._hasResponded = false
    this._resultPromise = new Promise((resolve, reject) => {
      this._resolve = resolve
    })
  }

  /**
   * to path for this message
   * @returns {Array}
   */
  get to () {
    return this.parameters.to
  }

  /**
   * the messages data
   * @returns {Uint8Array}
   */
  get data () {
    return this.parameters.data
  }

  /**
   * whether the message is atomic or not
   * @returns {Uint8Array}
   */
  get atomic () {
    return this.parameters.atomic
  }

  get caps () {
    return this.parameters.caps
  }

  /**
   * returns the `from` path of the message
   * @returns {Array}
   */
  get from () {
    return this._from
  }

  /**
   * return whether or not the message has reponded
   * @returns {Boolean}
   */
  get hasResponded () {
    return this._hasResponded
  }

  /**
   * Returns a promise that resolves when the a receiving contract calls
   * `respond`
   * @return {Promise}
   */
  result () {
    return this._resultPromise
  }

  /**
   * Gets the next port in the to array
   * @return {*}
   */
  nextPort () {
    if (this.hasResponded) {
      throw new Error('message has already reponsed and cannot be sent again')
    } else {
      return this.to[this._hops]
    }
  }

  /**
   * generates a message response, a message cannot be sent after this
   * @param {*} response
   */
  respond (response) {
    if (this.hasResponded) {
      throw new Error('message has already reponsed')
    } else {
      this._hasResponded = true
      this._resolve(response)
    }
  }

  /**
   * checks if a message is cylic or not given a kernel
   * @param {Kerenl} kernel
   * @return {Boolean}
   */
  isCyclic (kernel) {
    return this.atomic && this._visitedKernels.some(process => process === kernel)
  }

  _visited (kernel, currentMessage) {
    if (currentMessage && this !== currentMessage) {
      this._visitedKernels = currentMessage._visitedKernels
    }
    this._visitedKernels.push(kernel)
  }
}
