/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","./dnd"],function(t,r,e,n,o,l,a,i,d,k,s){"use strict";return{_index:function(t,r){return l.index(t,function(t){return!("TEMPLATE"===t.nodeName.toUpperCase()||t===s.cloneEl||r&&!l.matches(t,r))})},_isElInRowColumn:function(t,r,e){s.draggable.dragEl;var n=a.boundingRect(t),o=a.boundingRect(r),l="vertical"===e?n.left:n.top,i="vertical"===e?n.right:n.bottom,d="vertical"===e?n.width:n.height,k="vertical"===e?o.left:o.top,c="vertical"===e?o.right:o.bottom,m="vertical"===e?o.width:o.height;return l===k||i===c||l+d/2===k+m/2},_isClientInRowColumn:function(t,r,e,n,o){var l=a.boundingRect(e),i="vertical"===n?l.left:l.top,d="vertical"===n?l.right:l.bottom,k="vertical"===n?t:r;return i<k&&k<d}}});
//# sourceMappingURL=sourcemaps/containers.js.map
