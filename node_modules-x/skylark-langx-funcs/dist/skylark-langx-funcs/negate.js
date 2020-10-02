/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(n){return n.negate=function(n){if("function"!=typeof n)throw new TypeError("Expected a function");return function(...t){return!n.apply(this,t)}}});
//# sourceMappingURL=sourcemaps/negate.js.map
