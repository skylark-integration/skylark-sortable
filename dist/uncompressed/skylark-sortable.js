/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-langx-hoster/detects/browser',[
    "../hoster"
],function(hoster){
	//refer : https://github.com/gabceb/jquery-browser-plugin

	function detectBrowser() {

		function uaMatch( ua ) {
			ua = ua.toLowerCase();

			var match = /(edge)\/([\w.]+)/.exec( ua ) ||
			    /(opr)[\/]([\w.]+)/.exec( ua ) ||
			    /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
			    /(iemobile)[\/]([\w.]+)/.exec( ua ) ||
			    /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
			    /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
			    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
			    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
			    /(msie) ([\w.]+)/.exec( ua ) ||
			    ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
			    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
			    [];

			var platform_match = /(ipad)/.exec( ua ) ||
			    /(ipod)/.exec( ua ) ||
			    /(windows phone)/.exec( ua ) ||
			    /(iphone)/.exec( ua ) ||
			    /(kindle)/.exec( ua ) ||
			    /(silk)/.exec( ua ) ||
			    /(android)/.exec( ua ) ||
			    /(win)/.exec( ua ) ||
			    /(mac)/.exec( ua ) ||
			    /(linux)/.exec( ua ) ||
			    /(cros)/.exec( ua ) ||
			    /(playbook)/.exec( ua ) ||
			    /(bb)/.exec( ua ) ||
			    /(blackberry)/.exec( ua ) ||
			    [];

			var browser = {},
			    matched = {
			      browser: match[ 5 ] || match[ 3 ] || match[ 1 ] || "",
			      version: match[ 2 ] || match[ 4 ] || "0",
			      versionNumber: match[ 4 ] || match[ 2 ] || "0",
			      platform: platform_match[ 0 ] || ""
			    };

			if ( matched.browser ) {
				browser[ matched.browser ] = true;
			  	browser.version = matched.version;
			  	browser.versionNumber = parseInt(matched.versionNumber, 10);
			}

			if ( matched.platform ) {
			 	browser[ matched.platform ] = true;
			}

			// These are all considered mobile platforms, meaning they run a mobile browser
			if ( browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
				browser.ipod || browser.kindle || browser.playbook || browser.silk || browser[ "windows phone" ]) {
				browser.mobile = true;
			}

			// These are all considered desktop platforms, meaning they run a desktop browser
			if ( browser.cros || browser.mac || browser.linux || browser.win ) {
				browser.desktop = true;
			}

			// Chrome, Opera 15+ and Safari are webkit based browsers
			if ( browser.chrome || browser.opr || browser.safari ) {
				browser.webkit = true;
			}

			// IE11 has a new token so we will assign it msie to avoid breaking changes
			if ( browser.rv || browser.iemobile) {
			  var ie = "ie";

			  matched.browser = ie;
			  browser[ie] = true;
			}

			// Edge is officially known as Microsoft Edge, so rewrite the key to match
			if ( browser.edge ) {
			  delete browser.edge;
			  var msedge = "edge";

			  matched.browser = msedge;
			  browser[msedge] = true;
			}

			// Blackberry browsers are marked as Safari on BlackBerry
			if ( browser.safari && browser.blackberry ) {
			  var blackberry = "blackberry";

			  matched.browser = blackberry;
			  browser[blackberry] = true;
			}

			// Playbook browsers are marked as Safari on Playbook
			if ( browser.safari && browser.playbook ) {
			  var playbook = "playbook";

			  matched.browser = playbook;
			  browser[playbook] = true;
			}

			// BB10 is a newer OS version of BlackBerry
			if ( browser.bb ) {
			  var bb = "blackberry";

			  matched.browser = bb;
			  browser[bb] = true;
			}

			// Opera 15+ are identified as opr
			if ( browser.opr ) {
			  var opera = "opera";

			  matched.browser = opera;
			  browser[opera] = true;
			}

			// Stock Android browsers are marked as Safari on Android.
			if ( browser.safari && browser.android ) {
			  var android = "android";

			  matched.browser = android;
			  browser[android] = true;
			}

			// Kindle browsers are marked as Safari on Kindle
			if ( browser.safari && browser.kindle ) {
			  var kindle = "kindle";

			  matched.browser = kindle;
			  browser[kindle] = true;
			}

			 // Kindle Silk browsers are marked as Safari on Kindle
			if ( browser.safari && browser.silk ) {
			  var silk = "silk";

			  matched.browser = silk;
			  browser[silk] = true;
			}

			// Assign the name and platform variable
			browser.name = matched.browser;
			browser.platform = matched.platform;
			return browser;
		}


	    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

	    if (isBrowser) {
		    return uaMatch( navigator.userAgent );
	    } else {
	    	return null;
	    }
	}


	return hoster.detects.browser = detectBrowser;
});
define('skylark-langx-hoster/isBrowser',[
    "./hoster",
    "./detects/browser"
],function(hoster,detectBrowser){
	if (hoster.isBrowser == undefined) {
		hoster.isBrowser = detectBrowser();
	}

    return hoster.isBrowser;
});

