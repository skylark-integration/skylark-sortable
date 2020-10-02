/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","./funcs"],function(n,r){var t=Array.prototype.slice,i=n.isFunction,e=n.isString;return r.bind=r.proxy=function n(r,c){var u=2 in arguments&&t.call(arguments,2);if(i(r))return function(){return r.apply(c,u?u.concat(t.call(arguments)):arguments)};if(e(c))return u?(u.unshift(r[c],r),n.apply(null,u)):n(r[c],r);throw new TypeError("expected function")}});
//# sourceMappingURL=sourcemaps/proxy.js.map
