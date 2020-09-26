import {$} from '@/core/Dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const coords = $parent.getCoords()
  const type = event.target.dataset.resize
  const sideProp = type === 'col' ? 'bottom' : 'right'
  $resizer.css({opacity: 1, [sideProp]: '-5000px'})
  let value

  document.onmousemove = event => {
    if (type === 'col') {
      const delta = Math.floor(event.pageX - coords.right)
      value = coords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = Math.floor(event.pageY - coords.bottom)
      value = coords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
  }
}
