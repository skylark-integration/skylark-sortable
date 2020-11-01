/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./autoscroll","./containers","./Sortable"],function(e,n,t,o,l,r,s,c){return c.utils={on:n.on,off:n.off,css:l.css,is:function(e,n){return!!t.closest(e,n,e,!1)},extend:e.mixin,throttle:r._throttle,closest:t.closest,toggleClass:l.toggleClass,clone:function(e){return o.clone(e,!0)},index:s._index,nextTick:function(n){return e.defer(n)},cancelNextTick:function(e){return e&&e.stop()},getChild:function(e,n,o){return o.excluding=[],o.closesting=o.draggable,t.childAt(e,n,o)}},c});
//# sourceMappingURL=sourcemaps/main.js.map
