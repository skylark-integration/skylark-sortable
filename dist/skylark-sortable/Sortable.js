/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./containers","./dnd","./ghoster","./Draggable"],function(t,e,n,o,i,r,a,s,l,d,c,h,g,p,u,f,v,b,m,_){"use strict";var x,y,k,E,C,w,D,S=!1,T=!1,P=window,I=P.document,A=P.parseInt,R=P.setTimeout,B=(P.Polymer,n&&n.ie,n&&n.edge,n&&n.firefox,n&&n.safari,o&&o.apple.device,"draggable"in I.createElement("div")&&!o.apple.device),N=(r.support.cssPointerEvents,!1),O=!1,M=function(t){function e(t,n){return function(o,i,r,a){var s=o.options.group.name&&i.options.group.name&&o.options.group.name===i.options.group.name;if(null==t&&(n||s))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(o,i,r,a),n)(o,i,r,a);var l=(n?o:i).options.group.name;return!0===t||"string"==typeof t&&t===l||t.join&&t.indexOf(l)>-1}}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n};function F(t,n){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(t);this.el=t,this.options=n=e.mixin({},n),t[b.expando]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable:/[uo]l/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(n,o,i,r){return p(t,e.mixin({excluding:[r,i]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:A(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==F.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var i in o)!(i in n)&&(n[i]=o[i]);for(var r in M(n),this)"_"===r.charAt(0)&&"function"==typeof this[r]&&(this[r]=this[r].bind(this));this.nativeDraggable=!n.forceFallback&&B,this.draggable=new _(this.el,e.mixin({nativeDraggable:this.nativeDraggable,sortable:this},this.options)),this.nativeDraggable&&(c.on(t,"dragover",this),c.on(t,"dragenter",this),c.on(t,"drop",this)),b.sortables.push(this.el),n.store&&n.store.get&&this.sort(n.store.get(this)||[]),c.on(t,"selectstart",this)}function j(){N=!1}return F.prototype={constructor:F,_computeIsAligned:function(t){var e,n=b.dragEl;if(e=t.target,e=s.closest(e,this.options.draggable,this.el,!1),!O&&n&&n.parentNode===this.el){for(var o=this.el.children,i=0;i<o.length;i++)s.closest(o[i],this.options.draggable,this.el,!1)&&o[i]!==e&&(o[i].sortableMouseAligned=v._isClientInRowColumn(t.clientX,t.clientY,o[i],this._getDirection(t,null),this.options));s.closest(e,this.options.draggable,this.el,!0)||(E=null),O=!0,R(function(){O=!1},30)}},_getDirection:function(t,e){var n=b.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,n,m.ghostEl):this.options.direction},_animate:function(t,e){var n=this.options.animation,o=b.dragEl;if(n){var i=l.boundingRect(e);if(e===o&&i,1===t.nodeType&&(t=l.boundingRect(t)),t.left+t.width/2!==i.left+i.width/2||t.top+t.height/2!==i.top+i.height/2){var r=h.matrix(this.el),a=r&&r.a,s=r&&r.d;d.css(e,"transition","none"),d.css(e,"transform","translate3d("+(t.left-i.left)/(a||1)+"px,"+(t.top-i.top)/(s||1)+"px,0)"),this._repaint(e),d.css(e,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=R(function(){d.css(e,"transition",""),d.css(e,"transform",""),e.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offUpEvents:function(){var t=this.el.ownerDocument;c.off(t,"mouseup",this._onDrop),c.off(I,"selectstart",this)},_onDragOver:function(t){var e,n,o,i=this.el,r=t.target,a=this.options,c=a.group,h=b.active,g=b.activeGroup===c,p=a.sort,u=this,_=b.dragEl,x=b.draggable.elm(),y=b.putSortable,P=b.nextEl,A=b.oldIndex,B=b.oldDraggableIndex;if(!N){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),k=!0,r=s.closest(r,a.draggable,i,!0),_.contains(t.target)||r.animated)return J(!1);if(r!==_&&(b.ignoreNextClick=!1),h&&!a.disabled&&(g?p||(o=!x.contains(_)):y===this||(this.lastPutMode=b.activeGroup.checkPull(this,h,_,t))&&c.checkPut(this,h,_,t))){var O=this._getDirection(t,r);if(e=l.boundingRect(_),o)return this._hideClone(),b.parentEl=x,P?x.insertBefore(_,P):x.appendChild(_),J(!0);var M=m._lastChild(i);if(!M||m._ghostIsLast(t,O,i)&&!M.animated){if(M&&i===t.target&&(r=M),r&&(n=l.boundingRect(r)),g?h.draggable._hideClone():h.draggable._showClone(this),!1!==b._onMove(x,i,_,e,r,n,t,!!r))return i.appendChild(_),b.parentEl=i,null,K(),J(!0)}else if(r&&r!==_&&r.parentNode===i){var F,q=0,G=r.sortableMouseAligned,H=_.parentNode!==i,L="vertical"===O?"top":"left",U=f._isScrolledPast(r,"top")||f._isScrolledPast(_,"top"),X=U?U.scrollTop:void 0;if(E!==r&&(w=null,F=l.boundingRect(r)[L],S=!1),v._isElInRowColumn(_,r,O)&&G||H||U||a.invertSwap||"insert"===w||"swap"===w?("swap"!==w&&(T=a.invertSwap||H),q=function(t,e,n,o,i,r,a){var s=l.boundingRect(e),d="vertical"===n?t.clientY:t.clientX,c="vertical"===n?s.height:s.width,h="vertical"===n?s.top:s.left,g="vertical"===n?s.bottom:s.right,p=l.boundingRect(_),u=!1;if(!r)if(a&&D<c*o){if(!S&&(1===C?d>h+c*i/2:d<g-c*i/2)&&(S=!0),S)u=!0;else if("vertical"===n?p.top:p.left,"vertical"===n?p.bottom:p.right,1===C?d<h+D:d>g-D)return-1*C}else if(d>h+c*(1-o)/2&&d<g-c*(1-o)/2)return Q(e);return(u=u||r)&&(d<h+c*i/2||d>g-c*i/2)?d>h+c/2?1:-1:0}(t,r,O,a.swapThreshold,null==a.invertedSwapThreshold?a.swapThreshold:a.invertedSwapThreshold,T,E===r),w="swap"):(q=Q(r),w="insert"),0===q)return J(!1);null,E=r,C=q,n=l.boundingRect(r);var Y=r.nextElementSibling,W=!1;W=1===q;var z=b._onMove(x,i,_,e,r,n,t,W);if(!1!==z)return 1!==z&&-1!==z||(W=1===z),N=!0,R(j,30),g?h.draggable._hideClone():h.draggable._showClone(this),W&&!Y?i.appendChild(_):r.parentNode.insertBefore(_,W?Y:r),U&&l.scrollBy(U,0,X-U.scrollTop),b.parentEl=_.parentNode,void 0===F||T||(D=Math.abs(F-l.boundingRect(r)[L])),K(),J(!0)}if(i.contains(_))return J(!1)}return!1}function J(o){return o&&(g?h.draggable._hideClone():h.draggable._showClone(u),h&&(d.toggleClass(_,y?y.options.ghostClass:h.options.ghostClass,!1),d.toggleClass(_,a.ghostClass,!0)),y!==u&&u!==b.active?y=b.putSortable=u:u===b.active&&(y=b.putSortable=null),e&&u._animate(e,_),r&&n&&u._animate(n,r)),(r===_&&!_.animated||r===i&&!r.animated)&&(E=null),a.dragoverBubble||t.rootEl||r===I||(b.over(t),_.parentNode[b.expando]._computeIsAligned(t),!o&&b.nearestEmptyInsertDetectEvent(t)),!a.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function K(){b._dispatchEvent(u,x,"change",r,i,x,A,v._index(_),B,v._index(_,a.draggable),t)}function Q(t){return v._index(_)<v._index(t)?1:-1}},_onDrop:function(t){this.el;var e=this.options,n=b.draggable.elm(),o=b.dragEl,i=b.putSortable,r=b.parentEl,a=b.oldIndex,s=b.oldDraggableIndex,l=b.nextEl;T=!1,S=!1,this.nativeDraggable&&c.off(I,"drop",this),this._offUpEvents(),t&&(k&&(t.cancelable&&t.preventDefault(),!e.dropBubble&&t.stopPropagation()),m.remove(),(n===r||i&&"clone"!==i.lastPutMode)&&b.cloneEl&&b.cloneEl.parentNode&&b.cloneEl.parentNode.removeChild(b.cloneEl),o&&(b._disableDraggable(o),o.style["will-change"]="",d.toggleClass(o,i?i.options.ghostClass:this.options.ghostClass,!1),d.toggleClass(o,this.options.chosenClass,!1),b._dispatchEvent(this,n,"unchoose",o,r,n,a,null,s,null,t),n!==r?(x=v._index(o),y=v._index(o,e.draggable),x>=0&&(b._dispatchEvent(null,r,"add",o,r,n,a,x,s,y,t),b._dispatchEvent(this,n,"remove",o,r,n,a,x,s,y,t),b._dispatchEvent(null,r,"sort",o,r,n,a,x,s,y,t),b._dispatchEvent(this,n,"sort",o,r,n,a,x,s,y,t)),i&&i.save()):o.nextSibling!==l&&(x=v._index(o),y=v._index(o,e.draggable),x>=0&&(b._dispatchEvent(this,n,"update",o,r,n,a,x,s,y,t),b._dispatchEvent(this,n,"sort",o,r,n,a,x,s,y,t))),b.active&&(null!=x&&-1!==x||(x=a,y=s),b._dispatchEvent(this,n,"end",o,r,n,a,x,s,y,t),this.save()))),this._nulling()},_nulling:function(){k=x=E=C=null},handleEvent:function(t){switch(t.type){case"drop":this._onDrop(t);break;case"dragenter":case"dragover":b.dragEl&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,r=this.options;o<i;o++)t=n[o],s.closest(t,r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||a.generateId(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];s.closest(i,this.options.draggable,n,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return s.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&M(n)},destroy:function(){var t=this.el;t[b.expando]=null,c.off(t,"mousedown",this._onTapStart),this.nativeDraggable&&(c.off(t,"dragover",this),c.off(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),b.sortables.splice(b.sortables.indexOf(this.el),1),this.el=t=null}},F.create=function(t,e){return new F(t,e)},F.version="1.9.0",t.attach("intg.Sortable",F)});
//# sourceMappingURL=sourcemaps/Sortable.js.map
