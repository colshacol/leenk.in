
export function el(query) {
  return document.querySelector(query)
}

export function els(query) {
  return document.querySelectorAll(query)
}

// Stolen from tutsplus.
export function validateUrl(url) {
  return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i.test(url);
}
