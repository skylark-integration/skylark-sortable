define([
	"skylark-langx/langx",
	"skylark-domx-query",
	"skylark-domx-eventer",
	"skylark-domx-styler",
	"skylark-domx-transforms",
	"./ghoster",
	"./autoscroll"
],function(
	langx,
	$,
	eventer,
	styler,
	transforms,
	ghoster,
	autoscroll
){

	var MousedDragDrop = langx.Emitter.inherit({
		_construct : function(dnd) {
			this.dnd = dnd;

			var $doc = $(document);

			this.listenTo($doc,"mousemove",this._onMouseMove);
			this.listenTo($doc,"mouseup",this._onMouseUp);

		},

		_onMouseUp : function(evt) {
			var dnd = this.dnd;
        	if (dnd.putSortable) {
        		dnd.putSortable.droppable._onDrop(evt)
        	}
        	if (dnd.dragging) {
        		dnd.dragging._onDragEnd(evt);
        	}
        	ghoster.remove();
        	this.destroy();
		},

        _onMouseMove: function (/**TouchEvent*/evt) {
            //dnd.log("_onMouseMove","start");
            var dnd = this.dnd,
            	ghostEl = ghoster.ghostEl,
            	draggable = dnd.dragging,
            	dragEl = dnd.dragEl,
            	tapEvt = dnd.tapEvt;
            if (tapEvt) {
                var options =  draggable.options,
                    fallbackTolerance = options.fallbackTolerance,
                    fallbackOffset = options.fallbackOffset,
                    matrix = ghostEl && transforms.matrix(ghostEl),
                    scaleX = ghostEl && matrix && matrix.a,
                    scaleY = ghostEl && matrix && matrix.d,
                    relativeScrollOffset = ghoster.getRelativeScrollOffset(),
                    dx = ((evt.clientX - tapEvt.clientX)
                            + fallbackOffset.x) / (scaleX || 1)
                            + (relativeScrollOffset ? (relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0]) : 0) / (scaleX || 1),
                    dy = ((evt.clientY - tapEvt.clientY)
                            + fallbackOffset.y) / (scaleY || 1)
                            + (relativeScrollOffset ? (relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1]) : 0) / (scaleY || 1),
                    translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

                // only set the status to dragging, when we are actually dragging
                if (!this._dragStarted && !dnd.awaitingDragStarted) {
                    if (fallbackTolerance &&
                        Math.min( Math.abs(evt.clientX - draggable._lastX),  Math.abs(evt.clientY - draggable._lastY)) < fallbackTolerance
                    ) {
                        return;
                    }
                    draggable._onDragStart(evt, true);

                    ghoster._appendGhost(dragEl,document.body,draggable.options);

                	///dnd.ignoreNextClick = true;

                	this._dragStarted = true;
                	this._loopId = setInterval(this._emulateDragOver.bind(this), 50);

                }

                this._handleAutoScroll(evt, true);

                ///moved = true;
                ///dnd.touchEvt = touch;
                this.touchEvt = evt;

                if (ghostEl) {
                    styler.css(ghostEl, 'transform', translate3d);

                }

                //evt.cancelable && evt.preventDefault();
                evt.preventDefault()
            }
        },

		_emulateDragOver: function (forAutoScroll) {
			var dnd = this.dnd,
				dragEl = dnd.dragEl,
				///touchEvt = dnd.touchEvt;
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
						if (parent[dnd.expando]) {
							var inserted;

							inserted = parent[dnd.expando].droppable._onDragOver({
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
				///dragEl.parentNode[dnd.expando]._computeIsAligned(touchEvt);

				//_unhideGhostForTarget();
			}
		},


		_handleAutoScroll: function(evt, fallback) {
			var dnd = this.dnd;

			if (!dnd.dragEl || !dnd.active.options.scroll) return;

			return autoscroll._handleAutoScroll(evt,dnd.active.options,fallback,dnd.expando);


    	},

		destroy : function() {
			this.unlistenTo();
        	if (this._loopId) {
        		clearInterval(this._loopId);
        	}

            autoscroll._nulling();
            
            autoscroll._clearAutoScrolls();
            autoscroll._cancelThrottle();
            this._dragStarted = false;
		}
	});

	return MousedDragDrop;
});