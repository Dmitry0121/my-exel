class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
  }

  get data() {
    return this.$element.dataset
  }

  css(styles = {}) {
    Object.keys(styles)
        .forEach((property) =>
          this.$element.style[property] = styles[property]
        )
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector)
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html
      return this
    }
    return this.$element.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$element
    }
    if (Element.prototype.append) {
      this.$element.append(node)
    } else {
      this.$element.appendChild(node)
    }
    return this
  }

  getClosestParent(selector) {
    return $(this.$element.closest(selector))
  }

  getСordinates() {
    return this.$element.getBoundingClientRect()
  }

  on(event, callback) {
    this.$element.addEventListener(event, callback)
  }

  off(event, callback) {
    this.$element.removeEventListener(event, callback)
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const element = document.createElement(tagName)
  if (classes) {
    element.classList.add(classes)
  }
  return $(element)
}

/*
// decryption

1. old functionality
    for (const property in styles) {
      if(styles.hasOwnProperty(property)) {
        this.$element.style[property] = styles[property]
      }
    }
*/