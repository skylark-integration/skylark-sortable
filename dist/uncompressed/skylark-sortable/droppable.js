define([
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