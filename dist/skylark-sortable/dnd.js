/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer"],function(t,e,l,n,r,i,s,a,o){"use strict";var d="Sortable"+(new Date).getTime(),g={log:function(t,e){l("#console").append("<div>"+t+":"+e+"</div>")},expando:d,activeGroup:null,active:null,putSortable:null,sortables:[],rootEl:null,dragEl:null,cloneEl:null,nextEl:null,parentEl:null,oldIndex:null,awaitingDragStarted:!1,prepare:function(t,e){this.dragging=t,this.active=t.sortable,this.dragEl=e},start:function(t,e){this.dragging=t,this.active=t.sortable},over:function(t){},end:function(t){this._nulling()},nearestEmptyInsertDetectEvent:function(t){if(g.dragEl){var e=g._detectNearestEmptySortable(t.clientX,t.clientY);if(e){var l,n={};for(l in t)n[l]=t[l];n.target=n.rootEl=e,n.preventDefault=void 0,n.stopPropagation=void 0,e[d]._onDragOver(n)}}},_detectNearestEmptySortable:function(t,e){for(var l=this.sortables,n=0;n<l.length;n++)if(!i.lastChild(l[n],{ignoreHidden:!0,excluding:[this.ghostEl]})){var r=s.boundingRect(l[n]),a=l[n][d].options.emptyInsertThreshold,o=t>=r.left-a&&t<=r.right+a,r=e>=r.top-a&&e<=r.bottom+a;if(a&&o&&r)return l[n]}},_disableDraggable:function(t){t.draggable=!1},_nulling:function(){g.dragEl=g.rootEl=g.parentEl=g.nextEl=g.cloneEl=g.tapEvt=g.oldIndex=g.putSortable=g.activeGroup=g.active=null}};return g});
//# sourceMappingURL=sourcemaps/dnd.js.map
