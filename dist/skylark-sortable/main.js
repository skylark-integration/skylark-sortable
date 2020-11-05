/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./fallback/autoscroll","./containers","./Sortable"],function(e,n,t,l,o,r,s,c){return c.utils={on:n.on,off:n.off,css:o.css,is:function(e,n){return!!t.closest(e,n,e,!1)},extend:e.mixin,throttle:r._throttle,closest:t.closest,toggleClass:o.toggleClass,clone:function(e){return l.clone(e,!0)},index:s._index,nextTick:function(n){return e.defer(n)},cancelNextTick:function(e){return e&&e.stop()},getChild:function(e,n,l){return l.excluding=[],l.closesting=l.draggable,t.childAt(e,n,l)}},c});
//# sourceMappingURL=sourcemaps/main.js.map
