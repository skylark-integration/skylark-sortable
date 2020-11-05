/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./dnd"],function(r,t,e,l,o,n,a,i,s,k,d,c,m,u,y,g){"use strict";return{_index:function(r,t){return i.index(r,function(r){return!("TEMPLATE"===r.nodeName.toUpperCase()||r===g.cloneEl||t&&!i.matches(r,t))})},_isElInRowColumn:function(r,t,e){g.draggable.dragEl;var l=s.boundingRect(r),o=s.boundingRect(t),n="vertical"===e?l.left:l.top,a="vertical"===e?l.right:l.bottom,i="vertical"===e?l.width:l.height,k="vertical"===e?o.left:o.top,d="vertical"===e?o.right:o.bottom,c="vertical"===e?o.width:o.height;return n===k||a===d||n+i/2===k+c/2},_isClientInRowColumn:function(r,t,e,l,o){var n=s.boundingRect(e),a="vertical"===l?n.left:n.top,i="vertical"===l?n.right:n.bottom,k="vertical"===l?r:t;return a<k&&k<i}}});
//# sourceMappingURL=sourcemaps/containers.js.map
