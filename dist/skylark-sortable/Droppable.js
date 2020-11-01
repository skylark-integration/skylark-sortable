/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-noder","skylark-domx-data","skylark-domx-finder","skylark-domx-geom","skylark-domx-eventer","skylark-domx-styler","skylark-domx-plugins"],function(r,e,a,n,l,o,s,t){return t.Plugin.inherit({klassName:"Droppable",pluginName:"intg.sortable.droppable",options:{},_construct:function(r,e){this.overrided(r,e),this.nativeDraggable&&(o.on(el,"dragover",this),o.on(el,"dragenter",this))}})});
//# sourceMappingURL=sourcemaps/Droppable.js.map
