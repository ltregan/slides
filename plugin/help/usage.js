
var ShowUsage = (function() {

  return {
    init: function() {
      if ('localStorage' in window) {
        var flag = 'visited';
        if (!localStorage.getItem(flag)) {
          localStorage.setItem(flag, true);
          setTimeout(function() {
            Reveal.toggleHelp();
          }, 1e3)
        }
      }
    }
  };

})();

Reveal.registerPlugin('usage', ShowUsage);