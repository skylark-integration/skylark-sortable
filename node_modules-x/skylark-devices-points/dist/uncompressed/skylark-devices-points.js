/**
 * skylark-devices-points - The points  utility library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-devices-points/points',[
	"skylark-langx-ns"
],function(skylark){
	return skylark.attach("devices.points",{});
});
define('skylark-devices-points/mouse',[
	"./points"
],function(points){
	/**
	 * Function: isMouseEvent
	 * 
	 * Returns true if the event was generated using a mouse (not a pen or touch device).
	 */
	function isMouseEvent(evt) 	{
		return (evt.pointerType != null) ? (evt.pointerType == 'mouse' || evt.pointerType ===
			evt.MSPOINTER_TYPE_MOUSE) : ((evt.mozInputSource != null) ?
				evt.mozInputSource == 1 : evt.type.indexOf('mouse') == 0);
	}
	
	/**
	 * Function: isLeftMouseButton
	 * 
	 * Returns true if the left mouse button is pressed for the given event.
	 * To check if a button is pressed during a mouseMove you should use the
	 * <mxGraph.isMouseDown> property. Note that this returns true in Firefox
	 * for control+left-click on the Mac.
	 */
	function isLeftMouseButton(evt) {
		// Special case for mousemove and mousedown we check the buttons
		// if it exists because which is 0 even if no button is pressed
		if ('buttons' in evt && (evt.type == 'mousedown' || evt.type == 'mousemove'))
		{
			return evt.buttons == 1;
		}
		else if ('which' in evt)
		{
	        return evt.which === 1;
	    }
		else
		{
	        return evt.button === 1;
	    }
	}
	
	/**
	 * Function: isMiddleMouseButton
	 * 
	 * Returns true if the middle mouse button is pressed for the given event.
	 * To check if a button is pressed during a mouseMove you should use the
	 * <mxGraph.isMouseDown> property.
	 */
	function isMiddleMouseButton(evt) {
		if ('which' in evt)
		{
	        return evt.which === 2;
	    }
		else
		{
	        return evt.button === 4;
	    }
	}
	
	/**
	 * Function: isRightMouseButton
	 * 
	 * Returns true if the right mouse button was pressed. Note that this
	 * button might not be available on some systems. For handling a popup
	 * trigger <isPopupTrigger> should be used.
	 */
	function isRightMouseButton(evt){
		if ('which' in evt)
		{
	        return evt.which === 3;
	    }
		else
		{
	        return evt.button === 2;
	    }
	}

  /**
   * @summary Gets the event name for mouse wheel
   * @returns {string}
   */
  function mouseWheelEvent() {
    return 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
      document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
        'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox
  };

  /**
   * @summary Normalize mousewheel values accross browsers
   * @description From Facebook's Fixed Data Table
   * {@link https://github.com/facebookarchive/fixed-data-table/blob/master/src/vendor_upstream/dom/normalizeWheel.js}
   * @copyright Facebook
   * @param {MouseWheelEvent} event
   * @returns {{spinX: number, spinY: number, pixelX: number, pixelY: number}}
   */
  function normalizeWheel(event) {
    var PIXEL_STEP  = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    var sX = 0, sY = 0; // spinX, spinY
    var pX = 0, pY = 0; // pixelX, pixelY

    // Legacy
    if ('detail'      in event) { sY = event.detail; }
    if ('wheelDelta'  in event) { sY = -event.wheelDelta / 120; }
    if ('wheelDeltaY' in event) { sY = -event.wheelDeltaY / 120; }
    if ('wheelDeltaX' in event) { sX = -event.wheelDeltaX / 120; }

    // side scrolling on FF with DOMMouseScroll
    if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
      sX = sY;
      sY = 0;
    }

    pX = sX * PIXEL_STEP;
    pY = sY * PIXEL_STEP;

    if ('deltaY' in event) { pY = event.deltaY; }
    if ('deltaX' in event) { pX = event.deltaX; }

    if ((pX || pY) && event.deltaMode) {
      if (event.deltaMode === 1) { // delta in LINE units
        pX *= LINE_HEIGHT;
        pY *= LINE_HEIGHT;
      }
      else {                      // delta in PAGE units
        pX *= PAGE_HEIGHT;
        pY *= PAGE_HEIGHT;
      }
    }

    // Fall-back if spin cannot be determined
    if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
    if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

    return {
      spinX: sX,
      spinY: sY,
      pixelX: pX,
      pixelY: pY
    };
  };

	return points.mouse = {
		mouseWheelEvent,
		normalizeWheel,

		isMouseEvent,
		isLeftMouseButton,
		isMiddleMouseButton,
		isRightMouseButton
	};
});
define('skylark-devices-points/touch',[
	"./points"
],function(points){

  /**
   * @summary Detects if the user is using a touch screen
   * @returns {Promise<boolean>}
   */
   function isTouchEnabled () {
    return new Promise(function(resolve) {
      var listener = function(e) {
        if (e) {
          resolve(true);
        }
        else {
          resolve(false);
        }

        window.removeEventListener('touchstart', listener);
      };

      window.addEventListener('touchstart', listener, false);

      // after 10 secs auto-reject the promise
      setTimeout(listener, 10000);
    });
  };


  /*
   * Converts single-touch event to mouse event.
   */
  function mousy(elm) {
    var touchToMouse = function(event) {
        if (event.touches.length > 1) return; //allow default multi-touch gestures to work
        var touch = event.changedTouches[0];
        var type = "";
        
        switch (event.type) {
        case "touchstart": 
            type = "mousedown"; break;
        case "touchmove":  
            type="mousemove";   break;
        case "touchend":   
            type="mouseup";     break;
        default: 
            return;
        }
        
        // https://developer.mozilla.org/en/DOM/event.initMouseEvent for API
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent(type, true, true, window, 1, 
                touch.screenX, touch.screenY, 
                touch.clientX, touch.clientY, false, 
                false, false, false, 0, null);
        
        touch.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    };

    elm = elm || document;

    elm.addEventListener("touchstart",touchToMouse,true);
    elm.addEventListener("touchmove",touchToMouse,true);
    elm.addEventListener("touchend",touchToMouse,true);
  }

  return points.touch = {
  	isTouchEnabled,
    mousy
  };
	
});
define('skylark-devices-points/main',[
	"./points",
	"./mouse",
	"./touch"
],function(points){
	return points;
});
define('skylark-devices-points', ['skylark-devices-points/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-devices-points.js.map
