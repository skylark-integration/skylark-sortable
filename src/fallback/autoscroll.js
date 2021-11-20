define([
	"skylark-langx/langx",
	"skylark-langx-hoster/is-browser",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-finder",
	"skylark-domx-plugins-scrolls/scrolling-element"
],function(
	langx,
	isBrowser,
	geom,
	styler,
	finder,
	scrollingElement
){
    'use strict';

	var autoScrolls = [],
		scrolling = false,
		scrollEl,
		scrollCustomFn,
		pointerElemChangedInterval,

		lastPointerElemX,
		lastPointerElemY,


		scrollParentEl = null;

	var
		IE11OrLess = isBrowser && isBrowser.ie,
		Edge = isBrowser && isBrowser.edge,
		FireFox = isBrowser && isBrowser.firefox,
		Safari = isBrowser && isBrowser.safari;



	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function _getRelativeScrollOffset(el) {
		var offsets = geom.scrollOffset(el);
		return [offsets.offsetLeft, offsets.offsetTop];
	}


	var _autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl, /**Boolean*/isFallback,expando) {
		// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
		if (options.scroll) {
			var _this = rootEl ? rootEl[expando] : window,
				sens = options.scrollSensitivity,
				speed = options.scrollSpeed,

				x = evt.clientX,
				y = evt.clientY,

				winScroller = scrollingElement(),

				scrollThisInstance = false;

			// Detect scrollEl
			if (scrollParentEl !== rootEl) {
				_clearAutoScrolls();

				scrollEl = options.scroll;
				scrollCustomFn = options.scrollFn;

				if (scrollEl === true) {
					scrollEl = finder.scrollableParent(rootEl, true);
					scrollParentEl = scrollEl;
				}
			}


			var layersOut = 0;
			var currentParent = scrollEl;
			do {
				var	el = currentParent,
					rect = geom.boundingRect(el),

					top = rect.top,
					bottom = rect.bottom,
					left = rect.left,
					right = rect.right,

					width = rect.width,
					height = rect.height,

					scrollWidth,
					scrollHeight,

					css,

					vx,
					vy,

					canScrollX,
					canScrollY,

					scrollPosX,
					scrollPosY;


				scrollWidth = el.scrollWidth;
				scrollHeight = el.scrollHeight;

				css = styler.css(el);

				scrollPosX = el.scrollLeft;
				scrollPosY = el.scrollTop;

				if (el === winScroller) {
					canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll' || css.overflowX === 'visible');
					canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll' || css.overflowY === 'visible');
				} else {
					canScrollX = width < scrollWidth && (css.overflowX === 'auto' || css.overflowX === 'scroll');
					canScrollY = height < scrollHeight && (css.overflowY === 'auto' || css.overflowY === 'scroll');
				}

				vx = canScrollX && (Math.abs(right - x) <= sens && (scrollPosX + width) < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);

				vy = canScrollY && (Math.abs(bottom - y) <= sens && (scrollPosY + height) < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);


				if (!autoScrolls[layersOut]) {
					for (var i = 0; i <= layersOut; i++) {
						if (!autoScrolls[i]) {
							autoScrolls[i] = {};
						}
					}
				}

				if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
					autoScrolls[layersOut].el = el;
					autoScrolls[layersOut].vx = vx;
					autoScrolls[layersOut].vy = vy;

					clearInterval(autoScrolls[layersOut].pid);

					if (el && (vx != 0 || vy != 0)) {
						scrollThisInstance = true;
						/* jshint loopfunc:true */
						autoScrolls[layersOut].pid = setInterval((function () {
							// emulate drag over during autoscroll (fallback), emulating native DnD behaviour
							///if (isFallback && this.layer === 0) {
							///	Sortable.active._emulateDragOver(true);
							///	Sortable.active._onTouchMove(toudrachEvt, true);
							///}
							var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
							var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								if (scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt, touchEvt, autoScrolls[this.layer].el) !== 'continue') {
									return;
								}
							}

							geom.scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
						}).bind({layer: layersOut}), 24);
					}
				}
				layersOut++;
			} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = finder.scrollableParent(currentParent, false)));
			scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
		}
	}, 30),

	_clearAutoScrolls = function () {
		autoScrolls.forEach(function(autoScroll) {
			clearInterval(autoScroll.pid);
		});
		autoScrolls = [];
	},

	_handleAutoScroll = function(evt, options,fallback,expando) {
		var x = evt.clientX,
			y = evt.clientY,

			elem = document.elementFromPoint(x, y);


		_throttleTimeout = _autoScroll(evt, options, elem, fallback,expando);

		// Listener for pointer element change
		var ogElemScroller = finder.scrollableParent(elem, true);
		if (
			scrolling &&
			(
				!pointerElemChangedInterval ||
				x !== lastPointerElemX ||
				y !== lastPointerElemY
			)
		) {

			pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
			// Detect for pointer elem change, emulating native DnD behaviour
			pointerElemChangedInterval = setInterval(function() {
				//if (!dragEl) return;
				// could also check if scroll direction on newElem changes due to parent autoscrolling
				var newElem = finder.scrollableParent(document.elementFromPoint(x, y), true);
				if (newElem !== ogElemScroller) {
					ogElemScroller = newElem;
					_clearAutoScrolls();
					_throttleTimeout = _autoScroll(evt, options, ogElemScroller, fallback);
				}
			}, 10);
			lastPointerElemX = x;
			lastPointerElemY = y;
		}
	};


	var _throttleTimeout;
	function _throttle(callback, ms) {
		return langx.debounce(callback,ms);
	}

	function _cancelThrottle() {
		//clearTimeout(_throttleTimeout);
		//_throttleTimeout = void 0;
		if (_throttleTimeout && _throttleTimeout.stop) {
			_throttleTimeout.stop();
			_throttleTimeout = void 0;
		}
	}

	
	function _nulling() {
		pointerElemChangedInterval && clearInterval(pointerElemChangedInterval);
		pointerElemChangedInterval = null;
		lastPointerElemX = null;
		lastPointerElemY = null;

		this.scrollEl =
		this.scrollParentEl =
		this.autoScrolls.length = null;



	}
	return {
		autoScrolls,
		
		_getRelativeScrollOffset,
		_autoScroll,

		_clearAutoScrolls,
		_handleAutoScroll,

		_throttle,
		_cancelThrottle,
		_nulling
	}
});