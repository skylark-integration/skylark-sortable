define([
	"skylark-langx/skylark",
	"skylark-langx/langx",
	"skylark-domx-query",
	"skylark-domx-browser",
	"skylark-domx-noder",
	"skylark-domx-finder",
	"skylark-domx-geom",
	"skylark-domx-styler",
	"skylark-domx-eventer",
	"./fallback/MousedDragDrop"
],function(
	skylark,
	langx,
	$,
	browser,
	noder,
	finder,
	geom,
	styler,
	eventer,
	MousedDragDrop
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

        prepare: function(sortable) {
        	this.active = sortable;
            if (!this.active.nativeDraggable) {
            	this._fallbacker = new MousedDragDrop(this);
            }

		},

        start: function(sortable, event) {
        	this.active = sortable;


			var el = this.active.elm(),
				ownerDocument = el.ownerDocument;


			//eventer.on(ownerDocument, 'dragover', this.nearestEmptyInsertDetectEvent);
			///eventer.on(ownerDocument, 'mousemove', this.nearestEmptyInsertDetectEvent);
			///eventer.on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);

			///if (this.active.nativeDraggable) {
                ///eventer.on(document, 'dragover', this._handleAutoScroll);
               // eventer.on(document, 'dragover', this._checkAlignment);
            //} else {
                ///eventer.on(document, 'mousemove', this._handleAutoScroll);
            //}
        },

        over : function(evt) {
			//this._handleAutoScroll(evt);
        },

        end: function(dropped) {
	  		//eventer.off(document, 'dragover', this.nearestEmptyInsertDetectEvent);
	  		///eventer.off(document, 'mousemove', this.nearestEmptyInsertDetectEvent);
	
			//if (this.active.nativeDraggable) {
				///eventer.off(document, 'dragover', this._handleAutoScroll);
				//eventer.off(document, 'dragover', this._checkAlignment);
			//} else {
		        // Unbind events
	            ///eventer.off(document, 'mousemove', this._onTouchMove);

			//}

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

		_checkAlignment : function(evt) {
			if (!dnd.dragEl || !dnd.dragEl.parentNode) return;
			dnd.active._computeIsAligned(evt);
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