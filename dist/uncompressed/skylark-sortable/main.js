define([
	"skylark-langx",
	"skylark-domx-eventer",
	"skylark-domx-finder",
	"skylark-domx-noder",
	"skylark-domx-styler",
	"./Sortable"
],function(
	langx,
	eventer,
	finder,
	noder,
	styler,
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
		throttle: langx.debounce,
		closest: finder.closest,
		toggleClass: styler.toggleClass,
		clone: 	function (el) {
					return noder.clone(el,true);
				},
		//index: containers._index,
		nextTick: 	function _nextTick(fn) {
			//return setTimeout(fn, 0);
			return langx.defer(fn);
		},
		cancelNextTick: 	function _cancelNextTick(id) {
			//return clearTimeout(id);
			return id && id.stop();
		},
		//detectDirection: _detectDirection,
		getChild: function(el, childNum, options) {
			options.excluding = [];
			options.closesting = options.draggable;
			return finder.childAt(el,childNum,options);
		}
	};

	return Sortable;
});