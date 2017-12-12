'use strict'

const NodeLink = require('grenache-nodejs-link')
const fetch = window.fetch

class Link extends NodeLink {
  promiseTimeout (ms, promise) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error('Timeout'))
      }, ms)

      promise
        .then((res) => {
          clearTimeout(timer)
          resolve(res)
        })
        .catch((err) => {
          clearTimeout(timer)
          reject(err)
        })
    })
  }

  post (url, data, opts, cb) {
    const timeout = opts.timeout || 300000
    const details = {
      method: 'post',
      opts,
      body: JSON.stringify(data)
    }
    this.promiseTimeout(timeout, fetch(url, details))
      .then(response => response.json())
      .then((data) => cb(null, data, data))
      .catch((err) => cb(err))
  }
}

module.exports = Link
