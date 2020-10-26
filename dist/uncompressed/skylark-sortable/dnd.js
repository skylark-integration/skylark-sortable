define([
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