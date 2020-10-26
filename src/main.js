define([
	"skylark-langx",
	"skylark-domx-eventer",
	"skylark-domx-finder",
	"skylark-domx-noder",
	"skylark-domx-styler",
	"./autoscroll",
	"./containers",
	"./Sortable"
],function(
	langx,
	eventer,
	finder,
	noder,
	styler,
	autoscroll,
	containers,
	Sortable
){
	// Export utils
	Sortable.utils = {
		on: eventer.on,
		off: eventer.off,
		css: styler.css,
		///find: _find,
		is: function (el, selector) {
			return !!finder.closest(el, selector, el, false);
		},
		extend: langx.mixin,
		throttle: autoscroll._throttle,
		closest: finder.closest,
		toggleClass: styler.toggleClass,
		clone: 	function (el) {
					return noder.clone(el,true);
				},
		index: containers._index,
		///nextTick: _nextTick,
		///cancelNextTick: _cancelNextTick,
		//detectDirection: _detectDirection,
		getChild: function(el, childNum, options) {
			options.excluding = [];
			options.closesting = options.draggable;
			return finder.childAt(el,childNum,options);
		}
	};

	return Sortable;
});