/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./Sortable"],function(n,e,o,t,l,r){return r.utils={on:e.on,off:e.off,css:l.css,is:function(e,n){return!!o.closest(e,n,e,!1)},extend:n.mixin,throttle:n.debounce,closest:o.closest,toggleClass:l.toggleClass,clone:function(e){return t.clone(e,!0)},nextTick:function(e){return n.defer(e)},cancelNextTick:function(e){return e&&e.stop()},getChild:function(e,n,t){return t.excluding=[],t.closesting=t.draggable,o.childAt(e,n,t)}},r});
//# sourceMappingURL=sourcemaps/main.js.map
