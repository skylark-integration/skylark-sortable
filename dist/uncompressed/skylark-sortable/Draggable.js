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
    "skylark-domx-plugins",
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
    plugins,
    touch,
    autoscroll,
    containers,
    dnd,
    ghoster
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


    function _saveInputCheckedState(root) {
        savedInputChecked.length = 0;

        var inputs = root.getElementsByTagName('input');
        var idx = inputs.length;

        while (idx--) {
            var el = inputs[idx];
            el.checked && savedInputChecked.push(el);
        }
    }


    var Draggable = plugins.Plugin.inherit({
        klassName: "Draggable",
        
        pluginName : "intg.sortable.draggable",

        options : {
            draggingClass : "dragging",
            chosenClass : null

        },

        _construct: function(elm, options) {
            this.overrided(elm,options);
            var el = this._elm;

            // Setup drag mode
            this.nativeDraggable = options.nativeDraggable;
            this.sortable = options.sortable;

            if (this.nativeDraggable) {
                // Touch start threshold cannot be greater than the native dragstart threshold
                this.options.touchStartThreshold = 1;
            }


            // Bind all private methods
            for (var fn in this) {
                if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
                    this[fn] = this[fn].bind(this);
                }
            }


            // Bind events
            touch.mousy(el);
            eventer.on(el, 'mousedown', this._onTapStart);

        },

        // handle moudedown event
        _onTapStart: function (/** Event|TouchEvent */evt) {
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

            dnd.log("_onTapStart",target.tagName+","+target.className);

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
                dnd.activeGroup = this.sortable.options.group;
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

                dragStartFn = function () {
                    if ( _this.nativeDraggable) {
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
                    _find(dragEl, criteria.trim(), dnd._disableDraggable);
                });

                //eventer.on(ownerDocument, 'mouseup', _this._onDrop); // TODO : lwf
                ///eventer.on(ownerDocument, 'touchend', _this._onDrop);
                ///eventer.on(ownerDocument, 'touchcancel', _this._onDrop);

                // Make dragEl draggable (must be before delay for FireFox)
                ///if (FireFox && this.nativeDraggable) {
                if (this.nativeDraggable) {
                   this.options.touchStartThreshold = 4;
                    dragEl.draggable = true;
                }

                dragStartFn();
            }
        },

        //native dnd mode : register _OnDragStart for dragstart event handler 
        //moused dnd mode : register  _onTouchMove for mousemove event hander, _onTouchMove calls _OnDragStart
        _triggerDragStart: function (/** Event */evt, /** Touch */touch) {
            dnd.log("_triggerDragStart","start");
            dnd.log("_triggerDragStart","nativeDraggable is " +  this.nativeDraggable);

            dnd.prepare(this);

            if (!this.nativeDraggable) {
                ////eventer.on(document, 'mousemove', this._onTouchMove);
            } else {
                eventer.on(dnd.dragEl, 'dragend', this._onDragEnd);
                eventer.on(dnd.dragEl, 'dragstart', this._onDragStart);
            }

            try {
                if (document.selection) {
                    // Timeout neccessary for IE9
                    langx.defer(function () {
                        document.selection.empty();
                    });
                } else {
                    window.getSelection().removeAllRanges();
                }
            } catch (err) {
            }
        },

        _onDragStart: function (/**Event*/evt, /**boolean*/fallback) {
            var _this = this,
                dragEl = dnd.dragEl,
                rootEl = this._elm;

            var dataTransfer = evt.dataTransfer;
            var options = _this.options;

            // Setup clone
            var cloneEl = dnd.cloneEl = noder.clone(dragEl,true);

            cloneEl.draggable = false;
            cloneEl.style['will-change'] = '';

            this._hideClone();

            styler.toggleClass(cloneEl, _this.options.chosenClass, false);


            // #1143: IFrame support workaround
            _this._cloneId = langx.defer(function () {
                if (!_this.options.removeCloneOnHide) {
                    rootEl.insertBefore(cloneEl, dragEl);
                }
                dnd._dispatchEvent(_this, rootEl, 'clone', dragEl);
            });


            !fallback && styler.toggleClass(dragEl, options.dragClass, true);

            // Set proper drop events
            if (fallback) {
                dnd.ignoreNextClick = true;
                _this._loopId = setInterval(dnd._emulateDragOver.bind(dnd), 50);
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

            _this._dragStartId = langx.defer(_this._dragStarted.bind(_this, fallback, evt));
            ///eventer.on(document, 'selectstart', _this);
            ///if (Safari) {
            ///    styler.css(document.body, 'user-select', 'none');
            ///}
        },

        //
        //
        _dragStarted: function (fallback, evt) {
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

                dnd.active = this.sortable;

                fallback && this._appendGhost();

                // Drag start event
                dnd._dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex, undefined, oldDraggableIndex, undefined, evt);
            } else {
                this._nulling();
            }
        },

        _appendGhost: function () {
            // Bug if using scale(): https://stackoverflow.com/questions/2637058
            // Not being adjusted for
            var rootEl =  this.elm();
            var container = this.options.fallbackOnBody ? document.body : rootEl;
            return ghoster._appendGhost(dnd.dragEl,container,this.options);
        },



        _nulling: function() {
            lastDownEl = null;

            savedInputChecked.forEach(function (el) {
                el.checked = true;
            });


            savedInputChecked.length = 0;

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

        _onDragEnd: function (/**Event*/evt) {
            var el = this._elm,
                options = this.options,
                dragEl = dnd.dragEl,
                putSortable = dnd.putSortable;

            dnd.awaitingDragStarted = false;
            scrolling = false;
            //isCircumstantialInvert = false;
            //pastFirstInvertThresh = false;

            clearInterval(this._loopId);

            //clearInterval(pointerElemChangedInterval);
            autoscroll._nulling();
            
            autoscroll._clearAutoScrolls();
            autoscroll._cancelThrottle();

            clearTimeout(this._dragStartTimer);


            if (this._cloneId) {
                this._cloneId.stop();
                this._cloneId = null;
            }

            if (this._dragStartId) {
                this._dragStartId.stop();
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
            dnd.end();
            this._nulling();

        }

    });


    return Draggable;

});