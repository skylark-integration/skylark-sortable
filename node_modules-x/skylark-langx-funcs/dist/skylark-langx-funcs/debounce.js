/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(n){return n.debounce=function(n,t){var u;return function(){var e=this,i=arguments;function o(){u&&clearTimeout(u),u=void 0}return o(),u=setTimeout(function(){u=null,n.apply(e,i)},t),{stop:o}}}});
//# sourceMappingURL=sourcemaps/debounce.js.map
