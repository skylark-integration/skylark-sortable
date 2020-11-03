/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-query"],function(t,n){t.Emitter.inherit({_construct:function(t){var o=n(document);this.listenTo(o,"mousemove",this._touchmove)},destroy:function(){this.unlistenTo()}})});
//# sourceMappingURL=../sourcemaps/fallback/MousedDragDrop.js.map
