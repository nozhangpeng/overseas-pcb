import Highlight from 'highlight.js'

export default {
  'highlight': {
    update () {
      setTimeout(function () {
        const element = document.getElementById('document')
        let blocks = element.querySelectorAll('pre code')
        Array.prototype.forEach.call(blocks, Highlight.highlightBlock)
      }, 0)
    }
  }
}
