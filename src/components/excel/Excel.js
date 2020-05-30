import {$} from '@core/Dom'

export class Excel {
  constructor(selector, options) {
    this.$element = $(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    this.components = this.components.map((Component) => {
      const $node = $.create('div', Component.className)
      const component = new Component($node)
      $node.html(component.toHTML())
      $root.append($node)
      return component
    })
    return $root
  }

  render() {
    this.$element.append(this.getRoot())
    this.components.forEach((component) => {
      component.init()
    })
  }
}