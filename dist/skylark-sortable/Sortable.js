/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-domx-plugins","skylark-devices-points/touch","./autoscroll","./containers","./dnd","./fallback/ghoster"],function(t,e,n,a,o,i,r,l,s,d,g,c,h,p,u,f,v,b,m,_){"use strict";var E,x=[];var D,y,C,k,S,w,I,T=!1,P=!1,A=window,N=A.document,R=A.parseInt,B=A.setTimeout,M=(A.Polymer,n&&n.ie,n&&n.edge,n&&n.firefox,n&&n.safari,a&&a.apple.device,"draggable"in N.createElement("div")&&!a.apple.device),O=(i.support.cssPointerEvents,!1),H=!1,X=function(t){function e(t,n){return function(a,o,i,r){var l=a.options.group.name&&o.options.group.name&&a.options.group.name===o.options.group.name;if(null==t&&(n||l))return!0;if(null==t||!1===t)return!1;if(n&&"clone"===t)return t;if("function"==typeof t)return e(t(a,o,i,r),n)(a,o,i,r);var s=(n?a:o).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var n={},a=t.group;a&&"object"==typeof a||(a={name:a}),n.name=a.name,n.checkPull=e(a.pull,!0),n.checkPut=e(a.put),n.revertClone=a.revertClone,t.group=n},Y=u.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(t,n,a,o){return p(this.el,e.mixin({excluding:[o,a]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:R(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(t,e){for(var n in this.overrided(t,e),this.el=t,t[m.expando]=this,(e=this.options).draggable=e.draggable||/[uo]l/i.test(t.nodeName)?">li":">*",X(e),this)"_"===n.charAt(0)&&"function"==typeof this[n]&&(this[n]=this[n].bind(this));this.nativeDraggable=!e.forceFallback&&M,this.nativeDraggable&&(this.options.touchStartThreshold=1),f.mousy(t),g.on(t,"mousedown",this._onMouseDown),this.nativeDraggable&&(g.on(t,"dragover",this),g.on(t,"dragenter",this),g.on(t,"drop",this)),m.sortables.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),g.on(t,"selectstart",this)},_onMouseDown:function(t){var e,n,a=this,o=this._elm,i=this.options,r=i.preventOnFilter,s=t.type,d=t.touches&&t.touches[0],g=(d||t).target,c=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||g,h=i.filter;if(function(t){x.length=0;for(var e=t.getElementsByTagName("input"),n=e.length;n--;){var a=e[n];a.checked&&x.push(a)}}(o),!(/mousedown/.test(s)&&0!==t.button||i.disabled||c.isContentEditable||(g=l.closest(g,i.draggable,o,!1),E===g))){if(m.log("_onTapStart",g.tagName+","+g.className),e=b._index(g),n=b._index(g,i.draggable),"function"==typeof h){if(h.call(this,t,g,this))return a._dispatchEvent(a,c,"filter",g,o,o,e,void 0,n),void(r&&t.cancelable&&t.preventDefault())}else if(h&&(h=h.split(",").some(function(t){if(t=l.closest(c,t.trim(),o,!1))return a._dispatchEvent(a,t,"filter",g,o,o,e,void 0,n),!0})))return void(r&&t.cancelable&&t.preventDefault());i.handle&&!l.closest(c,i.handle,o,!1)||this._prepareDragStart(t,d,g,e,n)}},_prepareDragStart:function(t,e,n,a,o){var i,r,l=this,s=l._elm,g=l.options,c=(s.ownerDocument,this.dragEl),h=(m.parentEl,m.nextEl,m.oldIndex),p=m.oldDraggableIndex;m.tapEvt;m.log("_prepareDragStart","start"),n&&!c&&n.parentNode===s&&(r=s,c=this.dragEl=n,m.parentEl=c.parentNode,m.nextEl=c.nextSibling,E=n,m.activeGroup=this.options.group,h=m.oldIndex=a,p=m.oldDraggableIndex=o,m.tapEvt={target:c,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,c.style["will-change"]="all",c.style.transition="",c.style.transform="",i=function(){l.nativeDraggable&&(c.draggable=!0),l._triggerDragStart(t,e),l._dispatchEvent(l,r,"choose",c,r,r,h,void 0,p),d.toggleClass(c,g.chosenClass,!0)},g.ignore.split(",").forEach(function(t){!function(t,e,n){if(t){var a=t.getElementsByTagName(e),o=0,i=a.length;if(n)for(;o<i;o++)n(a[o],o);return a}}(c,t.trim(),m._disableDraggable)}),this.nativeDraggable&&(this.options.touchStartThreshold=4,c.draggable=!0),i())},_triggerDragStart:function(t,n){m.log("_triggerDragStart","start"),m.log("_triggerDragStart","nativeDraggable is "+this.nativeDraggable),m.prepare(this),this.nativeDraggable&&(g.on(this.dragEl,"dragend",this._onDragEnd),g.on(this.dragEl,"dragstart",this._onDragStart));try{N.selection?e.defer(function(){N.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_onDragStart:function(t,n){m.log("_onDragStart","start");var a=this,o=this.dragEl,i=this._elm,l=t.dataTransfer,s=a.options,g=m.cloneEl=r.clone(o,!0);g.draggable=!1,g.style["will-change"]="",d.toggleClass(g,a.options.chosenClass,!1),a._cloneId=e.defer(function(){a.options.removeCloneOnHide||i.insertBefore(g,o),a._dispatchEvent(a,i,"clone",o)}),n||d.toggleClass(o,s.dragClass,!0),n||(l&&(l.effectAllowed="move",s.setData&&s.setData.call(a,l,o)),d.css(o,"transform","translateZ(0)")),m.awaitingDragStarted=!0,a._dragStartId=e.defer(a._dragStarted.bind(a,n,t))},_dragStarted:function(t,e){m.awaitingDragStarted=!1;var n=this.dragEl,a=this._elm,o=m.oldIndex,i=m.oldDraggableIndex;if(a&&n){m.start(this);var r=this.options;!t&&d.toggleClass(n,r.dragClass,!1),d.toggleClass(n,r.ghostClass,!0),d.css(n,"transform",""),m.active=this,this._dispatchEvent(this,a,"start",n,a,a,o,void 0,i,void 0,e)}else this._nulling()},_onDragEnd:function(t){this._elm,this.options,this.dragEl,m.putSortable;m.awaitingDragStarted=!1,!1,v._nulling(),v._clearAutoScrolls(),v._cancelThrottle(),clearTimeout(this._dragStartTimer),this._cloneId&&(this._cloneId.stop(),this._cloneId=null),this._dragStartId&&(this._dragStartId.stop(),this._dragStartId=null),this.nativeDraggable&&(g.off(this.dragEl,"dragstart",this._onDragStart),g.off(this.dragEl,"dragend",this._onDragEnd)),E=null,x.forEach(function(t){t.checked=!0}),x.length=0,this.dragEl=null,m.end()},_onMove:function(t,e,n,a,o,i,r,l){var d,c,h=t[m.expando],p=h.options.onMove;return d=g.create("move",{to:e,from:t,dragged:n,draggedRect:a,related:o||e,relatedRect:i||s.boundingRect(e),willInsertAfter:l,originalEvent:r}),t.dispatchEvent(d),p&&(c=p.call(h,d,r)),c},_computeIsAligned:function(t){var e,n=m.draggable.dragEl;if(e=t.target,e=l.closest(e,this.options.draggable,this.el,!1),!H&&n&&n.parentNode===this.el){for(var a=this.el.children,o=0;o<a.length;o++)l.closest(a[o],this.options.draggable,this.el,!1)&&a[o]!==e&&(a[o].sortableMouseAligned=b._isClientInRowColumn(t.clientX,t.clientY,a[o],this._getDirection(t,null),this.options));l.closest(e,this.options.draggable,this.el,!0)||(k=null),H=!0,B(function(){H=!1},30)}},_getDirection:function(t,e){var n=m.draggable.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,n,_.ghostEl):this.options.direction},_animate:function(t,e){var n=this.options.animation,a=m.draggable.dragEl;if(n){var o=s.boundingRect(e);if(e===a&&o,1===t.nodeType&&(t=s.boundingRect(t)),t.left+t.width/2!==o.left+o.width/2||t.top+t.height/2!==o.top+o.height/2){var i=c.matrix(this.el),r=i&&i.a,l=i&&i.d;d.css(e,"transition","none"),d.css(e,"transform","translate3d("+(t.left-o.left)/(r||1)+"px,"+(t.top-o.top)/(l||1)+"px,0)"),this._repaint(e),d.css(e,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=B(function(){d.css(e,"transition",""),d.css(e,"transform",""),e.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offUpEvents:function(){var t=this.el.ownerDocument;g.off(t,"mouseup",this._onDrop),g.off(N,"selectstart",this)},_onDragOver:function(t){var e,n,a,o=this.el,i=t.target,r=this.options,g=r.group,c=m.active,h=m.activeGroup===g,p=r.sort,u=this,f=m.draggable.dragEl,E=m.draggable.elm(),x=m.putSortable,D=m.nextEl,y=m.oldIndex,A=m.oldDraggableIndex;if(!O){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),C=!0,i=l.closest(i,r.draggable,o,!0),f.contains(t.target)||i.animated)return z(!1);if(i!==f&&(m.ignoreNextClick=!1),c&&!r.disabled&&(h?p||(a=!E.contains(f)):x===this||(this.lastPutMode=m.activeGroup.checkPull(this,c,f,t))&&g.checkPut(this,c,f,t))){var R=this._getDirection(t,i);if(e=s.boundingRect(f),a)return this._hideClone(),m.parentEl=E,D?E.insertBefore(f,D):E.appendChild(f),z(!0);var M=_._lastChild(o);if(!M||_._ghostIsLast(t,R,o)&&!M.animated){if(M&&o===t.target&&(i=M),i&&(n=s.boundingRect(i)),h?c._hideClone():c._showClone(this),!1!==this._onMove(E,o,f,e,i,n,t,!!i))return o.appendChild(f),m.parentEl=o,null,J(),z(!0)}else if(i&&i!==f&&i.parentNode===o){var H,X=0,Y=i.sortableMouseAligned,G=f.parentNode!==o,U="vertical"===R?"top":"left",j=v._isScrolledPast(i,"top")||v._isScrolledPast(f,"top"),q=j?j.scrollTop:void 0;if(k!==i&&(w=null,H=s.boundingRect(i)[U],T=!1),b._isElInRowColumn(f,i,R)&&Y||G||j||r.invertSwap||"insert"===w||"swap"===w?("swap"!==w&&(P=r.invertSwap||G),X=function(t,e,n,a,o,i,r){var l=s.boundingRect(e),d="vertical"===n?t.clientY:t.clientX,g="vertical"===n?l.height:l.width,c="vertical"===n?l.top:l.left,h="vertical"===n?l.bottom:l.right,p=s.boundingRect(f),u=!1;if(!i)if(r&&I<g*a){if(!T&&(1===S?d>c+g*o/2:d<h-g*o/2)&&(T=!0),T)u=!0;else if("vertical"===n?p.top:p.left,"vertical"===n?p.bottom:p.right,1===S?d<c+I:d>h-I)return-1*S}else if(d>c+g*(1-a)/2&&d<h-g*(1-a)/2)return K(e);return(u=u||i)&&(d<c+g*o/2||d>h-g*o/2)?d>c+g/2?1:-1:0}(t,i,R,r.swapThreshold,null==r.invertedSwapThreshold?r.swapThreshold:r.invertedSwapThreshold,P,k===i),w="swap"):(X=K(i),w="insert"),0===X)return z(!1);null,k=i,S=X,n=s.boundingRect(i);var L=i.nextElementSibling,W=!1;W=1===X;var Z=this._onMove(E,o,f,e,i,n,t,W);if(!1!==Z)return 1!==Z&&-1!==Z||(W=1===Z),O=!0,B(F,30),h?c._hideClone():c._showClone(this),W&&!L?o.appendChild(f):i.parentNode.insertBefore(f,W?L:i),j&&s.scrollBy(j,0,q-j.scrollTop),m.parentEl=f.parentNode,void 0===H||P||(I=Math.abs(H-s.boundingRect(i)[U])),J(),z(!0)}if(o.contains(f))return z(!1)}return!1}function z(a){return a&&(h?c._hideClone():c._showClone(u),c&&(d.toggleClass(f,x?x.options.ghostClass:c.options.ghostClass,!1),d.toggleClass(f,r.ghostClass,!0)),x!==u&&u!==m.active?x=m.putSortable=u:u===m.active&&(x=m.putSortable=null),e&&u._animate(e,f),i&&n&&u._animate(n,i)),(i===f&&!f.animated||i===o&&!i.animated)&&(k=null),r.dragoverBubble||t.rootEl||i===N||(m.over(t),f.parentNode[m.expando]._computeIsAligned(t),!a&&m.nearestEmptyInsertDetectEvent(t)),!r.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function J(){u._dispatchEvent(u,E,"change",i,o,E,y,b._index(f),A,b._index(f,r.draggable),t)}function K(t){return b._index(f)<b._index(t)?1:-1}},_onDrop:function(t){this.el;var e=this.options,n=m.draggable.elm(),a=m.draggable.dragEl,o=m.putSortable,i=m.parentEl,l=m.oldIndex,s=m.oldDraggableIndex,c=m.nextEl;P=!1,T=!1,this.nativeDraggable&&g.off(N,"drop",this),this._offUpEvents(),t&&(C&&(t.cancelable&&t.preventDefault(),!e.dropBubble&&t.stopPropagation()),_.remove(),(n===i||o&&"clone"!==o.lastPutMode)&&r.remove(m.cloneEl),a&&(m._disableDraggable(a),a.style["will-change"]="",d.toggleClass(a,o?o.options.ghostClass:this.options.ghostClass,!1),d.toggleClass(a,this.options.chosenClass,!1),this._dispatchEvent(this,n,"unchoose",a,i,n,l,null,s,null,t),n!==i?(D=b._index(a),y=b._index(a,e.draggable),D>=0&&(this._dispatchEvent(null,i,"add",a,i,n,l,D,s,y,t),this._dispatchEvent(this,n,"remove",a,i,n,l,D,s,y,t),this._dispatchEvent(null,i,"sort",a,i,n,l,D,s,y,t),this._dispatchEvent(this,n,"sort",a,i,n,l,D,s,y,t)),o&&o.save()):a.nextSibling!==c&&(D=b._index(a),y=b._index(a,e.draggable),D>=0&&(this._dispatchEvent(this,n,"update",a,i,n,l,D,s,y,t),this._dispatchEvent(this,n,"sort",a,i,n,l,D,s,y,t))),m.active&&(null!=D&&-1!==D||(D=l,y=s),this._dispatchEvent(this,n,"end",a,i,n,l,D,s,y,t),this.save()))),this._nulling()},_nulling:function(){C=D=k=S=null},_hideClone:function(){m.cloneEl.cloneHidden||(d.hide(m.cloneEl),m.cloneEl.cloneHidden=!0,m.cloneEl.parentNode&&this.options.removeCloneOnHide&&r.remove(m.cloneEl))},_showClone:function(t){var e=m.active.el,n=m.nextEl;"clone"===t.lastPutMode?m.cloneEl.cloneHidden&&(e.contains(m.draggable.dragEl)&&!this.options.group.revertClone?e.insertBefore(m.cloneEl,m.draggable.dragEl):n?e.insertBefore(m.cloneEl,n):e.appendChild(m.cloneEl),this.options.group.revertClone&&this._animate(m.draggable.dragEl,m.cloneEl),d.show(m.cloneEl),m.cloneEl.cloneHidden=!1):this._hideClone()},handleEvent:function(t){switch(t.type){case"drop":this._onDrop(t);break;case"dragenter":case"dragover":m.draggable.dragEl&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},_dispatchEvent:function(t,e,n,a,o,i,r,l,s,d,c){var h,p=(t=t||e[expando]).options,u="on"+n.charAt(0).toUpperCase()+n.substr(1),f=this.putSortable;h=g.create(n,{to:o||e,from:i||e,item:a||e,clone:this.cloneEl,oldIndex:r,newIndex:l,oldDraggableIndex:s,newDraggableIndex:d,originalEvent:c,pullMode:f?f.lastPutMode:void 0}),e&&e.dispatchEvent(h),p[u]&&p[u].call(t,h)},toArray:function(){for(var t,e=[],n=this.el.children,a=0,o=n.length,i=this.options;a<o;a++)t=n[a],l.closest(t,i.draggable,this.el,!1)&&e.push(t.getAttribute(i.dataIdAttr)||r.generateId(t));return e},sort:function(t){var e={},n=this.el;this.toArray().forEach(function(t,a){var o=n.children[a];l.closest(o,this.options.draggable,n,!1)&&(e[t]=o)},this),t.forEach(function(t){e[t]&&(n.removeChild(e[t]),n.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return l.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var n=this.options;if(void 0===e)return n[t];n[t]=e,"group"===t&&X(n)},destroy:function(){var t=this.el;t[m.expando]=null,g.off(t,"mousedown",this._onTapStart),this.nativeDraggable&&(g.off(t,"dragover",this),g.off(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),m.sortables.splice(m.sortables.indexOf(this.el),1),this.el=t=null}});function F(){O=!1}return Y.create=function(t,e){return new Y(t,e)},Y.version="1.9.0",t.attach("intg.Sortable",Y)});
//# sourceMappingURL=sourcemaps/Sortable.js.map
