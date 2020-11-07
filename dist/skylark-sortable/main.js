/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./fallback/autoscroll","./Sortable"],function(e,t,n,l,o,r,s){return s.utils={on:t.on,off:t.off,css:o.css,is:function(e,t){return!!n.closest(e,t,e,!1)},extend:e.mixin,throttle:r._throttle,closest:n.closest,toggleClass:o.toggleClass,clone:function(e){return l.clone(e,!0)},nextTick:function(t){return e.defer(t)},cancelNextTick:function(e){return e&&e.stop()},getChild:function(e,t,l){return l.excluding=[],l.closesting=l.draggable,n.childAt(e,t,l)}},s});
//# sourceMappingURL=sourcemaps/main.js.map
