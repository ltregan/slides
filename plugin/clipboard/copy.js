
var SnippetCopy = (function() {

  function isWin() {
    return navigator && /windows/i.test(navigator.userAgent || '');
  }

  function clipboard(link) {
    var text = this.innerText;
    if (isWin()) {
      // strip breaks
      text = text.replace(/\s\\\s*\n\s*/g, ' ');
    }
    var area = document.createElement('textarea');
    area.textContent = text;
    area.style.height = area.style.width = 0;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
    var txt = link.innerHTML;
    link.innerHTML = 'copied';
    setTimeout(function() {
      link.innerHTML = txt;
    }, 2000);
  }

  return {
    init: function() {
      var nodes = Reveal.getRevealElement().querySelectorAll('pre > code');
      var iter = Array.apply(null, nodes);
      var text = 'copy';
      for (var i=0; i < iter.length; i++) {
        var code = iter[i];
        var copy = document.createElement('a');
        copy.classList = 'copier';
        copy.innerHTML = text;
        copy.addEventListener('click', clipboard.bind(code, copy));
        code.parentNode.appendChild(copy);
      }
    }
  }
})();

Reveal.registerPlugin('clipboard', SnippetCopy);