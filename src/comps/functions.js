
module.exports = {
  el(query) {
    return document.querySelector(query)
  },

  elById(query) {
    return document.getElementById(query.substr(1))
  },

  els(query) {
    return document.querySelectorAll(query)
  },

  // Stolen from tutsplus.
  validateUrl(url) {
    return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})*/i.test(url);
  },

  verifyValidUrl(url) {
    return (url.match(/^(http\:\/\/|https\:\/\/)/))
      ? url : `https://${url}`
  }
}
