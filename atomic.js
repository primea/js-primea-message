const Message = require('./index.js')

/**
 * This implements Atomic Messages for Primea
 * @module primea-message/atomic
 */
module.exports = class AtomicMessage extends Message {
  /**
   * @param {Object} opts
   * @param {Array} opts.data
   * @param {Array} opts.to
   * @param {Boolean} opts.atomic
   */
  constructor (payload) {
    super(payload)
    this._visitedKernels = []
    this._hasResponded = false
    this._resultPromise = new Promise((resolve, reject) => {
      this._resultResolve = resolve
    })

    this._committedPromise = new Promise((resolve, reject) => {
      this._committedResolve = resolve
      this._committedReject = reject
    })
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
   * generates a message response, a message cannot be sent after this
   * @param {*} response
   */
  respond (response) {
    if (this._hasResponded) {
      throw new Error('message has already reponsed')
    } else {
      this._hasResponded = true
      this._resultResolve(response)
      if (!this._rootMessage) {
        this._committedResolve()
      }
    }
  }

  /**
   * return whether or not the message has reponded
   * @returns {Boolean}
   */
  get hasResponded () {
    return this._hasResponded
  }

  /**
   * checks if a message is cylic or not given a kernel
   * @param {Kerenl} kernel
   * @return {Boolean}
   */
  isCyclic (kernel) {
    return this._visitedKernels.some(process => process === kernel)
  }

  _committed () {
    return this._committedPromise
  }

  _reject (e) {
    this._hasResponded = true
    this._committedReject(e)
    this._resultResolve(e)
  }

  _visited (kernel, currentMessage) {
    if (currentMessage && this !== currentMessage) {
      this._visitedKernels = currentMessage._visitedKernels
      this._rootMessage = currentMessage
      this._committedPromise = this._rootMessage._committedPromise
    }
    this._visitedKernels.push(kernel)
  }

  /**
   * whether the message is atomic or not
   * @returns {Bloon}
   */
  static isAtomic (obj) {
    return obj instanceof AtomicMessage
  }
}
