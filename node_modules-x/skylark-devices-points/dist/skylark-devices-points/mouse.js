/**
 * skylark-devices-points - The points  utility library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./points"],function(e){return e.mouse={mouseWheelEvent:function(){return"onwheel"in document.createElement("div")?"wheel":void 0!==document.onmousewheel?"mousewheel":"DOMMouseScroll"},normalizeWheel:function(e){var n=0,t=0,i=0,o=0;return"detail"in e&&(t=e.detail),"wheelDelta"in e&&(t=-e.wheelDelta/120),"wheelDeltaY"in e&&(t=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(n=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(n=t,t=0),i=10*n,o=10*t,"deltaY"in e&&(o=e.deltaY),"deltaX"in e&&(i=e.deltaX),(i||o)&&e.deltaMode&&(1===e.deltaMode?(i*=40,o*=40):(i*=800,o*=800)),i&&!n&&(n=i<1?-1:1),o&&!t&&(t=o<1?-1:1),{spinX:n,spinY:t,pixelX:i,pixelY:o}},isMouseEvent:function(e){return null!=e.pointerType?"mouse"==e.pointerType||e.pointerType===e.MSPOINTER_TYPE_MOUSE:null!=e.mozInputSource?1==e.mozInputSource:0==e.type.indexOf("mouse")},isLeftMouseButton:function(e){return"buttons"in e&&("mousedown"==e.type||"mousemove"==e.type)?1==e.buttons:"which"in e?1===e.which:1===e.button},isMiddleMouseButton:function(e){return"which"in e?2===e.which:4===e.button},isRightMouseButton:function(e){return"which"in e?3===e.which:2===e.button}}});
//# sourceMappingURL=sourcemaps/mouse.js.map
