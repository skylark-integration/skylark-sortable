/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","./funcs"],function(n,t){var e=n.mixin,r=function(){function n(){}return function(t,r){n.prototype=t;var o=new n;return n.prototype=null,r&&e(o,r),o}}();return t.delegate=r});
//# sourceMappingURL=sourcemaps/delegate.js.map
