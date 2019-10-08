
var Switcher = (function() {

  function initSwitcher(el) {
    var control = el.children[0];
    var content = el.children[1];
    
    var tabs = Array.apply(null, control.children);
    var panes = Array.apply(null, content.children);

    tabs.map(function(t, i) {
      t.addEventListener('click', function() {
        setActive(tabs, panes, i);
      }, false);
    });

    setActive(tabs, panes);
  }

  function setActive(tabs, panes, index) {
    index = index || 0;
    [tabs, panes].forEach(function(group) {
      group.forEach(function(el) {
        el.classList.remove('active');
      });
      return group[index] && group[index].classList.add('active');
    });
  }

  return {
    init: function() {
      var nodes = Reveal.getRevealElement().querySelectorAll('.switcher');
      Array.apply(null, nodes).map(initSwitcher);
    }
  }
})();

Reveal.registerPlugin('switcher', Switcher);