/**
 * skylark-devices-points - The points  utility library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./points"],function(e){return e.touch={isTouchEnabled:function(){return new Promise(function(e){var t=function(n){e(!!n),window.removeEventListener("touchstart",t)};window.addEventListener("touchstart",t,!1),setTimeout(t,1e4)})},mousy:function(e){var t=function(e){if(!(e.touches.length>1)){var t=e.changedTouches[0],n="";switch(e.type){case"touchstart":n="mousedown";break;case"touchmove":n="mousemove";break;case"touchend":n="mouseup";break;default:return}var o=document.createEvent("MouseEvent");o.initMouseEvent(n,!0,!0,window,1,t.screenX,t.screenY,t.clientX,t.clientY,!1,!1,!1,!1,0,null),t.target.dispatchEvent(o),e.preventDefault()}};(e=e||document).addEventListener("touchstart",t,!0),e.addEventListener("touchmove",t,!0),e.addEventListener("touchend",t,!0)}}});
//# sourceMappingURL=sourcemaps/touch.js.map
