define([
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