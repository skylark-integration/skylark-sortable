/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./autoscroll","./containers","./Sortable"],function(e,n,t,l,o,s,r,i){return i.utils={on:n.on,off:n.off,css:o.css,is:function(e,n){return!!t.closest(e,n,e,!1)},extend:e.mixin,throttle:s._throttle,closest:t.closest,toggleClass:o.toggleClass,clone:function(e){return l.clone(e,!0)},index:r._index,getChild:function(e,n,l){return l.excluding=[],l.closesting=l.draggable,t.childAt(e,n,l)}},i});
//# sourceMappingURL=sourcemaps/main.js.map
