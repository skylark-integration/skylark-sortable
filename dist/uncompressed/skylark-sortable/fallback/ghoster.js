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
    'use strict';

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

				/*
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
				*/

				styler.css(ghostEl, {
					'box-sizing': 'border-box',
					'margin': 0,
					'top': rect.top,
					'left': rect.left,
					'width': rect.width,
					'height': rect.height,
					'opacity': '0.8',
					'position': (this.PositionGhostAbsolutely ? 'absolute' : 'fixed'),
					'zIndex': '100000',
					'pointerEvents': 'none'	
				});
				container.appendChild(ghostEl);
			}
		},

		getRelativeScrollOffset : function(){
			return this.PositionGhostAbsolutely && this.ghostRelativeParent && autoscroll._getRelativeScrollOffset(this.ghostRelativeParent);
		},

		remove : function() {
			if (this.ghostEl) {
				noder.remove(this.ghostEl);
			} 
			this.ghostEl = null;

		}


	};

	return ghoster;
	
});