import {$} from '@core/Dom'

export function resizeHandler($root, event) {
  const $target = $(event.target)
  const $parent = $target.getClosestParent('[data-type="resizable"]')
  const cordinates = $parent.getСordinates()
  const isColumn = $target.data.resize === 'column'
  const property = isColumn ? 'bottom' : 'right'
  let size

  $target.css({
    opacity: 1,
    [property]: '-2000px',
  })

  document.onmousemove = (e) => {
    if (isColumn) {
      const delta = e.pageX - cordinates.right
      size = cordinates.width + delta
      $target.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - cordinates.bottom
      size = cordinates.height + delta
      $target.css({bottom: -size + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (isColumn) {
      $parent.css({width: size + 'px'})
      $root.findAll(`[data-column="${$parent.data.column}"]`)
          .forEach((element) => element.style.width = size + 'px')
    } else {
      $parent.css({height: size + 'px'})
    }

    $target.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    })
  }
}

/*
// decryption

1. onMousedown()
will not work when changing DOM
const $parent = $target.$element.parentNode // bad
will not work when changing classes
const $parent = $target.getClosestParentNode('.column') // better

2. performance
document.querySelectorAll(`[data-column="${$parent.data.column}"]`)
        .forEach(element => element.style.width = size + 'px')

3.
document.onmousemove = (e) => {
        if (event.target.dataset.resize === 'row') {
          // const size = cordinates.height + (e.pageY - cordinates.bottom)
          // $parent.css({height: size + 'px'})
        } else {
          // const size = cordinates.width + (e.pageX - cordinates.right)
          // $parent.css({width: size + 'px'})
          // cells.forEach(element => element.style.width = size + 'px')

          size = cordinates.width + (e.pageX - cordinates.right)
          $target.css({right: -size + 'px'})
        }
      }
*/