/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(n){return n.defer=function(n){var e,t={stop:null};return requestAnimationFrame?(e=requestAnimationFrame(n),t.stop=function(){return cancelAnimationFrame(e)}):(e=setTimeoutout(n),t.stop=function(){return clearTimeout(e)}),t}});
//# sourceMappingURL=sourcemaps/defer.js.map
