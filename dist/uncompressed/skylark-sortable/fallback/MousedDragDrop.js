define([
	"skylark-langx",
	"skylark-domx-query"
],function(
	langx,
	$
){
	var MousedDragDrop = langx.Emitter.inherit({
		_construct : function(manager) {
			var $doc = $(document);

			this.listenTo($doc,"mousemove",this._touchmove)

		},

		destroy : function() {
			this.unlistenTo();
		}
	});
});