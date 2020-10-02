/**
 * skylark-langx-topic - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns","skylark-langx-emitter/Evented"],function(n,t){var a=new t;return n.attach("langx.topic",{publish:function(n,t,e){var r=[].slice.call(arguments,1);return a.trigger({type:n,data:r})},subscribe:function(n,t,e){var r=function(n){t.apply(e,n.data)};return a.on(n,r),{remove:function(){a.off(n,r)}}}})});
//# sourceMappingURL=sourcemaps/topic.js.map