define('skylark-domx-layouts/oriented',[
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-finder",
	"./Orientation"
],function(
	geom,
	styler,
	finder,
	Orientation
){

	/**
	 * Detects children orientation.
	 */
	function oriented(el, options) {
		var elCSS = styler.css(el),

			elWidth = geom.contentRect(el).width,

			child1 = finder.childAt(el, 0, options),
			child2 = finder.childAt(el, 1, options),
			firstChildCSS = child1 && styler.css(child1),
			secondChildCSS = child2 && styler.css(child2),

			firstChildWidth = child1 && geom.marginSize(child1).width,
			secondChildWidth = child2 && geom.marginSize(child2).width;

		if (elCSS.display === 'flex') {
			return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse'
			? Orientation.Vertical : Orientation.Horizontal;
		}

		if (elCSS.display === 'grid') {
			return elCSS.gridTemplateColumns.split(' ').length <= 1 ? Orientation.Vertical : Orientation.Horizontal;
		}

		if (child1 && firstChildCSS.float !== 'none') {
			var touchingSideChild2 = firstChildCSS.float === 'left' ? 'left' : 'right';

			return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ?
				Orientation.Vertical : Orientation.Horizontal;
		}

		return (child1 &&
			(
				firstChildCSS.display === 'block' ||
				firstChildCSS.display === 'flex' ||
				firstChildCSS.display === 'table' ||
				firstChildCSS.display === 'grid' ||
				firstChildWidth >= elWidth &&
				elCSS.float === 'none' ||
				child2 &&
				elCSS.float === 'none' &&
				firstChildWidth + secondChildWidth > elWidth
			) ?
			Orientation.Vertical : Orientation.Horizontal
		);
	}

	return oriented;
});
define('skylark-sortable/dnd',[
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-langx-hoster/isBrowser",
	"skylark-langx-hoster/isMobile",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-transforms",
	"skylark-domx-scrolls/scrollingElement",
	"skylark-domx-layouts/oriented",
	"skylark-devices-points/touch"
],function(
	skylark,
	langx,
	isBrowser,
	isMobile,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer,
	transforms,
	scrollingElement,
	oriented,
	touch
){

	var expando = 'Sortable' + (new Date).getTime();


	var dnd = {
		expando,

		active : null,
		putSortable : null,
		sortables : [],


		dragEl : null,
		cloneEl : null,

		touchEvt : null,

        prepare: function(draggable) {
			var el = draggable.el,
				ownerDocument = el.ownerDocument;

			eventer.on(ownerDocument, 'dragover', this.nearestEmptyInsertDetectEvent);
			eventer.on(ownerDocument, 'mousemove', this.nearestEmptyInsertDetectEvent);
			///eventer.on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
		},

        start: function(draggable, event) {
        },

        over : function() {

        },

        end: function(dropped) {
 		},

		nearestEmptyInsertDetectEvent :function (evt) {
			if (dnd.dragEl) {
				evt = evt.touches ? evt.touches[0] : evt;
				var nearest = dnd._detectNearestEmptySortable(evt.clientX, evt.clientY);

				if (nearest) {
					// Create imitation event
					var event = {};
					for (var i in evt) {
						event[i] = evt[i];
					}
					event.target = event.rootEl = nearest;
					event.preventDefault = void 0;
					event.stopPropagation = void 0;
					nearest[expando]._onDragOver(event);
				}
			}
		}, 

		/**
		 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
		 * @param  {Number} x      X position
		 * @param  {Number} y      Y position
		 * @return {HTMLElement}   Element of the first found nearest Sortable
		 */
		_detectNearestEmptySortable : function(x, y) {
			var sortables = this.sortables;

			for (var i = 0; i < sortables.length; i++) {
				if (finder.lastChild(sortables[i],{ignoreHidden : true,excluding : [this.ghostEl]})) continue;

				var rect = geom.boundingRect(sortables[i]),
					threshold = sortables[i][expando].options.emptyInsertThreshold,
					insideHorizontally = x >= (rect.left - threshold) && x <= (rect.right + threshold),
					insideVertically = y >= (rect.top - threshold) && y <= (rect.bottom + threshold);

				if (threshold && insideHorizontally && insideVertically) {
					return sortables[i];
				}
			}
		},

		_checkAlignment : function(evt) {
			if (!this.dragEl || !this.dragEl.parentNode) return;
			this.dragEl.parentNode[expando] && this.dragEl.parentNode[expando]._computeIsAligned(evt);
		},

		_emulateDragOver: function (forAutoScroll) {
			var dragEl = this.dragEl,
				touchEvt = this.touchEvt;

			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY && !forAutoScroll) {
					return;
				}
				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				//_hideGhostForTarget();

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;

				while (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					if (target === parent) break;
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							var inserted;

							inserted = parent[expando]._onDragOver({
								clientX: touchEvt.clientX,
								clientY: touchEvt.clientY,
								target: target,
								rootEl: parent
							});

							//if (inserted && !this.options.dragoverBubble) {
							if (inserted) {
								break;
							}
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}
				dragEl.parentNode[expando]._computeIsAligned(touchEvt);

				//_unhideGhostForTarget();
			}
		},

		_onMove : function (fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
			var evt,
				sortable = fromEl[expando],
				onMoveFn = sortable.options.onMove,
				retVal;

			evt = eventer.create("move",{
				to : toEl,
				from : fromEl,
				dragged : dragEl,
				draggedRect: dragRect,
				related : targetEl || toEl,
				relatedRect : targetRect || geom.boundingRect(toEl),
				willInsertAfter : willInsertAfter,
				originalEvent : originalEvt
			});

			fromEl.dispatchEvent(evt);

			if (onMoveFn) {
				retVal = onMoveFn.call(sortable, evt, originalEvt);
			}

			return retVal;
		},

		_dispatchEvent : function (
			sortable, rootEl, name,
			targetEl, toEl, fromEl,
			startIndex, newIndex,
			startDraggableIndex, newDraggableIndex,
			originalEvt
		) {
			sortable = (sortable || rootEl[expando]);
			var evt,
				options = sortable.options,
				onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1),
				putSortable = this.putSortable;

			evt = eventer.create(name,{
				to : toEl || rootEl,
				from : fromEl || rootEl,
				item : targetEl || rootEl,
				clone : this.cloneEl,
				oldIndex : startIndex,
				newIndex : newIndex,
				oldDraggableIndex : startDraggableIndex,
				newDraggableIndex : newDraggableIndex,
				originalEvent : originalEvt,
				pullMode : putSortable ? putSortable.lastPutMode : undefined
			});
			if (rootEl) {
				rootEl.dispatchEvent(evt);
			}

			if (options[onName]) {
				options[onName].call(sortable, evt);
			}
		}

	};


	return dnd;
	
});
define('skylark-sortable/autoscroll',[
	"skylark-langx/langx",
	"skylark-langx-hoster/isBrowser",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-scrolls/scrollingElement",
	"./dnd"
],function(
	langx,
	isBrowser,
	geom,
	styler,
	scrollingElement,
	dnd
){
	var autoScrolls = [],
		scrolling = false,
		scrollParentEl = null;

	var
		IE11OrLess = isBrowser && isBrowser.ie,
		Edge = isBrowser && isBrowser.edge,
		FireFox = isBrowser && isBrowser.firefox,
		Safari = isBrowser && isBrowser.safari;


	/**
	 * Checks if a side of an element is scrolled past a side of it's parents
	 * @param  {HTMLElement}  el       The element who's side being scrolled out of view is in question
	 * @param  {String}       side     Side of the element in question ('top', 'left', 'right', 'bottom')
	 * @return {HTMLElement}           The parent scroll element that the el's side is scrolled past, or null if there is no such element
	 */
	function _isScrolledPast(el, side) {
		var parent = _getParentAutoScrollElement(el, true),
			elSide = geom.boundingRect(el)[side];

		/* jshint boss:true */
		while (parent) {
			var parentSide = geom.boundingRect(parent)[side],
				visible;

			if (side === 'top' || side === 'left') {
				visible = elSide >= parentSide;
			} else {
				visible = elSide <= parentSide;
			}

			if (!visible) return parent;

			if (parent === scrollingElement()) break;

			parent = _getParentAutoScrollElement(parent, false);
		}

		return false;
	}

	/**
	 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
	 * The value is returned in real pixels.
	 * @param  {HTMLElement} el
	 * @return {Array}             Offsets in the format of [left, top]
	 */
	function _getRelativeScrollOffset(el) {
		var offsetLeft = 0,
			offsetTop = 0,
			winScroller = scrollingElement();

		if (el) {
			do {
				var matrix = transforms.matrix(el),
					scaleX = matrix.a,
					scaleY = matrix.d;

				offsetLeft += el.scrollLeft * scaleX;
				offsetTop += el.scrollTop * scaleY;
			} while (el !== winScroller && (el = el.parentNode));
		}

		return [offsetLeft, offsetTop];
	}

	var _getParentAutoScrollElement = function(el, includeSelf) {
		// skip to window
		if (!el || !el.getBoundingClientRect) return scrollingElement();

		var elem = el;
		var gotSelf = false;
		do {
			// we don't need to get elem css if it isn't even overflowing in the first place (performance)
			if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
				var elemCSS = styler.css(elem);
				if (
					elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') ||
					elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')
				) {
					if (!elem || !elem.getBoundingClientRect || elem === document.body) return scrollingElement();

					if (gotSelf || includeSelf) return elem;
					gotSelf = true;
				}
			}
		/* jshint boss:true */
		} while (elem = elem.parentNode);

		return scrollingElement();
	},


	_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl, /**Boolean*/isFallback) {
		// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
		if (options.scroll) {
			var _this = rootEl ? rootEl[dnd.expando] : window,
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
					scrollEl = _getParentAutoScrollElement(rootEl, true);
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

				vx = canScrollX && (abs(right - x) <= sens && (scrollPosX + width) < scrollWidth) - (abs(left - x) <= sens && !!scrollPosX);

				vy = canScrollY && (abs(bottom - y) <= sens && (scrollPosY + height) < scrollHeight) - (abs(top - y) <= sens && !!scrollPosY);


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
							if (isFallback && this.layer === 0) {
								Sortable.active._emulateDragOver(true);
								Sortable.active._onTouchMove(touchEvt, true);
							}
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
			} while (options.bubbleScroll && currentParent !== winScroller && (currentParent = _getParentAutoScrollElement(currentParent, false)));
			scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
		}
	}, 30),

	_clearAutoScrolls = function () {
		autoScrolls.forEach(function(autoScroll) {
			clearInterval(autoScroll.pid);
		});
		autoScrolls = [];
	},

	_handleAutoScroll = function(evt, options,fallback) {
		var x = evt.clientX,
			y = evt.clientY,

			elem = document.elementFromPoint(x, y);

		// IE does not seem to have native autoscroll,
		// Edge's autoscroll seems too conditional,
		// MACOS Safari does not have autoscroll,
		// Firefox and Chrome are good
		if (fallback || Edge || IE11OrLess || Safari) {
			_throttleTimeout = _autoScroll(evt, options, elem, fallback);

			// Listener for pointer element change
			var ogElemScroller = _getParentAutoScrollElement(elem, true);
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
					if (!dragEl) return;
					// could also check if scroll direction on newElem changes due to parent autoscrolling
					var newElem = _getParentAutoScrollElement(document.elementFromPoint(x, y), true);
					if (newElem !== ogElemScroller) {
						ogElemScroller = newElem;
						_clearAutoScrolls();
						_throttleTimeout = _autoScroll(evt, options, ogElemScroller, fallback);
					}
				}, 10);
				lastPointerElemX = x;
				lastPointerElemY = y;
			}

		} else {
			// if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
			if (!options.bubbleScroll || _getParentAutoScrollElement(elem, true) === scrollingElement()) {
				_clearAutoScrolls();
				return;
			}
			_throttleTimeout = _autoScroll(evt, options, _getParentAutoScrollElement(elem, false), false);
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

	
	return {
		autoScrolls,
		
		_isScrolledPast,
		_getRelativeScrollOffset,
		_autoScroll,

		_clearAutoScrolls,
		_handleAutoScroll,

		_throttle,
		_cancelThrottle
	}
});
define('skylark-sortable/containers',[
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-langx-hoster/isBrowser",
	"skylark-langx-hoster/isMobile",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-transforms",
	"skylark-domx-scrolls/scrollingElement",
	"skylark-domx-layouts/oriented",
	"skylark-devices-points/touch",
	"./autoscroll",
	"./dnd"
],function(
	skylark,
	langx,
	isBrowser,
	isMobile,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer,
	transforms,
	scrollingElement,
	oriented,
	touch,
	autoscroll,
	dnd
){
	var
		/**
		 * Returns the index of an element within its parent for a selected set of
		 * elements
		 * @param  {HTMLElement} el
		 * @param  {selector} selector
		 * @return {number}
		 */
		_index = function (el, selector) {
			return finder.index(el,function(el){
				if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== dnd.cloneEl && (!selector || finder.matches(el, selector))) {
					return true;
				}

				return false;			
			})
		},

		_isClientInRowColumn = function(x, y, el, axis, options) {
			var targetRect = geom.boundingRect(el),
				targetS1Opp = axis === 'vertical' ? targetRect.left : targetRect.top,
				targetS2Opp = axis === 'vertical' ? targetRect.right : targetRect.bottom,
				mouseOnOppAxis = axis === 'vertical' ? x : y;

			return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
		},

		_isElInRowColumn = function(el1, el2, axis) {
			var dragEl = dnd.dragEl;

			var el1Rect = geom.boundingRect(el1),//el1 === dragEl && realDragElRect || geom.boundingRect(el1),
				el2Rect = geom.boundingRect(el2),//el2 === dragEl && realDragElRect || geom.boundingRect(el2),
				el1S1Opp = axis === 'vertical' ? el1Rect.left : el1Rect.top,
				el1S2Opp = axis === 'vertical' ? el1Rect.right : el1Rect.bottom,
				el1OppLength = axis === 'vertical' ? el1Rect.width : el1Rect.height,
				el2S1Opp = axis === 'vertical' ? el2Rect.left : el2Rect.top,
				el2S2Opp = axis === 'vertical' ? el2Rect.right : el2Rect.bottom,
				el2OppLength = axis === 'vertical' ? el2Rect.width : el2Rect.height;

			return (
				el1S1Opp === el2S1Opp ||
				el1S2Opp === el2S2Opp ||
				(el1S1Opp + el1OppLength / 2) === (el2S1Opp + el2OppLength / 2)
			);
		};


	return {
		_index,
		_isElInRowColumn,
		_isClientInRowColumn
	}
	
});
define('skylark-sortable/ghoster',[
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-langx-hoster/isBrowser",
	"skylark-langx-hoster/isMobile",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-transforms",
	"skylark-domx-scrolls/scrollingElement",
	"skylark-domx-layouts/oriented",
	"skylark-devices-points/touch"
],function(
	skylark,
	langx,
	isBrowser,
	isMobile,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer,
	transforms,
	scrollingElement,
	oriented,
	touch
){
		/**
	 * Returns the "bounding client rect" of given element
	 * @param  {HTMLElement} el                The element whose boundingClientRect is wanted
	 * @param  {[HTMLElement]} container       the parent the element will be placed in
	 * @param  {[Boolean]} adjustForTransform  Whether the rect should compensate for parent's transform
	 * @return {Object}                        The boundingClientRect of el
	 */
	function _getRect(el, adjustForTransform, container, adjustForFixed) {
		if (!el.getBoundingClientRect && el !== window) return;
		var {
			top,
			left,
			bottom,
			right,
			width,
			height
		} = geom.boundingRect(el);
		
		if (adjustForTransform && el !== window) {
			// Adjust for scale()
			var matrix = transforms.matrix(container || el),
				scaleX = matrix && matrix.a,
				scaleY = matrix && matrix.d;

			if (matrix) {
				top /= scaleY;
				left /= scaleX;

				width /= scaleX;
				height /= scaleY;

				bottom = top + height;
				right = left + width;
			}
		}

		return {
			top: top,
			left: left,
			bottom: bottom,
			right: right,
			width: width,
			height: height
		};
	}


	var ghoster = {
		ghostEl : null,

		PositionGhostAbsolutely : isMobile.apple.device, //IOS
		// For positioning ghost absolutely
		ghostRelativeParent : null,
		ghostRelativeParentInitialScroll : [], // (left, top)

		_ghostIsLast : function (evt, axis, el) {
			var elRect = geom.boundingRect(finder.lastChild(el,{ignoreHidden : true,excluding : [this.ghostEl]})),
				mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
				mouseOnOppAxis = axis === 'vertical' ? evt.clientX : evt.clientY,
				targetS2 = axis === 'vertical' ? elRect.bottom : elRect.right,
				targetS1Opp = axis === 'vertical' ? elRect.left : elRect.top,
				targetS2Opp = axis === 'vertical' ? elRect.right : elRect.bottom,
				spacer = 10;

			return (
				axis === 'vertical' ?
					(mouseOnOppAxis > targetS2Opp + spacer || mouseOnOppAxis <= targetS2Opp && mouseOnAxis > targetS2 && mouseOnOppAxis >= targetS1Opp) :
					(mouseOnAxis > targetS2 && mouseOnOppAxis > targetS1Opp || mouseOnAxis <= targetS2 && mouseOnOppAxis > targetS2Opp + spacer)
			);
		},


		/**
		 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
		 * @param  {HTMLElement} el       Parent element
		 * @return {HTMLElement}          The last child, ignoring ghostEl
		 */
		_lastChild : function (el) {
			/*
			var last = el.lastElementChild;

			while (last && (last === ghostEl || styler.css(last, 'display') === 'none')) {
				last = last.previousElementSibling;
			}

			return last || null;
			*/
			return finder.lastChild(el,{
				ignoreHidden : true,
				excluding : [this.ghostEl]
			})
		},

		_appendGhost: function (dragEl,container,options) {
			// Bug if using scale(): https://stackoverflow.com/questions/2637058
			// Not being adjusted for
			var /// dragEl = dnd.dragEl,
				ghostEl = this.ghostEl;

			if (!ghostEl) {
				var ///container = this.options.fallbackOnBody ? document.body : rootEl,
					rect = _getRect(dragEl, true, container, !this.PositionGhostAbsolutely),
					css = styler.css(dragEl);
					///options = this.options;

				// Position absolutely
				if (this.PositionGhostAbsolutely) {
					// Get relatively positioned parent
					var ghostRelativeParent = this.ghostRelativeParent = container;

					while (
						styler.css(ghostRelativeParent, 'position') === 'static' &&
						styler.css(ghostRelativeParent, 'transform') === 'none' &&
						ghostRelativeParent !== document
					) {
						ghostRelativeParent = ghostRelativeParent.parentNode;
					}

					if (ghostRelativeParent !== document) {
						var ghostRelativeParentRect = _getRect(ghostRelativeParent, true);

						rect.top -= ghostRelativeParentRect.top;
						rect.left -= ghostRelativeParentRect.left;
					}

					if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
						if (ghostRelativeParent === document) {
							ghostRelativeParent = this.ghostRelativeParent = scrollingElement();
						}							

						rect.top += ghostRelativeParent.scrollTop;
						rect.left += ghostRelativeParent.scrollLeft;
					} else {
						ghostRelativeParent = this.ghostRelativeParent = scrollingElement();
					}
					ghostRelativeParentInitialScroll = autoscroll._getRelativeScrollOffset(ghostRelativeParent);
				}


				ghostEl =this.ghostEl = dragEl.cloneNode(true);

				styler.toggleClass(ghostEl, options.ghostClass, false);
				styler.toggleClass(ghostEl, options.fallbackClass, true);
				styler.toggleClass(ghostEl, options.dragClass, true);

				styler.css(ghostEl, 'box-sizing', 'border-box');
				styler.css(ghostEl, 'margin', 0);
				styler.css(ghostEl, 'top', rect.top);
				styler.css(ghostEl, 'left', rect.left);
				styler.css(ghostEl, 'width', rect.width);
				styler.css(ghostEl, 'height', rect.height);
				styler.css(ghostEl, 'opacity', '0.8');
				styler.css(ghostEl, 'position', (this.PositionGhostAbsolutely ? 'absolute' : 'fixed'));
				styler.css(ghostEl, 'zIndex', '100000');
				styler.css(ghostEl, 'pointerEvents', 'none');

				container.appendChild(ghostEl);
			}
		},

		getRelativeScrollOffset : function(){
			return this.PositionGhostAbsolutely && this.ghostRelativeParent && autoscroll._getRelativeScrollOffset(this.ghostRelativeParent);
		}  


	};

	return ghoster;
	
});
define('skylark-sortable/Sortable',[
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-langx-hoster/isBrowser",
	"skylark-langx-hoster/isMobile",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-transforms",
	"skylark-domx-scrolls/scrollingElement",
	"skylark-domx-layouts/oriented",
	"skylark-devices-points/touch",
	"./autoscroll",
	"./containers",
	"./dnd",
	"./ghoster"
],function(
	skylark,
	langx,
	isBrowser,
	isMobile,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer,
	transforms,
	scrollingElement,
	oriented,
	touch,
	autoscroll,
	containers,
	dnd,
	ghoster
){
	function log(category,message) {
		$("#console").append("<div>"+category+":"+message+"</div>");	
	}	


	var 
		parentEl,
		//ghostEl,
		//cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		//scrollParentEl,
		scrollCustomFn,

		oldIndex,
		newIndex,
		oldDraggableIndex,
		newDraggableIndex,

		activeGroup,
		//putSortable,

		awaitingDragStarted = false,
		ignoreNextClick = false,
		//sortables = [],

		pointerElemChangedInterval,
		lastPointerElemX,
		lastPointerElemY,

		tapEvt,
		//touchEvt,

		moved,

		lastTarget,
		lastDirection,
		pastFirstInvertThresh = false,
		isCircumstantialInvert = false,
		lastMode, // 'swap' or 'insert'

		targetMoveDistance,


		realDragElRect, // dragEl rect after current animation

		/** @const */
		R_SPACE = /\s+/g,

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		Polymer = win.Polymer,

		captureMode = {
			capture: false,
			passive: false
		},

		/*
		IE11OrLess = !!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),
		Edge = !!navigator.userAgent.match(/Edge/i),
		FireFox = !!navigator.userAgent.match(/firefox/i),
		Safari = !!(navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && !navigator.userAgent.match(/android/i)),

		IOS = !!(navigator.userAgent.match(/iP(ad|od|hone)/i)),
		*/
		IE11OrLess = isBrowser && isBrowser.ie,
		Edge = isBrowser && isBrowser.edge,
		FireFox = isBrowser && isBrowser.firefox,
		Safari = isBrowser && isBrowser.safari,

		IOS = isMobile && isMobile.apple.device,

		//CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',

		// This will not pass for IE9, because IE9 DnD only works on anchors
		supportDraggable = ('draggable' in document.createElement('div')) && !isMobile.apple.device,

		/*
		supportCssPointerEvents = (function() {
			// false when <= IE11
			if (IE11OrLess) {
				return false;
			}
			var el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),
		*/
		supportCssPointerEvents = browser.support.cssPointerEvents;

		_silent = false,
		_alignedSilent = false,

		abs = Math.abs,
		min = Math.min,
		max = Math.max,

		savedInputChecked = [],


		_prepareGroup = function (options) {
			function toFn(value, pull) {
				return function(to, from, dragEl, evt) {
					var sameGroup = to.options.group.name &&
									from.options.group.name &&
									to.options.group.name === from.options.group.name;

					if (value == null && (pull || sameGroup)) {
						// Default pull value
						// Default pull and put value if same group
						return true;
					} else if (value == null || value === false) {
						return false;
					} else if (pull && value === 'clone') {
						return value;
					} else if (typeof value === 'function') {
						return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
					} else {
						var otherGroup = (pull ? to : from).options.group.name;

						return (value === true ||
						(typeof value === 'string' && value === otherGroup) ||
						(value.join && value.indexOf(otherGroup) > -1));
					}
				};
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		},


		//_hideGhostForTarget = function() {
		//	if (!supportCssPointerEvents && ghostEl) {
		//		styler.css(ghostEl, 'display', 'none');
		//	}
		//},

		//_unhideGhostForTarget = function() {
		//	if (!supportCssPointerEvents && ghostEl) {
		//		styler.css(ghostEl, 'display', '');
		//	}
		//};



	// #1184 fix - Prevent click event on fallback if dragged but item not changed position
	document.addEventListener('click', function(evt) {
		if (ignoreNextClick) {
			evt.preventDefault();
			evt.stopPropagation && evt.stopPropagation();
			evt.stopImmediatePropagation && evt.stopImmediatePropagation();
			ignoreNextClick = false;
			return false;
		}
	}, true);


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}


	function _saveInputCheckedState(root) {
		savedInputChecked.length = 0;

		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		//return setTimeout(fn, 0);
		return langx.defer(fn);
	}

	function _cancelNextTick(id) {
		//return clearTimeout(id);
		return id && id.stop();
	}



	// Fixed #973:
	eventer.on(document, 'touchmove', function(evt) {
		if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
			evt.preventDefault();
		}
	});


	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = langx.mixin({}, options);


		// Export instance
		el[dnd.expando] = this;

		// Default options
		var defaults = {
			group: null,
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: true,
			draggable: /[uo]l/i.test(el.nodeName) ? '>li' : '>*',
			swapThreshold: 1, // percentage; 0 <= x <= 1
			invertSwap: false, // invert always
			invertedSwapThreshold: null, // will be set to same as swapThreshold if default
			removeCloneOnHide: true,
			direction: function(evt, target, dragEl,ghostEl) {
				return oriented(el, langx.mixin({
									excluding : [ghostEl,dragEl]
								},this.options));
			},
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			easing: null,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			delayOnTouchOnly: false,
			touchStartThreshold: parseInt(window.devicePixelRatio, 10) || 1,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false && ('PointerEvent' in window),
			emptyInsertThreshold: 5
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		if (this.nativeDraggable) {
			// Touch start threshold cannot be greater than the native dragstart threshold
			this.options.touchStartThreshold = 1;
		}

		// Bind events
		touch.mousy(el);

		eventer.on(el, 'mousedown', this._onTapStart);

		if (this.nativeDraggable) {
			eventer.on(el, 'dragover', this);
			eventer.on(el, 'dragenter', this);
		}

		dnd.sortables.push(this.el);

		// Restore sorting
		options.store && options.store.get && this.sort(options.store.get(this) || []);
	}

	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_computeIsAligned: function(evt) {
			var target,
				dragEl = dnd.dragEl;

			//if (ghostEl && !supportCssPointerEvents) {
			//	_hideGhostForTarget();
			//	target = document.elementFromPoint(evt.clientX, evt.clientY);
			//	_unhideGhostForTarget();
			//} else {
				target = evt.target;
			//}

			target = finder.closest(target, this.options.draggable, this.el, false);
			if (_alignedSilent) return;
			if (!dragEl || dragEl.parentNode !== this.el) return;

			var children = this.el.children;
			for (var i = 0; i < children.length; i++) {
				// Don't change for target in case it is changed to aligned before onDragOver is fired
				if (finder.closest(children[i], this.options.draggable, this.el, false) && children[i] !== target) {
					children[i].sortableMouseAligned = containers._isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
				}
			}
			// Used for nulling last target when not in element, nothing to do with checking if aligned
			if (!finder.closest(target, this.options.draggable, this.el, true)) {
				lastTarget = null;
			}

			_alignedSilent = true;
			setTimeout(function() {
				_alignedSilent = false;
			}, 30);

		},

		_getDirection: function(evt, target) {
			var  dragEl = dnd.dragEl;

			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl,ghoster.ghostEl) : this.options.direction;
		},


		// handle moudedown event
		_onTapStart: function (/** Event|TouchEvent */evt) {
			//if (!evt.cancelable) return;
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && ((evt.path && evt.path[0]) || (evt.composedPath && evt.composedPath()[0])) || target,
				filter = options.filter,
				startIndex,
				startDraggableIndex;

			_saveInputCheckedState(el);

			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dnd.dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button and enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = finder.closest(target, options.draggable, el, false);


			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			log("_onTapStart",target.tagName+","+target.className);

			// Get the index of the dragged element within its parent
			startIndex = containers._index(target);
			startDraggableIndex = containers._index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					dnd._dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = finder.closest(originalTarget, criteria.trim(), el, false);

					if (criteria) {
						dnd._dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.cancelable && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !finder.closest(originalTarget, options.handle, el, false)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex, startDraggableIndex);
		},


		_handleAutoScroll: function(evt, fallback) {

			if (!dnd.dragEl || !this.options.scroll) return;

			return autoscroll._handleAutoScroll(evt,this.options,fallback);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex, /** Number */startDraggableIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn,
				dragEl = dnd.dragEl;
			log("_prepareDragStart","start");
			if (target && !dragEl && (target.parentNode === el)) {
				rootEl = el;
				dragEl = dnd.dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;
				oldDraggableIndex = startDraggableIndex;

				tapEvt = {
					target: dragEl,
					clientX: (touch || evt).clientX,
					clientY: (touch || evt).clientY
				};

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';
				// undo animation if needed
				dragEl.style.transition = '';
				dragEl.style.transform = '';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDragEvents();

					if (!FireFox && _this.nativeDraggable) {
						dragEl.draggable = true;
					}

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					dnd._dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex);

					// Chosen item
					styler.toggleClass(dragEl, options.chosenClass, true);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				dnd.prepare(this);

				eventer.on(ownerDocument, 'mouseup', _this._onDrop);
				///eventer.on(ownerDocument, 'touchend', _this._onDrop);
				///eventer.on(ownerDocument, 'touchcancel', _this._onDrop);

				// Make dragEl draggable (must be before delay for FireFox)
				if (FireFox && this.nativeDraggable) {
					this.options.touchStartThreshold = 4;
					dragEl.draggable = true;
				}

				// Delay is impossible for native DnD in Edge or IE
				if (options.delay && (options.delayOnTouchOnly ? touch : true) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					eventer.on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					//eventer.on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					//eventer.on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					eventer.on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
					//eventer.on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
					//options.supportPointer && eventer.on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}
			}
		},

		_delayedDragTouchMoveHandler: function (/** TouchEvent|PointerEvent **/e) {
			var touch = e.touches ? e.touches[0] : e;
			if (max(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY))
					>= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))
			) {
				this._disableDelayedDrag();
			}
		},

		_disableDelayedDrag: function () {
			dnd.dragEl && _disableDraggable(dnd.dragEl);
			clearTimeout(this._dragStartTimer);

			this._disableDelayedDragEvents();
		},

		_disableDelayedDragEvents: function () {
			var ownerDocument = this.el.ownerDocument;
			eventer.off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			eventer.off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
		},

		//native dnd mode : register _OnDragStart for dragstart event handler 
		//moused dnd mode : register  _onTouchMove for mousemove event hander, _onTouchMove calls _OnDragStart
		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			log("_triggerDragStart","start");
			log("_triggerDragStart","nativeDraggable is " +  this.nativeDraggable);
			if (!this.nativeDraggable) {
				eventer.on(document, 'mousemove', this._onTouchMove);
			} else {
				eventer.on(dnd.dragEl, 'dragend', this);
				eventer.on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		//
		//
		_dragStarted: function (fallback, evt) {
			awaitingDragStarted = false;
			var dragEl = dnd.dragEl;

			if (rootEl && dragEl) {
				if (this.nativeDraggable) {
					eventer.on(document, 'dragover', this._handleAutoScroll);
					eventer.on(document, 'dragover', dnd._checkAlignment);
				}
				var options = this.options;

				// Apply effect
				!fallback && styler.toggleClass(dragEl, options.dragClass, false);
				styler.toggleClass(dragEl, options.ghostClass, true);

				// In case dragging an animated element
				styler.css(dragEl, 'transform', '');

				dnd.active = this;

				fallback && this._appendGhost();

				// Drag start event
				dnd._dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
			} else {
				this._nulling();
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt, forAutoScroll) {
			log("_onTouchMove","start");
			var ghostEl = ghoster.ghostEl;
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					matrix = ghostEl && transforms.matrix(ghostEl),
					scaleX = ghostEl && matrix && matrix.a,
					scaleY = ghostEl && matrix && matrix.d,
					relativeScrollOffset = ghoster.getRelativeScrollOffset(),
					dx = ((touch.clientX - tapEvt.clientX)
							+ fallbackOffset.x) / (scaleX || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]) : 0) / (scaleX || 1),
					dy = ((touch.clientY - tapEvt.clientY)
							+ fallbackOffset.y) / (scaleY || 1)
							+ (relativeScrollOffset ? (relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]) : 0) / (scaleY || 1),
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!dnd.active && !awaitingDragStarted) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}
					this._onDragStart(evt, true);
				}

				!forAutoScroll && this._handleAutoScroll(touch, true);

				moved = true;
				dnd.touchEvt = touch;

				if (ghostEl) {
					styler.css(ghostEl, 'webkitTransform', translate3d);
					styler.css(ghostEl, 'mozTransform', translate3d);
					styler.css(ghostEl, 'msTransform', translate3d);
					styler.css(ghostEl, 'transform', translate3d);

				}

				//evt.cancelable && evt.preventDefault();
				evt.preventDefault()
			}
		},

		_appendGhost: function () {
			// Bug if using scale(): https://stackoverflow.com/questions/2637058
			// Not being adjusted for
			var container = this.options.fallbackOnBody ? document.body : rootEl;
			return ghoster._appendGhost(dnd.dragEl,container,this.options);
		},


		_animate: function (prevRect, target) {
			var ms = this.options.animation,
				dragEl = dnd.dragEl;

			if (ms) {
				var currentRect = geom.boundingRect(target);

				if (target === dragEl) {
					realDragElRect = currentRect;
				}

				if (prevRect.nodeType === 1) {
					prevRect = geom.boundingRect(prevRect);
				}

				// Check if actually moving position
				if ((prevRect.left + prevRect.width / 2) !== (currentRect.left + currentRect.width / 2)
					|| (prevRect.top + prevRect.height / 2) !== (currentRect.top + currentRect.height / 2)
				) {
					var matrix = transforms.matrix(this.el),
						scaleX = matrix && matrix.a,
						scaleY = matrix && matrix.d;

					styler.css(target, 'transition', 'none');
					styler.css(target, 'transform', 'translate3d('
						+ (prevRect.left - currentRect.left) / (scaleX ? scaleX : 1) + 'px,'
						+ (prevRect.top - currentRect.top) / (scaleY ? scaleY : 1) + 'px,0)'
					);

					this._repaint(target);
					styler.css(target, 'transition', 'transform ' + ms + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
					styler.css(target, 'transform', 'translate3d(0,0,0)');
				}

				(typeof target.animated === 'number') && clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					styler.css(target, 'transition', '');
					styler.css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_repaint: function(target) {
			return target.offsetWidth;
		},

		_offMoveEvents: function() {
			eventer.off(document, 'dragover', dnd.nearestEmptyInsertDetectEvent);
			eventer.off(document, 'mousemove', dnd.nearestEmptyInsertDetectEvent);
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			eventer.off(ownerDocument, 'mouseup', this._onDrop);
			eventer.off(document, 'selectstart', this);
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
			var _this = this,
				dragEl = dnd.dragEl;

			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			// Setup clone
			var cloneEl = dnd.cloneEl = noder.clone(dragEl,true);

			cloneEl.draggable = false;
			cloneEl.style['will-change'] = '';

			this._hideClone();

			styler.toggleClass(cloneEl, _this.options.chosenClass, false);


			// #1143: IFrame support workaround
			_this._cloneId = _nextTick(function () {
				if (!_this.options.removeCloneOnHide) {
					rootEl.insertBefore(cloneEl, dragEl);
				}
				dnd._dispatchEvent(_this, rootEl, 'clone', dragEl);
			});


			!fallback && styler.toggleClass(dragEl, options.dragClass, true);

			// Set proper drop events
			if (fallback) {
				ignoreNextClick = true;
				_this._loopId = setInterval(dnd._emulateDragOver.bind(dnd), 50);
			} else {
				// Undo what was set in _prepareDragStart before drag started
				eventer.off(document, 'mouseup', _this._onDrop);
				///eventer.off(document, 'touchend', _this._onDrop);
				///eventer.off(document, 'touchcancel', _this._onDrop);

				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				eventer.on(document, 'drop', _this);

				// #1276 fix:
				styler.css(dragEl, 'transform', 'translateZ(0)');
			}

			awaitingDragStarted = true;

			_this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
			eventer.on(document, 'selectstart', _this);
			if (Safari) {
				styler.css(document.body, 'user-select', 'none');
			}
		},


		// Returns true - if no further action is needed (either inserted or another condition)
		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target = evt.target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = dnd.active,
				isOwner = (activeGroup === group),
				canSort = options.sort,
				_this = this,
				dragEl = dnd.dragEl,
				putSortable = dnd.putSortable;

			if (_silent) return;

			// Return invocation when dragEl is inserted (or completed)
			function completed(insertion) {
				if (insertion) {
					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(_this);
					}

					if (activeSortable) {
						// Set ghost class to new sortable's ghost class
						styler.toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
						styler.toggleClass(dragEl, options.ghostClass, true);
					}

					if (putSortable !== _this && _this !== dnd.active) {
						putSortable = dnd.putSortable = _this;
					} else if (_this === dnd.active) {
						putSortable = dnd.putSortable =  null;
					}

					// Animation
					dragRect && _this._animate(dragRect, dragEl);
					target && targetRect && _this._animate(targetRect, target);
				}


				// Null lastTarget if it is not inside a previously swapped element
				if ((target === dragEl && !dragEl.animated) || (target === el && !target.animated)) {
					lastTarget = null;
				}

				// no bubbling and not fallback
				if (!options.dragoverBubble && !evt.rootEl && target !== document) {
					_this._handleAutoScroll(evt);
					dragEl.parentNode[dnd.expando]._computeIsAligned(evt);

					// Do not detect for empty insert if already inserted
					!insertion && dnd.nearestEmptyInsertDetectEvent(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				dnd._dispatchEvent(_this, rootEl, 'change', target, el, rootEl, oldIndex, containers._index(dragEl), oldDraggableIndex, containers._index(dragEl, options.draggable), evt);
			}


			/**
			 * Gets the direction dragEl must be swapped relative to target in order to make it
			 * seem that dragEl has been "inserted" into that element's position
			 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
			 * @return {Number}                   Direction dragEl must be swapped
			 */
			function _getInsertDirection(target) {
				var dragElIndex = containers._index(dragEl),
					targetIndex = containers._index(target);

				if (dragElIndex < targetIndex) {
					return 1;
				} else {
					return -1;
				}
			}


			function _getSwapDirection(evt, target, axis, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
				var targetRect = geom.boundingRect(target),
					mouseOnAxis = axis === 'vertical' ? evt.clientY : evt.clientX,
					targetLength = axis === 'vertical' ? targetRect.height : targetRect.width,
					targetS1 = axis === 'vertical' ? targetRect.top : targetRect.left,
					targetS2 = axis === 'vertical' ? targetRect.bottom : targetRect.right,
					dragRect = geom.boundingRect(dragEl),
					invert = false;


				if (!invertSwap) {
					// Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
					if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) { // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
						// check if past first invert threshold on side opposite of lastDirection
						if (!pastFirstInvertThresh &&
							(lastDirection === 1 ?
								(
									mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2
								) :
								(
									mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2
								)
							)
						)
						{
							// past first invert threshold, do not restrict inverted threshold to dragEl shadow
							pastFirstInvertThresh = true;
						}

						if (!pastFirstInvertThresh) {
							var dragS1 = axis === 'vertical' ? dragRect.top : dragRect.left,
								dragS2 = axis === 'vertical' ? dragRect.bottom : dragRect.right;
							// dragEl shadow (target move distance shadow)
							if (
								lastDirection === 1 ?
								(
									mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
								) :
								(
									mouseOnAxis > targetS2 - targetMoveDistance
								)
							)
							{
								return lastDirection * -1;
							}
						} else {
							invert = true;
						}
					} else {
						// Regular
						if (
							mouseOnAxis > targetS1 + (targetLength * (1 - swapThreshold) / 2) &&
							mouseOnAxis < targetS2 - (targetLength * (1 - swapThreshold) / 2)
						) {
							return _getInsertDirection(target);
						}
					}
				}

				invert = invert || invertSwap;

				if (invert) {
					// Invert of regular
					if (
						mouseOnAxis < targetS1 + (targetLength * invertedSwapThreshold / 2) ||
						mouseOnAxis > targetS2 - (targetLength * invertedSwapThreshold / 2)
					)
					{
						return ((mouseOnAxis > targetS1 + targetLength / 2) ? 1 : -1);
					}
				}

				return 0;
			}

			if (evt.preventDefault !== void 0) {
				evt.cancelable && evt.preventDefault();
			}


			moved = true;

			target = finder.closest(target, options.draggable, el, true);

			// target is dragEl or target is animated
			if (dragEl.contains(evt.target) || target.animated) {
				return completed(false);
			}

			if (target !== dragEl) {
				ignoreNextClick = false;
			}

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				)
			) {
				var axis = this._getDirection(evt, target);

				dragRect = geom.boundingRect(dragEl);

				if (revert) {
					this._hideClone();
					parentEl = rootEl; // actualization

					if (nextEl) {
						rootEl.insertBefore(dragEl, nextEl);
					} else {
						rootEl.appendChild(dragEl);
					}

					return completed(true);
				}

				var elLastChild = ghoster._lastChild(el);

				if (!elLastChild || ghoster._ghostIsLast(evt, axis, el) && !elLastChild.animated) {
					// assign target only if condition is true
					if (elLastChild && el === evt.target) {
						target = elLastChild;
					}

					if (target) {
						targetRect = geom.boundingRect(target);
					}

					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(this);
					}

					if (dnd._onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
						el.appendChild(dragEl);
						parentEl = el; // actualization
						realDragElRect = null;

						changed();
						return completed(true);
					}
				}
				else if (target && target !== dragEl && target.parentNode === el) {
					var direction = 0,
						targetBeforeFirstSwap,
						aligned = target.sortableMouseAligned,
						differentLevel = dragEl.parentNode !== el,
						side1 = axis === 'vertical' ? 'top' : 'left',
						scrolledPastTop = autoscroll._isScrolledPast(target, 'top') || autoscroll._isScrolledPast(dragEl, 'top'),
						scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;


					if (lastTarget !== target) {
						lastMode = null;
						targetBeforeFirstSwap = geom.boundingRect(target)[side1];
						pastFirstInvertThresh = false;
					}

					// Reference: https://www.lucidchart.com/documents/view/10fa0e93-e362-4126-aca2-b709ee56bd8b/0
					if (
						containers._isElInRowColumn(dragEl, target, axis) && aligned ||
						differentLevel ||
						scrolledPastTop ||
						options.invertSwap ||
						lastMode === 'insert' ||
						// Needed, in the case that we are inside target and inserted because not aligned... aligned will stay false while inside
						// and lastMode will change to 'insert', but we must swap
						lastMode === 'swap'
					) {
						// New target that we will be inside
						if (lastMode !== 'swap') {
							isCircumstantialInvert = options.invertSwap || differentLevel;
						}

						direction = _getSwapDirection(evt, target, axis,
							options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold,
							isCircumstantialInvert,
							lastTarget === target);
						lastMode = 'swap';
					} else {
						// Insert at position
						direction = _getInsertDirection(target);
						lastMode = 'insert';
					}
					if (direction === 0) return completed(false);

					realDragElRect = null;
					lastTarget = target;

					lastDirection = direction;

					targetRect = geom.boundingRect(target);

					var nextSibling = target.nextElementSibling,
						after = false;

					after = direction === 1;

					var moveVector = dnd._onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						if (isOwner) {
							activeSortable._hideClone();
						} else {
							activeSortable._showClone(this);
						}

						if (after && !nextSibling) {
							el.appendChild(dragEl);
						} else {
							target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
						}

						// Undo chrome's scroll adjustment
						if (scrolledPastTop) {
							geom.scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
						}

						parentEl = dragEl.parentNode; // actualization

						// must be done before animation
						if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
							targetMoveDistance = abs(targetBeforeFirstSwap - geom.boundingRect(target)[side1]);
						}
						changed();

						return completed(true);
					}
				}

				if (el.contains(dragEl)) {
					return completed(false);
				}
			}

			return false;
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options,
				dragEl = dnd.dragEl,
				putSortable = dnd.putSortable;

			awaitingDragStarted = false;
			scrolling = false;
			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;

			clearInterval(this._loopId);

			clearInterval(pointerElemChangedInterval);
			
			autoscroll._clearAutoScrolls();
			autoscroll._cancelThrottle();

			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			eventer.off(document, 'mousemove', this._onTouchMove);


			if (this.nativeDraggable) {
				eventer.off(document, 'drop', this);
				eventer.off(el, 'dragstart', this._onDragStart);
				eventer.off(document, 'dragover', this._handleAutoScroll);
				eventer.off(document, 'dragover', dnd._checkAlignment);
			}

			if (Safari) {
				styler.css(document.body, 'user-select', '');
			}

			this._offMoveEvents();
			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.cancelable && evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghoster.ghostEl && ghoster.ghostEl.parentNode && ghoster.ghostEl.parentNode.removeChild(ghoster.ghostEl);

				if (rootEl === parentEl || (putSortable && putSortable.lastPutMode !== 'clone')) {
					// Remove clone
					dnd.cloneEl && dnd.cloneEl.parentNode && dnd.cloneEl.parentNode.removeChild(dnd.cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						eventer.off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					styler.toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					styler.toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					dnd._dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, oldDraggableIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = containers._index(dragEl);
						newDraggableIndex = containers._index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							dnd._dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// Remove event
							dnd._dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// drag from one list and drop into another
							dnd._dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							dnd._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
						}

						putSortable && putSortable.save();
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = containers._index(dragEl);
							newDraggableIndex = containers._index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								dnd._dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
								dnd._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							}
						}
					}

					if (dnd.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
							newDraggableIndex = oldDraggableIndex;
						}
						dnd._dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

						// Save sorting
						this.save();
					}
				}

			}
			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dnd.dragEl =
			parentEl =
			ghoster.ghostEl =
			nextEl =
			dnd.cloneEl =
			lastDownEl =

			scrollEl =
			autoscroll.scrollParentEl =
			autoscroll.autoScrolls.length =

			pointerElemChangedInterval =
			lastPointerElemX =
			lastPointerElemY =

			tapEvt =
			dnd.touchEvt =

			moved =
			newIndex =
			oldIndex =

			lastTarget =
			lastDirection =

			realDragElRect =

			dnd.putSortable =
			activeGroup =
			dnd.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});

			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragenter':
				case 'dragover':
					if (dnd.dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (finder.closest(el, options.draggable, this.el, false)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (finder.closest(el, this.options.draggable, rootEl, false)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return finder.closest(el, selector || this.options.draggable, this.el, false);
		},

		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[dnd.expando] = null;

			eventer.off(el, 'mousedown', this._onTapStart);


			if (this.nativeDraggable) {
				eventer.off(el, 'dragover', this);
				eventer.off(el, 'dragenter', this);
			}
			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			this._onDrop();

			dnd.sortables.splice(dnd.sortables.indexOf(this.el), 1);

			this.el = el = null;
		},

		_hideClone: function() {
			if (!dnd.cloneEl.cloneHidden) {
				styler.css(dnd.cloneEl, 'display', 'none');
				dnd.cloneEl.cloneHidden = true;
				if (dnd.cloneEl.parentNode && this.options.removeCloneOnHide) {
					dnd.cloneEl.parentNode.removeChild(dnd.cloneEl);
				}
			}
		},

		_showClone: function(putSortable) {

			if (putSortable.lastPutMode !== 'clone') {
				this._hideClone();
				return;
			}

			if (dnd.cloneEl.cloneHidden) {
				// show clone at dragEl or original position
				if (rootEl.contains(dnd.dragEl) && !this.options.group.revertClone) {
					rootEl.insertBefore(dnd.cloneEl, dnd.dragEl);
				} else if (nextEl) {
					rootEl.insertBefore(dnd.cloneEl, nextEl);
				} else {
					rootEl.appendChild(dnd.cloneEl);
				}

				if (this.options.group.revertClone) {
					this._animate(dnd.dragEl, dnd.cloneEl);
				}
				styler.css(dnd.cloneEl, 'display', '');
				dnd.cloneEl.cloneHidden = false;
			}
		}
	};


    function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
	}

	function _disableDraggable(el) {
		el.draggable = false;
	}

	function _unsilent() {
		_silent = false;
	}



	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.9.0';

	return skylark.attach("intg.Sortable",Sortable);
});
define('skylark-sortable/main',[
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
define('skylark-sortable', ['skylark-sortable/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map