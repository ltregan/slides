
var SnippetCopy = (function() {

  function clipboard(link) {
    var text = this.innerText;
    var area = document.createElement('textarea');
    area.textContent = text;
    area.style.height = area.style.width = 0;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
  }

  return {
    init: function() {
      const nodes = Reveal.getRevealElement().querySelectorAll('pre > code');
      const iter = Array.apply(null, nodes);
      for (var i=0; i < iter.length; i++) {
        var code = iter[i];
        var copy = document.createElement('a');
        copy.classList = 'copier';
        copy.innerText = 'Copy'
        copy.addEventListener('click', clipboard.bind(code, copy));
        code.parentNode.appendChild(copy);
      }
    }
  }
})();

Reveal.registerPlugin('clipboard', SnippetCopy);