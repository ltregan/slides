
var Switcher = (function() {

  function initSwitcher(el) {
    var control = el.children[0];
    var content = el.children[1];
    
    var tabs = Array.apply(null, control.children);
    var panes = Array.apply(null, content.children);

    // init tab control
    var frag, activeIndex = -1;
    tabs.forEach(function(t, i) {
      frag = frag || t.classList.contains('fragment');
      activeIndex = activeIndex > -1 ? activeIndex : 
        (t.classList.contains('current-fragment') || t.classList.contains('active')) ? i : -1;

      t.addEventListener('click', function() {
        setActive(tabs, panes, i);
        if (frag) {
          Reveal.navigateFragment(~~t.getAttribute('data-fragment-index'), 0);
        }
      }, false);
    });

    // fragment listener
    if (frag) {
      Reveal.addEventListener('fragmentshown', function(e) {
        // last shown from an action
        var i = tabs.indexOf(e.fragments.slice().pop());
        if (i > -1) {
          setActive(tabs, panes, i);
        }
      });
    }

    // initial
    setActive(tabs, panes, activeIndex);
  }

  function setActive(tabs, panes, index) {
    index = index > -1 ? index : 0;
    [tabs, panes].forEach(function(group) {
      group.forEach(function(el, i) {
        i !== index && el.classList.remove('active');
      });
      return group[index] && group[index].classList.add('active');
    });
  }

  return {
    init: function() {
      var nodes = Reveal.getRevealElement().querySelectorAll('.switcher');
      Array.apply(null, nodes).forEach(initSwitcher);
    }
  }
})();

Reveal.registerPlugin('switcher', Switcher);