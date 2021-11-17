define([
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
	"skylark-domx-plugins-scrolls/scrolling-element",
	"skylark-domx-layouts/oriented",
    "skylark-domx-plugins-base",
	"skylark-devices-points/touch",
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
	plugins,
	touch,
	dnd
){

	'use strict';
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


    function _saveInputCheckedState(root) {
        savedInputChecked.length = 0;

        var inputs = root.getElementsByTagName('input');
        var idx = inputs.length;

        while (idx--) {
            var el = inputs[idx];
            el.checked && savedInputChecked.push(el);
        }
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


	/**
	 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
	 * @param  {HTMLElement} el       Parent element
	 * @return {HTMLElement}          The last child, ignoring ghostEl
	 */
	 function _lastChild(el) {
		/*
		var last = el.lastElementChild;

		while (last && (last === ghostEl || styler.css(last, 'display') === 'none')) {
			last = last.previousElementSibling;
		}

		return last || null;
		*/
		return finder.lastChild(el,{
			ignoreHidden : true,
			excluding : []
		})
	}

	var 
		//parentEl,
		//ghostEl,
		//cloneEl,
		///rootEl,
		///nextEl,
		//lastDownEl,

		//scrollEl,
		//scrollParentEl,
		//scrollCustomFn,

		//oldIndex,
		newIndex,
		//oldDraggableIndex,
		newDraggableIndex,

		///activeGroup,
		//putSortable,

		//awaitingDragStarted = false,
		//ignoreNextClick = false,
		//sortables = [],

		//pointerElemChangedInterval,

		//tapEvt,
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
		supportCssPointerEvents = browser.support.cssPointerEvents,

		_silent = false,
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


	/*

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


	// Fixed #973:
	eventer.on(document, 'touchmove', function(evt) {
		if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
			evt.preventDefault();
		}
	});
	*/


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


            // Bind events
            touch.mousy(el);
            eventer.on(el, 'mousedown', this._onMouseDown);


			if (this.nativeDraggable) {
				eventer.on(el, 'dragover', this);
				eventer.on(el, 'dragenter', this);
		        eventer.on(el, 'drop', this);
			}

			dnd.sortables.push(this.el);

			// Restore sorting
			options.store && options.store.get && this.sort(options.store.get(this) || []);


	        eventer.on(el, 'selectstart', this);

		},


		//drag start 
        // handle moudedown event
        _onMouseDown: function (/** Event|TouchEvent */evt) {
            //if (!evt.cancelable) return;
            var _this = this,
                el = this._elm,
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
            ///if (dnd.dragEl) {
            ///    return;
            ///}

            if (/mousedown/.test(type) && evt.button !== 0 || options.disabled) {
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

            dnd.log("_onTapStart",target.tagName+","+target.className);

            // Get the index of the dragged element within its parent
            startIndex = _index(target);
            startDraggableIndex = _index(target, options.draggable);

            // Check filter
            if (typeof filter === 'function') {
                if (filter.call(this, evt, target, this)) {
                    _this._dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
                    preventOnFilter && evt.cancelable && evt.preventDefault();
                    return; // cancel dnd
                }
            }
            else if (filter) {
                filter = filter.split(',').some(function (criteria) {
                    criteria = finder.closest(originalTarget, criteria.trim(), el, false);

                    if (criteria) {
                        _this._dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
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

        _prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex, /** Number */startDraggableIndex) {
            var _this = this,
                el = _this._elm,
                options = _this.options,
                ownerDocument = el.ownerDocument,
                dragStartFn,
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
                    clientX: (touch || evt).clientX,
                    clientY: (touch || evt).clientY
                };

                this._lastX = (touch || evt).clientX;
                this._lastY = (touch || evt).clientY;

                dragEl.style['will-change'] = 'all';
                // undo animation if needed
                dragEl.style.transition = '';
                dragEl.style.transform = '';

                // Disable "draggable"
                options.ignore.split(',').forEach(function (criteria) {
                    _find(dragEl, criteria.trim(), dnd._disableDraggable);
                });

                // Bind the events: dragstart/dragend
                ///_this._triggerDragStart(evt, touch);

                dnd.prepare(this,dnd.dragEl);

                // Drag start event
                _this._dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex);

                // Chosen item
                styler.toggleClass(dragEl, options.chosenClass, true);
            }
        },


        _onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
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
                _this._dispatchEvent(_this, rootEl, 'clone', dragEl);
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
	                this._dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
	            } else {
	                this._nulling();
	            }
	        }

            _this._dragStartId = langx.defer(_dragStarted.bind(_this, fallback, evt));
            ///eventer.on(document, 'selectstart', _this);
            ///if (Safari) {
            ///    styler.css(document.body, 'user-select', 'none');
            ///}
        },

        //
        //

        _onDragEnd: function (/**Event*/evt) {
            var el = this._elm,
                options = this.options,
                dragEl = dnd.dragEl,
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



            if (this.nativeDraggable) {
                eventer.off(dnd.dragEl, 'dragstart', this._onDragStart);
                eventer.off(dnd.dragEl, 'dragend', this._onDragEnd);
            }

            lastDownEl = null;

            savedInputChecked.forEach(function (el) {
                el.checked = true;
            });


            savedInputChecked.length = 0;

           	//this.dragEl = null;

            dnd.end();

        },


		_onMove : function (fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
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
		},

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
					children[i].sortableMouseAligned = _isClientInRowColumn(evt.clientX, evt.clientY, children[i], this._getDirection(evt, null), this.options);
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

			return (typeof this.options.direction === 'function') ? this.options.direction.call(this, evt, target, dragEl,null) : this.options.direction;
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

		//_offMoveEvents: function() {
	   //		eventer.off(document, 'dragover', dnd.nearestEmptyInsertDetectEvent);
	   //		eventer.off(document, 'mousemove', dnd.nearestEmptyInsertDetectEvent);
       //	},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			eventer.off(ownerDocument, 'mouseup', this._onDrop);
			eventer.off(document, 'selectstart', this);
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
				isOwner = (dnd.activeGroup === group),
				canSort = options.sort,
				_this = this,
				dragEl = dnd.dragEl,
				rootEl = dnd.active.elm(),
				putSortable = dnd.putSortable,
				nextEl = dnd.nextEl,
				oldIndex = dnd.oldIndex,
				oldDraggableIndex = dnd.oldDraggableIndex;
            //dnd.log("_onDragOver","start");

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
					//_this._handleAutoScroll(evt);
					dnd.over(evt);
					dragEl.parentNode[dnd.expando]._computeIsAligned(evt);

					// Do not detect for empty insert if already inserted
					!insertion && dnd.nearestEmptyInsertDetectEvent(evt);
				}

				!options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();

				return true;
			}

			// Call when dragEl has been inserted
			function changed() {
				_this._dispatchEvent(_this, rootEl, 'change', target, el, rootEl, oldIndex, _index(dragEl), oldDraggableIndex, _index(dragEl, options.draggable), evt);
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

			////if (target !== dragEl) {
			////	dnd.ignoreNextClick = false;
			////}

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
				var axis = this._getDirection(evt, target);

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
						scrolledPastTop = false, //autoscroll._isScrolledPast(target, 'top') || autoscroll._isScrolledPast(dragEl, 'top'),
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

					realDragElRect = null;
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
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options,
				rootEl = dnd.active.elm(),
				dragEl = dnd.dragEl,
				putSortable = dnd.putSortable,
				parentEl = dnd.parentEl,
				oldIndex = dnd.oldIndex,
				oldDraggableIndex = dnd.oldDraggableIndex,
				nextEl = dnd.nextEl;

			/*
			awaitingDragStarted = false;
			scrolling = false;

			clearInterval(this._loopId);

			clearInterval(pointerElemChangedInterval);
			
			autoscroll._clearAutoScrolls();
			autoscroll._cancelThrottle();

			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);
			*/

			isCircumstantialInvert = false;
			pastFirstInvertThresh = false;
			// Unbind events
			//eventer.off(document, 'mousemove', this._onTouchMove);


			if (this.nativeDraggable) {
				eventer.off(document, 'drop', this);
				///eventer.off(el, 'dragstart', this._onDragStart);
				//eventer.off(document, 'dragover', this._handleAutoScroll);
				//eventer.off(document, 'dragover', dnd._checkAlignment);
			}

			///if (Safari) {
			///	styler.css(document.body, 'user-select', '');
			///}

			//this._offMoveEvents();
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
					///if (this.nativeDraggable) {
					///	eventer.off(dragEl, 'dragend', this);
					///}

					dnd._disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class'sd
					styler.toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
					styler.toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					this._dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex, null, oldDraggableIndex, null, evt);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl);
						newDraggableIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							this._dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// Remove event
							this._dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

							// drag from one list and drop into another
							this._dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							this._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
						}

						putSortable && putSortable.save();
					}else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl);
							newDraggableIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								this._dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
								this._dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);
							}
						}
					}

					if (dnd.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
							newDraggableIndex = oldDraggableIndex;
						}
						this._dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, evt);

						// Save sorting
						this.save();
					}
				}

			}
			this._nulling();
		},

		_nulling: function() {



			/*
			dnd.rootEl =
			dnd.dragEl =
			dnd.parentEl =
			ghoster.ghostEl =
			dnd.nextEl =
			dnd.cloneEl =
			///lastDownEl =

			autoscroll.scrollEl =
			autoscroll.scrollParentEl =
			autoscroll.autoScrolls.length =
			*/
			//pointerElemChangedInterval =

			//tapEvt =
			//dnd.touchEvt =

			moved =
			newIndex =
			//dnd.oldIndex =

			lastTarget =
			lastDirection =

			realDragElRect =

			//dnd.putSortable =
			//dnd.activeGroup =
			//dnd.active = 
			null;

		},

        _hideClone: function() {
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

		handleEvent: function (/**Event*/evt) {
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

			eventer.off(el, 'mousedown', this._onTapStart);


			if (this.nativeDraggable) {
				eventer.off(el, 'dragover', this);
				eventer.off(el, 'dragenter', this);
			}
			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			dnd.sortables.splice(dnd.sortables.indexOf(this.el), 1);

			this.el = el = null;
		}
	});


    function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.cancelable && evt.preventDefault();
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