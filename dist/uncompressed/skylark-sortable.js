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
define('skylark-langx-hoster/is-browser',[
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
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer"
],function(
	skylark,
	langx,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer
){
    'use strict';


	var expando = 'Sortable' + (new Date).getTime();


	var dnd = {
		log : function log(category,message) {
			$("#console").append("<div>"+category+":"+message+"</div>");	
		},

		expando,

		activeGroup : null,
		active : null,
		putSortable : null,
		sortables : [],


		rootEl : null,
		dragEl : null,
		cloneEl : null,
		nextEl : null,
		parentEl : null,

		oldIndex : null,


		///ignoreNextClick : false,
        awaitingDragStarted : false,
		///touchEvt : null,

        prepare: function(draggable,dragEl) {
        	this.dragging = draggable;
        	this.active = draggable.sortable;

        	this.dragEl = dragEl;
 

		},

        start: function(draggable, event) {
        	this.dragging = draggable;
        	this.active = draggable.sortable;

        },

        over : function(evt) {
			//this._handleAutoScroll(evt);
        },

        end: function(dropped) {


        	this._nulling();
 		},

		nearestEmptyInsertDetectEvent :function (evt) {
			if (dnd.dragEl) {
				///evt = evt.touches ? evt.touches[0] : evt;
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

		_disableDraggable : function (el) {
			el.draggable = false;
		},

		_nulling: function() {

			dnd.dragEl = 
			dnd.rootEl =
			dnd.parentEl =
			//ghoster.ghostEl =
			dnd.nextEl =
			dnd.cloneEl =
			///lastDownEl =


			dnd.tapEvt =
			///dnd.touchEvt =

			dnd.oldIndex =

			dnd.putSortable =
			dnd.activeGroup =
			dnd.active = null;

		}


	};


	return dnd;
	
});
define('skylark-domx-plugins-dnd/draggable',[
    "skylark-langx/langx",
    "skylark-domx-noder",
    "skylark-domx-data",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "skylark-domx-eventer",
    "skylark-domx-styler",
    "skylark-devices-points/touch",
    "skylark-domx-plugins-base",
    "./dnd",
    "./manager"
], function(langx, noder, datax, finder, geom, eventer, styler, touch, plugins, dnd,manager) {
    var on = eventer.on,
        off = eventer.off,
        attr = datax.attr,
        removeAttr = datax.removeAttr,
        offset = geom.pagePosition,
        addClass = styler.addClass,
        height = geom.height;



    var Draggable = plugins.Plugin.inherit({
        klassName: "Draggable",
        
        pluginName : "lark.dnd.draggable",

        options : {
            draggingClass : "dragging",
            forceFallback : false
        },

        _construct: function(elm, options) {
            this.overrided(elm,options);

            var self = this,
                options = this.options;

            self.draggingClass = options.draggingClass;

            ["preparing", "started", "ended", "moving"].forEach(function(eventName) {
                if (langx.isFunction(options[eventName])) {
                    self.on(eventName, options[eventName]);
                }
            });

            touch.mousy(elm);

            eventer.on(elm, {
                "mousedown": function(e) {
                    var options = self.options;
                    if (options.handle) {
                        self.dragHandle = finder.closest(e.target, options.handle,self._elm);
                        if (!self.dragHandle) {
                            return;
                        }
                    }
                    if (options.source) {
                        self.dragSource = finder.closest(e.target, options.source,self._elm);
                    } else {
                        self.dragSource = self._elm;
                    }

                    self.startPos = {
                        x : e.clientX,
                        y : e.clientY
                    };

                    manager.prepare(self,e);

                },

                "mouseup": function(e) {
                    ///if (self.dragSource) {
                    ///    //datax.attr(self.dragSource, "draggable", 'false');
                    ///    self.dragSource = null;
                    ///    self.dragHandle = null;
                    ///}
                },

                "dragstart": function(e) {
                    manager.start(self, e);
                },

                "dragend": function(e) {
                    eventer.stop(e);

                    if (!manager.dragging) {
                        return;
                    }

                    manager.end(false);
                }
            });

        }

    });

    plugins.register(Draggable,"draggable");

    return dnd.Draggable = Draggable;
});
define('skylark-sortable/draggable',[
	"skylark-langx",
	"skylark-domx-finder",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-noder",
    "skylark-domx-plugins-dnd/draggable",
	"./dnd"
],function(langx,finder,styler,eventer,noder,DndDraggable,dnd){
    var 
        lastDownEl,
        scrolling,

        savedInputChecked = [];

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
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		return finder.index(el,function(el){
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== dnd.cloneEl && (!selector || finder.matches(el, selector))) {
				return true;
			}

			return false;			
		})
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

	class Draggable {
		constructor(sortable,options) {
            this.sortable = sortable;
            var el = this._elm = sortable.elm();
            this.options = options;

            var self = this;

            this._dndDraggable = new DndDraggable(el,{
                forceFallback : this.options.forceFallback,
                source : this.options.draggable,
                handle : this.options.handle,
                preparing : function(e) {
                    self._onPrepare(e);
                },

                started: function(e) {
                    self._onDragStart(e.originalEvent);
                },

                ended : function(e) {
                    self._onDragEnd(e.originalEvent);
                }
            });
		}

		elm() {
			return this._elm;
		}
        // handle moudedown event
        _onPrepare(evt) {
            var sortable = this.sortable,
                el = this._elm,
                options = this.options,
                preventOnFilter = options.preventOnFilter,
                target = evt.dragSource,
                filter = options.filter,
                startIndex,
                startDraggableIndex;

            _saveInputCheckedState(el);


            if (lastDownEl === target) {
                evt.dragSource = null;
                return;
            }

            dnd.log("_onTapStart",target.tagName+","+target.className);

            // Get the index of the dragged element within its parent
            startIndex = _index(target);
            startDraggableIndex = _index(target, options.draggable);

            // Check filter
            if (typeof filter === 'function') {
                if (filter.call(this, evt, target, this)) {
                    sortable._dispatchEvent(sortable, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
                    if (preventOnFilter) {
                        evt.preventDefault = true;
                    }
                    evt.dragSource = null;
                    return; // cancel dnd
                }
            }
            else if (filter) {
                filter = filter.split(',').some(function (criteria) {
                    criteria = finder.closest(originalTarget, criteria.trim(), el, false);

                    if (criteria) {
                        sortable._dispatchEvent(sortable, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
                        evt.dragSource = null;
                        return; // cancel dnd
                    }
                });

                if (filter) {
                    if (preventOnFilter) {
                        evt.preventDefault = true;
                    }
                    evt.dragSource = null;
                    return; // cancel dnd
                }
            }

            ///if (options.handle && !finder.closest(originalTarget, options.handle, el, false)) {
            ///    return;
            ///}

            // Prepare `dragstart`
            var
                ownerDocument = el.ownerDocument,
                dragEl = dnd.dragEl,
                rootEl,
                parentEl = dnd.parentEl,
                nextEl = dnd.nextEl,
                oldIndex = dnd.oldIndex,
                oldDraggableIndex = dnd.oldDraggableIndex,
                tapEvt = dnd.tapEvt;

            dnd.log("_prepareDragStart","start");
            if (target && !dragEl && (target.parentNode === el)) {
                rootEl = el;
                dragEl = dnd.dragEl = target;
                parentEl = dnd.parentEl= dragEl.parentNode;
                nextEl = dnd.nextEl = dragEl.nextSibling;
                lastDownEl = target;
                dnd.activeGroup = this.options.group;
                oldIndex = dnd.oldIndex = startIndex;
                oldDraggableIndex = dnd.oldDraggableIndex =  startDraggableIndex;

                tapEvt = dnd.tapEvt = {
                    target: dragEl,
                    clientX: evt.originalEvent.clientX,
                    clientY: evt.originalEvent.clientY
                };

                this._lastX = evt.originalEvent.clientX;
                this._lastY = evt.originalEvent.clientY;

                dragEl.style['will-change'] = 'all';
                // undo animation if needed
                dragEl.style.transition = '';
                dragEl.style.transform = '';

                // Disable "draggable"
                options.ignore.split(',').forEach(function (criteria) {
                    _find(dragEl, criteria.trim(), dnd._disableDraggable);
                });

                // Bind the events: dragstart/dragend
                ///sortable._triggerDragStart(evt, touch);

                dnd.prepare(this,dnd.dragEl);

                // Drag start event
                sortable._dispatchEvent(sortable, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex);

                // Chosen item
                styler.toggleClass(dragEl, options.chosenClass, true);
            }
        }


        _onDragStart(/**Event*/evt, /**boolean*/fallback) {
            dnd.log("_onDragStart","start");
            var _this = this,
                dragEl = dnd.dragEl,
                rootEl = this._elm;

            var dataTransfer = evt.dataTransfer;
            var options = _this.options;

            // Setup clone
            var cloneEl = dnd.cloneEl = noder.clone(dragEl,true);

            cloneEl.draggable = false;
            cloneEl.style['will-change'] = '';

            //this._hideClone();

            styler.toggleClass(cloneEl, _this.options.chosenClass, false);


            // #1143: IFrame support workaround
            _this._cloneId = langx.defer(function () {
                if (!_this.options.removeCloneOnHide) {
                    rootEl.insertBefore(cloneEl, dragEl);
                }
                _this.sortable._dispatchEvent(_this, rootEl, 'clone', dragEl);
            });


            if (!fallback){
                styler.toggleClass(dragEl, options.dragClass, true);
            } 

            // Set proper drop events
            if (fallback) {
                //dnd.ignoreNextClick = true;
                //_this._loopId = setInterval(dnd._emulateDragOver.bind(dnd), 50);
            } else {
                // Undo what was set in _prepareDragStart before drag started
                //eventer.off(document, 'mouseup', _this._onDrop); //TODO : lwf
                ///eventer.off(document, 'touchend', _this._onDrop);
                ///eventer.off(document, 'touchcancel', _this._onDrop);

                if (dataTransfer) {
                    dataTransfer.effectAllowed = 'move';
                    options.setData && options.setData.call(_this, dataTransfer, dragEl);
                }

                ////eventer.on(document, 'drop', _this);

                // #1276 fix:
                styler.css(dragEl, 'transform', 'translateZ(0)');
            }

            dnd.awaitingDragStarted = true;


	        function _dragStarted(fallback, evt) {
	            dnd.awaitingDragStarted = false;
	            var dragEl = dnd.dragEl,
	                rootEl = this._elm,
	                oldIndex = dnd.oldIndex,
	                oldDraggableIndex = dnd.oldDraggableIndex;

	            if (rootEl && dragEl) {
	                //if (this.nativeDraggable) {
	                //    eventer.on(document, 'dragover', this._handleAutoScroll);
	                //    eventer.on(document, 'dragover', dnd._checkAlignment);
	                //}
	                dnd.start(this);
	                var options = this.options;

	                // Apply effect
	                !fallback && styler.toggleClass(dragEl, options.dragClass, false);
	                styler.toggleClass(dragEl, options.ghostClass, true);

	                // In case dragging an animated element
	                styler.css(dragEl, 'transform', '');

	                //dnd.active = this;

	                //fallback && this._appendGhost();

	                // Drag start event
	                this.sortable._dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
	            } else {
	                this._nulling();
	            }
	        }

            _this._dragStartId = langx.defer(_dragStarted.bind(_this, fallback, evt));
            ///eventer.on(document, 'selectstart', _this);
            ///if (Safari) {
            ///    styler.css(document.body, 'user-select', 'none');
            ///}
        }

        //
        //

        _onDragEnd(/**Event*/evt) {
            var el = this._elm,
                options = this.options,
                dragEl = dnd.dragEl,
                sortable = this.sortable,
                putSortable = dnd.putSortable;

            dnd.awaitingDragStarted = false;
            scrolling = false;
            //isCircumstantialInvert = false;
            //pastFirstInvertThresh = false;

            //clearInterval(this._loopId);

            //clearInterval(pointerElemChangedInterval);

            clearTimeout(this._dragStartTimer);


            if (this._cloneId) {
                this._cloneId.cancel();
                this._cloneId = null;
            }

            if (this._dragStartId) {
                this._dragStartId.cancel();
                this._dragStartId = null;
            }


            // Unbind events
            ///eventer.off(document, 'mousemove', this._onTouchMove);



            ///if (Safari) {
            ///    styler.css(document.body, 'user-select', '');
           /// }


            lastDownEl = null;

            savedInputChecked.forEach(function (el) {
                el.checked = true;
            });


            savedInputChecked.length = 0;

           	//this.dragEl = null;

            dnd.end();


        }

	}


	return Draggable;

});
define('skylark-domx-plugins-dnd/droppable',[
    "skylark-langx/langx",
    "skylark-domx-noder",
    "skylark-domx-data",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "skylark-domx-eventer",
    "skylark-domx-styler",
    "skylark-domx-plugins-base",
    "./dnd",
    "./manager"
], function(langx, noder, datax, finder, geom, eventer, styler, plugins, dnd,manager) {
    var on = eventer.on,
        off = eventer.off,
        attr = datax.attr,
        removeAttr = datax.removeAttr,
        offset = geom.pagePosition,
        addClass = styler.addClass,
        height = geom.height;


    var Droppable = plugins.Plugin.inherit({
        klassName: "Droppable",

        pluginName : "lark.dnd.droppable",

        options : {
            draggingClass : "dragging"
        },

        _construct: function(elm, options) {
            this.overrided(elm,options);

            var self = this,
                options = self.options,
                draggingClass = options.draggingClass,
                hoverClass,
                activeClass,
                acceptable = true;

            ["started", "entered", "leaved", "dropped", "overing"].forEach(function(eventName) {
                if (langx.isFunction(options[eventName])) {
                    self.on(eventName, options[eventName]);
                }
            });

            eventer.on(elm, {
                "dragover": function(e) {
                    e.stopPropagation()

                    if (!acceptable) {
                        return
                    }

                    var e2 = eventer.create("overing", {
                        originalEvent : e,
                        overElm: e.target,
                        transfer: manager.draggingTransfer,
                        acceptable: true
                    });
                    self.trigger(e2);

                    if (e2.acceptable) {
                        e.preventDefault() // allow drop

                        ///e.dataTransfer.dropEffect = "copyMove";
                    }

                },

                "dragenter": function(e) {
                    var options = self.options,
                        elm = self._elm;

                    var e2 = eventer.create("entered", {
                        originalEvent : e,
                        transfer: manager.draggingTransfer
                    });

                    self.trigger(e2);

                    e.stopPropagation()

                    if (hoverClass && acceptable) {
                        styler.addClass(elm, hoverClass)
                    }
                },

                "dragleave": function(e) {
                    var options = self.options,
                        elm = self._elm;
                    if (!acceptable) return false

                    var e2 = eventer.create("leaved", {
                        originalEvent : e,
                        transfer: manager.draggingTransfer
                    });

                    self.trigger(e2);

                    e.stopPropagation()

                    if (hoverClass && acceptable) {
                        styler.removeClass(elm, hoverClass);
                    }
                },

                "drop": function(e) {
                    var options = self.options,
                        elm = self._elm;

                    eventer.stop(e); // stops the browser from redirecting.

                    if (!manager.dragging) return

                    // manager.dragging.elm.removeClass('dragging');

                    if (hoverClass && acceptable) {
                        styler.addClass(elm, hoverClass)
                    }

                    var e2 = eventer.create("dropped", {
                        originalEvent : e,
                        transfer: manager.draggingTransfer
                    });

                    self.trigger(e2);

                    manager.end(true)
                }
            });

            manager.on("dndStarted", function(e) {
                var e2 = eventer.create("started", {
                    transfer: manager.draggingTransfer,
                    acceptable: false
                });

                self.trigger(e2);

                acceptable = e2.acceptable;
                hoverClass = e2.hoverClass;
                activeClass = e2.activeClass;

                if (activeClass && acceptable) {
                    styler.addClass(elm, activeClass);
                }

            }).on("dndEnded", function(e) {
                var e2 = eventer.create("ended", {
                    transfer: manager.draggingTransfer,
                    acceptable: false
                });

                self.trigger(e2);

                if (hoverClass && acceptable) {
                    styler.removeClass(elm, hoverClass);
                }
                if (activeClass && acceptable) {
                    styler.removeClass(elm, activeClass);
                }

                acceptable = false;
                activeClass = null;
                hoverClass = null;
            });

        }
    });

    plugins.register(Droppable,"droppable");

    return dnd.Droppable = Droppable;
});
define('skylark-sortable/droppable',[
	"skylark-langx",
	"skylark-domx-finder",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-noder",
	"skylark-domx-geom",
    "skylark-domx-plugins-dnd/droppable",
	"./dnd"
],function(langx,finder,styler,eventer,noder,geom,DndDroppable,dnd){

	var	moved,
	    pastFirstInvertThresh,
	    isCircumstantialInvert,
   		_silent = false;


	/**
	 * Checks if a side of an element is scrolled past a side of it's parents
	 * @param  {HTMLElement}  el       The element who's side being scrolled out of view is in question
	 * @param  {String}       side     Side of the element in question ('top', 'left', 'right', 'bottom')
	 * @return {HTMLElement}           The parent scroll element that the el's side is scrolled past, or null if there is no such element
	 */
	function _isScrolledPast(el, side) {
		var parent = finder.scrollableParent(el, true),
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

			if (parent === noder.scrollingElement()) break;

			parent = finder.scrollableParent(parent, false);
		}

		return false;
	}


	function _unsilent() {
		_silent = false;
	}


	/**
	 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
	 * @param  {HTMLElement} el       Parent element
	 * @return {HTMLElement}          The last child, ignoring ghostEl
	 */
	 function _lastChild(el) {
		return finder.lastChild(el,{
			ignoreHidden : true,
			excluding : []
		})
	}

	 function _ghostIsLast(evt, axis, el) {
		var elRect = geom.boundingRect(finder.lastChild(el,{ignoreHidden : true,excluding : []})),
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
	}


	function _isClientInRowColumn(x, y, el, axis, options) {
		var targetRect = geom.boundingRect(el),
			targetS1Opp = axis === 'vertical' ? targetRect.left : targetRect.top,
			targetS2Opp = axis === 'vertical' ? targetRect.right : targetRect.bottom,
			mouseOnOppAxis = axis === 'vertical' ? x : y;

		return targetS1Opp < mouseOnOppAxis && mouseOnOppAxis < targetS2Opp;
	}

	function _isElInRowColumn(el1, el2, axis) {
		//var dragEl = dnd.active.dragEl;

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
	}


	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		return finder.index(el,function(el){
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== dnd.cloneEl && (!selector || finder.matches(el, selector))) {
				return true;
			}

			return false;			
		})
	}	

    function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
	}

	class Droppable {
		constructor(sortable,options) {
			this.sortable = sortable;
			var el = this.el= this._elm = sortable.elm();
			this.options = options;


			var self = this;

            this._dndDroppable = new DndDroppable(el,{
	            started: function(e) {
	                e.acceptable = true;
	                e.activeClass = "active";
	                e.hoverClass = "over";
	            },

                overing : function(e) {
					if (dnd.dragEl) {
						self._onDragOver(e.originalEvent);
						_globalDragOver(e.originalEvent);
					}
                },


                dropped : function(e) {
                    self._onDrop(e.originalEvent);
                }
            });



			///if (sortable.nativeDraggable) {
			///	eventer.on(el, 'dragover', this);
			///	eventer.on(el, 'dragenter', this);
		        eventer.on(el, 'drop', this);
			///}
	        eventer.on(el, 'selectstart', this);
		}


		_onMove (fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
			var evt,
				sortable = fromEl[dnd.expando],
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
		}


		// Returns true - if no further action is needed (either inserted or another condition)
		_onDragOver(/**Event*/evt) {
			var el = this._elm,
				target = evt.target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = dnd.active,
				isOwner = (dnd.activeGroup === group),
				canSort = options.sort,
				sortable = this.sortable,
				dragEl = dnd.dragEl,
				rootEl = dnd.active.elm(),
				putSortable = dnd.putSortable,
				nextEl = dnd.nextEl,
				oldIndex = dnd.oldIndex,
				oldDraggableIndex = dnd.oldDraggableIndex,

				lastMode, // 'swap' or 'insert'
				lastTarget,
				lastDirection,
				targetMoveDistance;
            //dnd.log("_onDragOver","start");

			if (_silent) return;

			// Return invocation when dragEl is inserted (or completed)
			function completed(insertion) {
				if (insertion) {
					if (isOwner) {
						activeSortable._hideClone();
					} else {
						activeSortable._showClone(sortable);
					}

					if (activeSortable) {
						// Set ghost class to new sortable's ghost class
						styler.toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
						styler.toggleClass(dragEl, options.ghostClass, true);
					}

					if (putSortable !== sortable && sortable !== dnd.active) {
						putSortable = dnd.putSortable = sortable;
					} else if (sortable === dnd.active) {
						putSortable = dnd.putSortable =  null;
					}

					// Animation
					dragRect && sortable._animate(dragRect, dragEl);
					target && targetRect && sortable._animate(targetRect, target);
				}


				// Null lastTarget if it is not inside a previously swapped element
				if ((target === dragEl && !dragEl.animated) || (target === el && !target.animated)) {
					lastTarget = null;
				}

				// no bubbling and not fallback
				if (!options.dragoverBubble && !evt.rootEl && target !== document) {
					//sortable._handleAutoScroll(evt);
					dnd.over(evt);

					// Do not detect for empty insert if already inserted
					!insertion && dnd.nearestEmptyInsertDetectEvent(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				sortable._dispatchEvent(sortable, rootEl, 'change', target, el, rootEl, oldIndex, _index(dragEl), oldDraggableIndex, _index(dragEl, options.draggable), evt);
			}


			/**
			 * Gets the direction dragEl must be swapped relative to target in order to make it
			 * seem that dragEl has been "inserted" into that element's position
			 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
			 * @return {Number}                   Direction dragEl must be swapped
			 */
			function _getInsertDirection(target) {
				var dragElIndex = _index(dragEl),
					targetIndex = _index(target);

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

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(this.lastPutMode = dnd.activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				)
			) {
				var axis = sortable._getDirection(evt, target);

				dragRect = geom.boundingRect(dragEl);

				if (revert) {
					this._hideClone();
					dnd.parentEl = rootEl; // actualization

					if (nextEl) {
						rootEl.insertBefore(dragEl, nextEl);
					} else {
						rootEl.appendChild(dragEl);
					}

					return completed(true);
				}

				var elLastChild = _lastChild(el);

				if (!elLastChild || _ghostIsLast(evt, axis, el) && !elLastChild.animated) {
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

					if (this._onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
						el.appendChild(dragEl);
						dnd.parentEl = el; // actualization
						///realDragElRect = null;

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
						scrolledPastTop = _isScrolledPast(target, 'top') || _isScrolledPast(dragEl, 'top'),
						scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;


					if (lastTarget !== target) {
						lastMode = null;
						targetBeforeFirstSwap = geom.boundingRect(target)[side1];
						pastFirstInvertThresh = false;
					}

					// Reference: https://www.lucidchart.com/documents/view/10fa0e93-e362-4126-aca2-b709ee56bd8b/0
					if (
						_isElInRowColumn(dragEl, target, axis) && aligned ||
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

					///realDragElRect = null;
					lastTarget = target;

					lastDirection = direction;

					targetRect = geom.boundingRect(target);

					var nextSibling = target.nextElementSibling,
						after = false;

					after = direction === 1;

					var moveVector = this._onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

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

						dnd.parentEl = dragEl.parentNode; // actualization

						// must be done before animation
						if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
							targetMoveDistance =  Math.abs(targetBeforeFirstSwap - geom.boundingRect(target)[side1]);
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
		}

		_onDrop(/**Event*/evt) {
			var el = this.el,
				options = this.options,
				sortable = this.sortable,
				rootEl = dnd.active.elm(),
				dragEl = dnd.dragEl,
				putSortable = dnd.putSortable,
				parentEl = dnd.parentEl,
				oldIndex = dnd.oldIndex,
				oldDraggableIndex = dnd.oldDraggableIndex,
				nextEl = dnd.nextEl,
				newIndex,
				newDraggableIndex;


			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;


			if (sortable.nativeDraggable) {
				eventer.off(document, 'drop', this);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.cancelable && evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				//ghoster.remove();

				if (rootEl === parentEl || (putSortable && putSortable.lastPutMode !== 'clone')) {
					// Remove clone
					noder.remove(dnd.cloneEl);
				}

				if (dragEl) {

					dnd._disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class'sd
					styler.toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					styler.toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					sortable._dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, oldDraggableIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);
						newDraggableIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							sortable._dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// Remove event
							sortable._dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// drag from one list and drop into another
							sortable._dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							sortable._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
						}

						putSortable && putSortable.save();
					}else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);
							newDraggableIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								sortable._dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
								sortable._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							}
						}
					}

					if (dnd.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
							newDraggableIndex = oldDraggableIndex;
						}
						sortable._dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

						// Save sorting
						sortable.save();
					}
				}

			}
			this._nulling();
		}

		_offUpEvents () {
			var ownerDocument = this.el.ownerDocument;

			eventer.off(ownerDocument, 'mouseup', this._onDrop);
			eventer.off(document, 'selectstart', this);
		}

		_nulling() {

			moved =	null;

		}

		handleEvent (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
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
		}

		destroy() {
			var sortable = this.sortable;

			///if (sortable.nativeDraggable) {
			///	eventer.off(el, 'dragover', this);
		   ///		eventer.off(el, 'dragenter', this);
			///}
			his._dndDroppable.destroy();
		}


	}

	return Droppable;
});
define('skylark-sortable/Sortable',[
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-langx-hoster/is-browser",
	"skylark-langx-hoster/is-mobile",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-transforms",
	"skylark-domx-layouts/oriented",
    "skylark-domx-plugins-base",
	"skylark-devices-points/touch",
	"./dnd",
	"./draggable",
	"./droppable"
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
	oriented,
	plugins,
	touch,
	dnd,
	Draggable,
	Droppable
){

	'use strict';


	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		return finder.index(el,function(el){
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && el !== dnd.cloneEl && (!selector || finder.matches(el, selector))) {
				return true;
			}

			return false;			
		})
	}





	var 

		///realDragElRect, // dragEl rect after current animation

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


		IE11OrLess = isBrowser && isBrowser.ie,
		Edge = isBrowser && isBrowser.edge,
		FireFox = isBrowser && isBrowser.firefox,
		Safari = isBrowser && isBrowser.safari,

		IOS = isMobile && isMobile.apple.device,

		// This will not pass for IE9, because IE9 DnD only works on anchors
		supportDraggable = ('draggable' in document.createElement('div')) && !isMobile.apple.device,


		supportCssPointerEvents = browser.support.cssPointerEvents,

		_alignedSilent = false,

		//savedInputChecked = [],


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
		};


	var Sortable =  plugins.Plugin.inherit({
        klassName: "Sortable",
        
        pluginName : "intg.sortable",


		options : {
			group: null,
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			bubbleScroll: true,
			//draggable: /[uo]l/i.test(el.nodeName) ? '>li' : '>*',
			swapThreshold: 1, // percentage; 0 <= x <= 1
			invertSwap: false, // invert always
			invertedSwapThreshold: null, // will be set to same as swapThreshold if default
			removeCloneOnHide: true,
			direction: function(evt, target, dragEl,ghostEl) {
				return oriented(this.el, langx.mixin({
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


			fallbackOnBody: true,  //fix

			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			//supportPointer: Sortable.supportPointer !== false && ('PointerEvent' in window),
			emptyInsertThreshold: 5
		},


		/**
		 * @class  Sortable
		 * @param  {HTMLElement}  el
		 * @param  {Object}       [options]
		 */
		_construct : function Sortable(el, options) {
            this.overrided(el,options);

			this.el = el; // root element

			// Export instance
			el[dnd.expando] = this;

			options = this.options;

			options.draggable = options.draggable || /[uo]l/i.test(el.nodeName) ? '>li' : '>*';


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



			dnd.sortables.push(this.el);

			// Restore sorting
			options.store && options.store.get && this.sort(options.store.get(this) || []);


			this.draggable = new Draggable(this,this.options);

			this.droppable = new Droppable(this,this.options);

		},

		_getDirection: function(evt, target) {
			var  dragEl = dnd.dragEl;

			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl,null) : this.options.direction;
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation,
				dragEl = dnd.dragEl;

			if (ms) {
				var currentRect = geom.boundingRect(target);

				////if (target === dragEl) {
				///	realDragElRect = currentRect;
				///}

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

					noder.reflow(target);
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

        _hideClone: function() {
        	return;
            if (!dnd.cloneEl.cloneHidden) {
                styler.hide(dnd.cloneEl);
                dnd.cloneEl.cloneHidden = true;
                if (dnd.cloneEl.parentNode && this.options.removeCloneOnHide) {
                    noder.remove(dnd.cloneEl);
                }
            }
        },

        _showClone: function(putSortable) {
            var rootEl = dnd.active.el,
                nextEl = dnd.nextEl;

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
                styler.show(dnd.cloneEl);
                dnd.cloneEl.cloneHidden = false;
            }
        },

		_dispatchEvent : function (
			sortable, 
			rootEl, 
			name,
			targetEl, 
			toEl, 
			fromEl,
			startIndex, 
			newIndex,
			startDraggableIndex, 
			newDraggableIndex,
			originalEvt
		) {
			sortable = (sortable || rootEl[dnd.expando]);
			var evt,
				options = sortable.options,
				onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1),
				putSortable = dnd.putSortable;

			evt = eventer.create(name,{
				to : toEl || rootEl,
				from : fromEl || rootEl,
				item : targetEl || rootEl,
				clone : dnd.cloneEl,
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
					order.push(el.getAttribute(options.dataIdAttr) || noder.generateId(el));
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


			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			dnd.sortables.splice(dnd.sortables.indexOf(this.el), 1);

			this.el = el = null;
		}
	});





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
define('skylark-sortable', ['skylark-sortable/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map
