define([
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