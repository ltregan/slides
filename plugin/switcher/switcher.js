
var Switcher = (function() {

  function initSlide(el) {
    var nodes = el.querySelectorAll('.switcher');
    Array.apply(null, nodes).forEach(initSwitcher);
  }

  function initSwitcher(el, switcherIndex) {
    var control = el.children[0];
    var content = el.children[1];
    
    if (el.getAttribute('data-switcher-init')) {
      return;
    }
    el.setAttribute('data-switcher-init', true);
    console.log('init');
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

    // fragment
    if (frag) {
      Reveal.addEventListener('fragmentshown', function(e) {
        // last shown from an action
        var i = tabs.indexOf(e.fragments.slice().pop());
        if (i > -1) {
          setActive(tabs, panes, i);
        }
      });
      Reveal.addEventListener('fragmenthidden', function(e) {
        // last shown from an action
        var i = tabs.indexOf(e.fragments.slice().pop()) - 1;
        if (i > -1) {
          setActive(tabs, panes, i);
        }
      });
    }

    // initial
    if (switcherIndex === 0 && frag && activeIndex <= 0) {
      Reveal.navigateFragment(~~tabs[0].getAttribute('data-fragment-index'), 0);
    }
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
      initSlide(Reveal.getCurrentSlide());
      Reveal.addEventListener('slidechanged', function(e) { 
        initSlide(e.currentSlide);
      });
    }
  }
})();

Reveal.registerPlugin('switcher', Switcher);