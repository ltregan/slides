
var ShowUsage = (function() {

  return {
    init: function() {
      if ('sessionStorage' in window) {
        var flag = 'visited';
        if (!sessionStorage.getItem(flag)) {
          sessionStorage.setItem(flag, true);
          setTimeout(function() {
            Reveal.toggleHelp();
          }, 1e3)
        }
      }
    }
  };

})();

Reveal.registerPlugin('usage', ShowUsage);