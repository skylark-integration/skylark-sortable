/**
 * skylark-langx-async - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns","skylark-langx-objects","./Deferred"],function(n,e,r){var l=e.each,a={Deferred:r,parallel:function(n,e,a){var t=[];return a=a||null,e=e||[],l(n,function(n,r){t.push(r.apply(a,e))}),r.all(t)},series:function(n,e,a){var t=[],u=new r,i=u.promise;return a=a||null,e=e||[],u.resolve(),l(n,function(n,r){i=i.then(function(){return r.apply(a,e)}),t.push(i)}),r.all(t)},waterful:function(n,e,a){var t=new r,u=t.promise;return a=a||null,e=e||[],t.resolveWith(a,e),l(n,function(n,e){u=u.then(e)}),u}};return n.attach("langx.async",a)});
//# sourceMappingURL=sourcemaps/async.js.map
