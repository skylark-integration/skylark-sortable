/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/is-browser","skylark-langx-hoster/is-mobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-plugins-scrolls/scrolling-element","skylark-domx-layouts/oriented","skylark-domx-plugins-base","skylark-devices-points/touch","./dnd"],function(t,e,n,o,i,a,r,l,s,d,c,h,g,u,p,f,v){"use strict";var b,m=[];function E(t,e){return l.index(t,function(t){return!("TEMPLATE"===t.nodeName.toUpperCase()||t===v.cloneEl||e&&!l.matches(t,e))})}var _,x,y,C,k,D,w,S=!1,I=!1,T=window,P=T.document,R=T.parseInt,A=T.setTimeout,N=(T.Polymer,n&&n.ie,n&&n.edge,n&&n.firefox,n&&n.safari,o&&o.apple.device,"draggable"in P.createElement("div")&&!o.apple.device),M=(a.support.cssPointerEvents,!1),B=!1,O=function(t){function e(t,n){return function(o,i,a,r){var l=o.options.group.name&&i.options.group.name&&o.options.group.name===i.options.group.name;if(null==t&&(n||l))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(o,i,a,r),n)(o,i,a,r);var s=(n?o:i).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var n={},o=t.group;o&&"object"==typeof o||(o={name:o}),n.name=o.name,n.checkPull=e(o.pull,!0),n.checkPut=e(o.put),n.revertClone=o.revertClone,t.group=n},H=p.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(t,n,o,i){return u(this.el,e.mixin({excluding:[i,o]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:R(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(t,e){for(var n in this.overrided(t,e),this.el=t,t[v.expando]=this,(e=this.options).draggable=e.draggable||/[uo]l/i.test(t.nodeName)?">li":">*",O(e),this)"_"===n.charAt(0)&&"function"==typeof this[n]&&(this[n]=this[n].bind(this));this.nativeDraggable=!e.forceFallback&&N,this.nativeDraggable&&(this.options.touchStartThreshold=1),f.mousy(t),c.on(t,"mousedown",this._onMouseDown),this.nativeDraggable&&(c.on(t,"dragover",this),c.on(t,"dragenter",this),c.on(t,"drop",this)),v.sortables.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),c.on(t,"selectstart",this)},_onMouseDown:function(t){var e,n,o=this,i=this._elm,a=this.options,r=a.preventOnFilter,s=t.type,d=t.touches&&t.touches[0],c=(d||t).target,h=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||c,g=a.filter;if(function(t){m.length=0;for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var o=e[n];o.checked&&m.push(o)}}(i),!(/mousedown/.test(s)&&0!==t.button||a.disabled||h.isContentEditable||(c=l.closest(c,a.draggable,i,!1),b===c))){if(v.log("_onTapStart",c.tagName+","+c.className),e=E(c),n=E(c,a.draggable),"function"==typeof g){if(g.call(this,t,c,this))return o._dispatchEvent(o,h,"filter",c,i,i,e,void 0,n),void(r&&t.cancelable&&t.preventDefault())}else if(g&&(g=g.split(",").some(function(t){if(t=l.closest(h,t.trim(),i,!1))return o._dispatchEvent(o,t,"filter",c,i,i,e,void 0,n),!0})))return void(r&&t.cancelable&&t.preventDefault());a.handle&&!l.closest(h,a.handle,i,!1)||this._prepareDragStart(t,d,c,e,n)}},_prepareDragStart:function(t,e,n,o,i){var a,r=this._elm,l=this.options,s=(r.ownerDocument,v.dragEl),c=(v.parentEl,v.nextEl,v.oldIndex),h=v.oldDraggableIndex;v.tapEvt;v.log("_prepareDragStart","start"),n&&!s&&n.parentNode===r&&(a=r,s=v.dragEl=n,v.parentEl=s.parentNode,v.nextEl=s.nextSibling,b=n,v.activeGroup=this.options.group,c=v.oldIndex=o,h=v.oldDraggableIndex=i,v.tapEvt={target:s,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,s.style["will-change"]="all",s.style.transition="",s.style.transform="",l.ignore.split(",").forEach(function(t){!function(t,e,n){if(t){var o=t.getElementsByTagName(e),i=0,a=o.length;if(n)for(;i<a;i++)n(o[i],i);return o}}(s,t.trim(),v._disableDraggable)}),v.prepare(this,v.dragEl),this._dispatchEvent(this,a,"choose",s,a,a,c,void 0,h),d.toggleClass(s,l.chosenClass,!0))},_onDragStart:function(t,n){v.log("_onDragStart","start");var o=this,i=v.dragEl,a=this._elm,l=t.dataTransfer,s=o.options,c=v.cloneEl=r.clone(i,!0);c.draggable=!1,c.style["will-change"]="",d.toggleClass(c,o.options.chosenClass,!1),o._cloneId=e.defer(function(){o.options.removeCloneOnHide||a.insertBefore(c,i),o._dispatchEvent(o,a,"clone",i)}),n||d.toggleClass(i,s.dragClass,!0),n||(l&&(l.effectAllowed="move",s.setData&&s.setData.call(o,l,i)),d.css(i,"transform","translateZ(0)")),v.awaitingDragStarted=!0,o._dragStartId=e.defer(function(t,e){v.awaitingDragStarted=!1;var n=v.dragEl,o=this._elm,i=v.oldIndex,a=v.oldDraggableIndex;if(o&&n){v.start(this);var r=this.options;!t&&d.toggleClass(n,r.dragClass,!1),d.toggleClass(n,r.ghostClass,!0),d.css(n,"transform",""),this._dispatchEvent(this,o,"start",n,o,o,i,void 0,a,void 0,e)}else this._nulling()}.bind(o,n,t))},_onDragEnd:function(t){this._elm,this.options,v.dragEl,v.putSortable;v.awaitingDragStarted=!1,!1,clearTimeout(this._dragStartTimer),this._cloneId&&(this._cloneId.cancel(),this._cloneId=null),this._dragStartId&&(this._dragStartId.cancel(),this._dragStartId=null),this.nativeDraggable&&(c.off(v.dragEl,"dragstart",this._onDragStart),c.off(v.dragEl,"dragend",this._onDragEnd)),b=null,m.forEach(function(t){t.checked=!0}),m.length=0,v.end()},_onMove:function(t,e,n,o,i,a,r,l){var d,h,g=t[v.expando],u=g.options.onMove;return d=c.create("move",{to:e,from:t,dragged:n,draggedRect:o,related:i||e,relatedRect:a||s.boundingRect(e),willInsertAfter:l,originalEvent:r}),t.dispatchEvent(d),u&&(h=u.call(g,d,r)),h},_computeIsAligned:function(t){var e,n=v.dragEl;if(e=t.target,e=l.closest(e,this.options.draggable,this.el,!1),!B&&n&&n.parentNode===this.el){for(var o,i,a,r,d,c,h,g,u=this.el.children,p=0;p<u.length;p++)l.closest(u[p],this.options.draggable,this.el,!1)&&u[p]!==e&&(u[p].sortableMouseAligned=(o=t.clientX,i=t.clientY,a=u[p],r=this._getDirection(t,null),this.options,void 0,void 0,void 0,void 0,d=s.boundingRect(a),c="vertical"===r?d.left:d.top,h="vertical"===r?d.right:d.bottom,c<(g="vertical"===r?o:i)&&g<h));l.closest(e,this.options.draggable,this.el,!0)||(C=null),B=!0,A(function(){B=!1},30)}},_getDirection:function(t,e){var n=v.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,n,null):this.options.direction},_animate:function(t,e){var n=this.options.animation,o=v.dragEl;if(n){var i=s.boundingRect(e);if(e===o&&i,1===t.nodeType&&(t=s.boundingRect(t)),t.left+t.width/2!==i.left+i.width/2||t.top+t.height/2!==i.top+i.height/2){var a=h.matrix(this.el),r=a&&a.a,l=a&&a.d;d.css(e,"transition","none"),d.css(e,"transform","translate3d("+(t.left-i.left)/(r||1)+"px,"+(t.top-i.top)/(l||1)+"px,0)"),this._repaint(e),d.css(e,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=A(function(){d.css(e,"transition",""),d.css(e,"transform",""),e.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offUpEvents:function(){var t=this.el.ownerDocument;c.off(t,"mouseup",this._onDrop),c.off(P,"selectstart",this)},_onDragOver:function(t){var e,n,o,i=this.el,a=t.target,r=this.options,c=r.group,h=v.active,g=v.activeGroup===c,u=r.sort,p=this,f=v.dragEl,b=v.active.elm(),m=v.putSortable,_=v.nextEl,x=v.oldIndex,T=v.oldDraggableIndex;if(!M){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),y=!0,a=l.closest(a,r.draggable,i,!0),f.contains(t.target)||a.animated)return q(!1);if(h&&!r.disabled&&(g?u||(o=!b.contains(f)):m===this||(this.lastPutMode=v.activeGroup.checkPull(this,h,f,t))&&c.checkPut(this,h,f,t))){var R=this._getDirection(t,a);if(e=s.boundingRect(f),o)return this._hideClone(),v.parentEl=b,_?b.insertBefore(f,_):b.appendChild(f),q(!0);var N=function(t){return l.lastChild(t,{ignoreHidden:!0,excluding:[]})}(i);if(!N||function(t,e,n){var o=s.boundingRect(l.lastChild(n,{ignoreHidden:!0,excluding:[]})),i="vertical"===e?t.clientY:t.clientX,a="vertical"===e?t.clientX:t.clientY,r="vertical"===e?o.bottom:o.right,d="vertical"===e?o.left:o.top,c="vertical"===e?o.right:o.bottom;return"vertical"===e?a>c+10||a<=c&&i>r&&a>=d:i>r&&a>d||i<=r&&a>c+10}(t,R,i)&&!N.animated){if(N&&i===t.target&&(a=N),a&&(n=s.boundingRect(a)),g?h._hideClone():h._showClone(this),!1!==this._onMove(b,i,f,e,a,n,t,!!a))return i.appendChild(f),v.parentEl=i,null,L(),q(!0)}else if(a&&a!==f&&a.parentNode===i){var B,O=0,H=a.sortableMouseAligned,Y=f.parentNode!==i,F="vertical"===R?"top":"left";if(C!==a&&(D=null,B=s.boundingRect(a)[F],S=!1),function(t,e,n){var o=s.boundingRect(t),i=s.boundingRect(e),a="vertical"===n?o.left:o.top,r="vertical"===n?o.right:o.bottom,l="vertical"===n?o.width:o.height,d="vertical"===n?i.left:i.top,c="vertical"===n?i.right:i.bottom,h="vertical"===n?i.width:i.height;return a===d||r===c||a+l/2===d+h/2}(f,a,R)&&H||Y||r.invertSwap||"insert"===D||"swap"===D?("swap"!==D&&(I=r.invertSwap||Y),O=function(t,e,n,o,i,a,r){var l=s.boundingRect(e),d="vertical"===n?t.clientY:t.clientX,c="vertical"===n?l.height:l.width,h="vertical"===n?l.top:l.left,g="vertical"===n?l.bottom:l.right,u=s.boundingRect(f),p=!1;if(!a)if(r&&w<c*o){if(!S&&(1===k?d>h+c*i/2:d<g-c*i/2)&&(S=!0),S)p=!0;else if("vertical"===n?u.top:u.left,"vertical"===n?u.bottom:u.right,1===k?d<h+w:d>g-w)return-1*k}else if(d>h+c*(1-o)/2&&d<g-c*(1-o)/2)return W(e);return(p=p||a)&&(d<h+c*i/2||d>g-c*i/2)?d>h+c/2?1:-1:0}(t,a,R,r.swapThreshold,null==r.invertedSwapThreshold?r.swapThreshold:r.invertedSwapThreshold,I,C===a),D="swap"):(O=W(a),D="insert"),0===O)return q(!1);null,C=a,k=O,n=s.boundingRect(a);var U=a.nextElementSibling,G=!1;G=1===O;var j=this._onMove(b,i,f,e,a,n,t,G);if(!1!==j)return 1!==j&&-1!==j||(G=1===j),M=!0,A(X,30),g?h._hideClone():h._showClone(this),G&&!U?i.appendChild(f):a.parentNode.insertBefore(f,G?U:a),v.parentEl=f.parentNode,void 0===B||I||(w=Math.abs(B-s.boundingRect(a)[F])),L(),q(!0)}if(i.contains(f))return q(!1)}return!1}function q(o){return o&&(g?h._hideClone():h._showClone(p),h&&(d.toggleClass(f,m?m.options.ghostClass:h.options.ghostClass,!1),d.toggleClass(f,r.ghostClass,!0)),m!==p&&p!==v.active?m=v.putSortable=p:p===v.active&&(m=v.putSortable=null),e&&p._animate(e,f),a&&n&&p._animate(n,a)),(a===f&&!f.animated||a===i&&!a.animated)&&(C=null),r.dragoverBubble||t.rootEl||a===P||(v.over(t),f.parentNode[v.expando]._computeIsAligned(t),!o&&v.nearestEmptyInsertDetectEvent(t)),!r.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function L(){p._dispatchEvent(p,b,"change",a,i,b,x,E(f),T,E(f,r.draggable),t)}function W(t){return E(f)<E(t)?1:-1}},_onDrop:function(t){this.el;var e=this.options,n=v.active.elm(),o=v.dragEl,i=v.putSortable,a=v.parentEl,l=v.oldIndex,s=v.oldDraggableIndex,h=v.nextEl;I=!1,S=!1,this.nativeDraggable&&c.off(P,"drop",this),this._offUpEvents(),t&&(y&&(t.cancelable&&t.preventDefault(),!e.dropBubble&&t.stopPropagation()),(n===a||i&&"clone"!==i.lastPutMode)&&r.remove(v.cloneEl),o&&(v._disableDraggable(o),o.style["will-change"]="",d.toggleClass(o,i?i.options.ghostClass:this.options.ghostClass,!1),d.toggleClass(o,this.options.chosenClass,!1),this._dispatchEvent(this,n,"unchoose",o,a,n,l,null,s,null,t),n!==a?(_=E(o),x=E(o,e.draggable),_>=0&&(this._dispatchEvent(null,a,"add",o,a,n,l,_,s,x,t),this._dispatchEvent(this,n,"remove",o,a,n,l,_,s,x,t),this._dispatchEvent(null,a,"sort",o,a,n,l,_,s,x,t),this._dispatchEvent(this,n,"sort",o,a,n,l,_,s,x,t)),i&&i.save()):o.nextSibling!==h&&(_=E(o),x=E(o,e.draggable),_>=0&&(this._dispatchEvent(this,n,"update",o,a,n,l,_,s,x,t),this._dispatchEvent(this,n,"sort",o,a,n,l,_,s,x,t))),v.active&&(null!=_&&-1!==_||(_=l,x=s),this._dispatchEvent(this,n,"end",o,a,n,l,_,s,x,t),this.save()))),this._nulling()},_nulling:function(){y=_=C=k=null},_hideClone:function(){v.cloneEl.cloneHidden||(d.hide(v.cloneEl),v.cloneEl.cloneHidden=!0,v.cloneEl.parentNode&&this.options.removeCloneOnHide&&r.remove(v.cloneEl))},_showClone:function(t){var e=v.active.el,n=v.nextEl;"clone"===t.lastPutMode?v.cloneEl.cloneHidden&&(e.contains(v.dragEl)&&!this.options.group.revertClone?e.insertBefore(v.cloneEl,v.dragEl):n?e.insertBefore(v.cloneEl,n):e.appendChild(v.cloneEl),this.options.group.revertClone&&this._animate(v.dragEl,v.cloneEl),d.show(v.cloneEl),v.cloneEl.cloneHidden=!1):this._hideClone()},handleEvent:function(t){switch(t.type){case"drop":this._onDrop(t);break;case"dragenter":case"dragover":v.dragEl&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},_dispatchEvent:function(t,e,n,o,i,a,r,l,s,d,h){var g,u=(t=t||e[v.expando]).options,p="on"+n.charAt(0).toUpperCase()+n.substr(1),f=v.putSortable;g=c.create(n,{to:i||e,from:a||e,item:o||e,clone:v.cloneEl,oldIndex:r,newIndex:l,oldDraggableIndex:s,newDraggableIndex:d,originalEvent:h,pullMode:f?f.lastPutMode:void 0}),e&&e.dispatchEvent(g),u[p]&&u[p].call(t,g)},toArray:function(){for(var t,e=[],n=this.el.children,o=0,i=n.length,a=this.options;o<i;o++)t=n[o],l.closest(t,a.draggable,this.el,!1)&&e.push(t.getAttribute(a.dataIdAttr)||r.generateId(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,o){var i=n.children[o];l.closest(i,this.options.draggable,n,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return l.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&O(n)},destroy:function(){var t=this.el;t[v.expando]=null,c.off(t,"mousedown",this._onTapStart),this.nativeDraggable&&(c.off(t,"dragover",this),c.off(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),v.sortables.splice(v.sortables.indexOf(this.el),1),this.el=t=null}});function X(){M=!1}return H.create=function(t,e){return new H(t,e)},H.version="1.9.0",t.attach("intg.Sortable",H)});
//# sourceMappingURL=sourcemaps/Sortable.js.map
