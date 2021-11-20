define([
	"skylark-langx",
	"skylark-domx-finder",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"skylark-domx-noder",
	"skylark-devices-points/touch",
	"./dnd"
],function(langx,finder,styler,eventer,noder,touch,dnd){
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

	        // Bind events
            touch.mousy(el);
            eventer.on(el, 'mousedown', this._onMouseDown.bind(this));

		}

		elm() {
			return this._elm;
		}
		//drag start 
        // handle moudedown event
        _onMouseDown(/** Event|TouchEvent */evt) {
            //if (!evt.cancelable) return;
            var sortable = this.sortable,
                el = this._elm,
                options = this.options,
                preventOnFilter = options.preventOnFilter,
                type = evt.type,
                target = evt.target,
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
                    sortable._dispatchEvent(sortable, originalTarget, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
                    preventOnFilter && evt.cancelable && evt.preventDefault();
                    return; // cancel dnd
                }
            }
            else if (filter) {
                filter = filter.split(',').some(function (criteria) {
                    criteria = finder.closest(originalTarget, criteria.trim(), el, false);

                    if (criteria) {
                        sortable._dispatchEvent(sortable, criteria, 'filter', target, el, el, startIndex, undefined, startDraggableIndex);
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
                    clientX: evt.clientX,
                    clientY: evt.clientY
                };

                this._lastX = evt.clientX;
                this._lastY = evt.clientY;

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



            if (sortable.nativeDraggable) {
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

        }
	}


	return Draggable;

});