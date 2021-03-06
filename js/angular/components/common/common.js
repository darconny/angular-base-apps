(function() {
  'use strict';

  angular.module('base.common', ['base.core'])
    .directive('baClose', baClose)
    .directive('baOpen', baOpen)
    .directive('baToggle', baToggle)
    .directive('baEscClose', baEscClose)
    .directive('baSwipeClose', baSwipeClose)
    .directive('baHardToggle', baHardToggle)
    .directive('baCloseAll', baCloseAll)
    .directive('baNoSupport', baNoSupport)
  ;

  baClose.$inject = ['BaseAppsApi'];

  function baClose(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      var targetId = '';
      if (attrs.baClose) {
        targetId = attrs.baClose;
      } else {
        var parentElement= false;
        var tempElement = element.parent();
        // find parent component
        while(parentElement === false) {
          if(tempElement[0].nodeName == 'BODY') {
            parentElement = '';
          }

          if(typeof tempElement.attr('ba-closable') !== 'undefined' && tempElement.attr('ba-closable') !== false) {
            parentElement = tempElement;
          }

          tempElement = tempElement.parent();
        }
        targetId = parentElement.attr('id');
      }
      element.on('click', function(e) {
        BaseAppsApi.publish(targetId, 'close');

        if (!_hasParentHref(e.target, targetId)) {
          // prevent default if target not inside link
          e.preventDefault();
        }
      });
    }
  }

  baOpen.$inject = ['BaseAppsApi'];

  function baOpen(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        BaseAppsApi.publish(attrs.baOpen, 'open');

        if (!_hasParentHref(e.target, attrs.baOpen)) {
          // prevent default if target not inside link
          e.preventDefault();
        }
      });
    }
  }

  baToggle.$inject = ['BaseAppsApi'];

  function baToggle(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    }

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        BaseAppsApi.publish(attrs.baToggle, 'toggle');

        if (!_hasParentHref(e.target, attrs.baToggle)) {
          // prevent default if target not inside link
          e.preventDefault();
        }
      });
    }
  }

  baEscClose.$inject = ['BaseAppsApi'];

  function baEscClose(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('keyup', function(e) {
        if (e.keyCode === 27) {
          BaseAppsApi.closeActiveElements();
        }
        e.preventDefault();
      });
    }
  }

  baSwipeClose.$inject = ['BaseAppsApi'];

  function baSwipeClose(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };
    return directive;

    function link($scope, element, attrs) {
      var swipeDirection;
      var hammerElem, hammerDirection;

      // detect what direction the directive is pointing
      switch (attrs.baSwipeClose) {
        case 'right':
          swipeDirection = 'swiperight';
          hammerDirection = Hammer.DIRECTION_RIGHT;
          break;
        case 'left':
          swipeDirection = 'swipeleft';
          hammerDirection = Hammer.DIRECTION_LEFT;
          break;
        case 'up':
          swipeDirection = 'swipeup';
          hammerDirection = Hammer.DIRECTION_UP;
          break;
        case 'down':
          swipeDirection = 'swipedown';
          hammerDirection = Hammer.DIRECTION_DOWN;
          break;
        default:
          swipeDirection = 'swipe';
          hammerDirection = Hammer.DIRECTION_ALL;
      }

      if (typeof(Hammer)!=='undefined') {
        hammerElem = new Hammer(element[0]);
        // set the options for swipe (to make them a bit more forgiving in detection)
        hammerElem.get('swipe').set({
          direction: hammerDirection,
          threshold: 5, // this is how far the swipe has to travel
          velocity: 0.5 // and this is how fast the swipe must travel
        });
        hammerElem.on(swipeDirection, function() {
          BaseAppsApi.publish(attrs.id, 'close');
        });
      }
    }
  }

  baHardToggle.$inject = ['BaseAppsApi'];

  function baHardToggle(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        BaseAppsApi.closeActiveElements({exclude: attrs.baHardToggle});
        BaseAppsApi.publish(attrs.baHardToggle, 'toggle');

        if (!_hasParentHref(e.target, attrs.baToggle)) {
          // prevent default if target not inside link
          e.preventDefault();
        }
      });
    }
  }

  baCloseAll.$inject = ['BaseAppsApi'];

  function baCloseAll(BaseAppsApi) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      element.on('click', function(e) {
        var tar = e.target, avoid, activeElements, closedElements, i;

        // check if clicked target or any of its ancestors is designated to open/close
        // another component
        avoid = ['ba-toggle', 'ba-hard-toggle', 'ba-open', 'ba-close'].filter(function(e){
          var parentElement = tar, hasAttr = false;

          while (parentElement && typeof(parentElement.getAttribute) === 'function') {
            var attrVal = parentElement.getAttribute(e);
            if (typeof(attrVal) !== 'undefined' && attrVal !== null) {
              hasAttr = true;
              break;
            }
            parentElement = parentElement.parentNode;
          }

          return hasAttr;
        });
        if(avoid.length > 0) {
          // do nothing
          return;
        }

        // check if clicked element is inside active closable parent
        if (getParentsUntil(tar, 'ba-closable') !== false) {
          // do nothing
          return;
        }

        // close all active elements
        activeElements = document.querySelectorAll('.is-active[ba-closable]');
        closedElements = 0;
        if(activeElements.length > 0) {
          for(i = 0; i < activeElements.length; i++) {
            if (!activeElements[i].hasAttribute('ba-ignore-all-close')) {
              BaseAppsApi.publish(activeElements[i].id, 'close');
              closedElements++;
            }
          }

          // if one or more elements were closed and the target is not an href,
          // prevent the default action
          if (closedElements > 0 && !tar.href) {
            e.preventDefault();
          }
        }
      });
    }
    /** special thanks to Chris Ferdinandi for this solution.
     * http://gomakethings.com/climbing-up-and-down-the-dom-tree-with-vanilla-javascript/
     */
    function getParentsUntil(elem, parent) {
      for ( ; elem && elem !== document.body; elem = elem.parentNode ) {
        if(elem.hasAttribute(parent)){
          if(elem.classList.contains('is-active')){ return elem; }
          break;
        }
      }
      return false;
    }
  }

  baNoSupport.$inject = ['$window'];

  function baNoSupport($window) {
    var directive = {
      restrict: 'A',
      link: link
    };

    return directive;

    function link(scope, element, attrs) {
      if (!$window.Modernizr || $window.Modernizr.flexbox) {
        element.remove();
      }
    }
  }

  function _hasParentHref(target, rootId) {
    var parentElement = target, hasHref = false;

    while (parentElement && parentElement.id != rootId) {
      if (parentElement.href) {
        hasHref = true;
        break;
      }
      parentElement = parentElement.parentNode;
    }

    return hasHref;
  }
})();
