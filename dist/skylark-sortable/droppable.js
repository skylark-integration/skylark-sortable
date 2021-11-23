/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx","skylark-domx-finder","skylark-domx-styler","skylark-domx-eventer","skylark-domx-noder","skylark-domx-geom","skylark-devices-points/touch","./dnd"],function(e,t,n,r,o,a,i,l){var s,c,d,h=!1;function u(e,n){for(var r=t.scrollableParent(e,!0),i=a.boundingRect(e)[n];r;){var l=a.boundingRect(r)[n];if(!("top"===n||"left"===n?i>=l:i<=l))return r;if(r===o.scrollingElement())break;r=t.scrollableParent(r,!1)}return!1}function g(){h=!1}function v(e,n){return t.index(e,function(e){return!("TEMPLATE"===e.nodeName.toUpperCase()||e===l.cloneEl||n&&!t.matches(e,n))})}return class{constructor(e,t){this.sortable=e;var n=this.el=this._elm=e.elm();this.options=t,e.nativeDraggable&&(r.on(n,"dragover",this),r.on(n,"dragenter",this),r.on(n,"drop",this)),r.on(n,"selectstart",this)}_onMove(e,t,n,o,i,s,c,d){var h,u,g=e[l.expando],v=g.options.onMove;return h=r.create("move",{to:t,from:e,dragged:n,draggedRect:o,related:i||t,relatedRect:s||a.boundingRect(t),willInsertAfter:d,originalEvent:c}),e.dispatchEvent(h),v&&(u=v.call(g,h,c)),u}_onDragOver(e){var r,o,i,p,f,b,m,_=this._elm,E=e.target,C=this.options,k=C.group,w=l.active,x=l.activeGroup===k,D=C.sort,R=this.sortable,y=l.dragEl,T=l.active.elm(),P=l.putSortable,S=l.nextEl,M=l.oldIndex,B=l.oldDraggableIndex;if(!h){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),s=!0,E=t.closest(E,C.draggable,_,!0),y.contains(e.target)||E.animated)return z(!1);if(w&&!C.disabled&&(x?D||(i=!T.contains(y)):P===this||(this.lastPutMode=l.activeGroup.checkPull(this,w,y,e))&&k.checkPut(this,w,y,e))){var I=R._getDirection(e,E);if(r=a.boundingRect(y),i)return this._hideClone(),l.parentEl=T,S?T.insertBefore(y,S):T.appendChild(y),z(!0);var N=function(e){return t.lastChild(e,{ignoreHidden:!0,excluding:[]})}(_);if(!N||function(e,n,r){var o=a.boundingRect(t.lastChild(r,{ignoreHidden:!0,excluding:[]})),i="vertical"===n?e.clientY:e.clientX,l="vertical"===n?e.clientX:e.clientY,s="vertical"===n?o.bottom:o.right,c="vertical"===n?o.left:o.top,d="vertical"===n?o.right:o.bottom;return"vertical"===n?l>d+10||l<=d&&i>s&&l>=c:i>s&&l>c||i<=s&&l>d+10}(e,I,_)&&!N.animated){if(N&&_===e.target&&(E=N),E&&(o=a.boundingRect(E)),x?w._hideClone():w._showClone(this),!1!==this._onMove(T,_,y,r,E,o,e,!!E))return _.appendChild(y),l.parentEl=_,F(),z(!0)}else if(E&&E!==y&&E.parentNode===_){var A,U=0,X=E.sortableMouseAligned,Y=y.parentNode!==_,G="vertical"===I?"top":"left",H=u(E,"top")||u(y,"top"),O=H?H.scrollTop:void 0;if(f!==E&&(p=null,A=a.boundingRect(E)[G],c=!1),function(e,t,n){var r=a.boundingRect(e),o=a.boundingRect(t),i="vertical"===n?r.left:r.top,l="vertical"===n?r.right:r.bottom,s="vertical"===n?r.width:r.height,c="vertical"===n?o.left:o.top,d="vertical"===n?o.right:o.bottom,h="vertical"===n?o.width:o.height;return i===c||l===d||i+s/2===c+h/2}(y,E,I)&&X||Y||H||C.invertSwap||"insert"===p||"swap"===p?("swap"!==p&&(d=C.invertSwap||Y),U=function(e,t,n,r,o,i,l){var s=a.boundingRect(t),d="vertical"===n?e.clientY:e.clientX,h="vertical"===n?s.height:s.width,u="vertical"===n?s.top:s.left,g="vertical"===n?s.bottom:s.right,v=a.boundingRect(y),p=!1;if(!i)if(l&&m<h*r){if(!c&&(1===b?d>u+h*o/2:d<g-h*o/2)&&(c=!0),c)p=!0;else if("vertical"===n?v.top:v.left,"vertical"===n?v.bottom:v.right,1===b?d<u+m:d>g-m)return-1*b}else if(d>u+h*(1-r)/2&&d<g-h*(1-r)/2)return J(t);return(p=p||i)&&(d<u+h*o/2||d>g-h*o/2)?d>u+h/2?1:-1:0}(e,E,I,C.swapThreshold,null==C.invertedSwapThreshold?C.swapThreshold:C.invertedSwapThreshold,d,f===E),p="swap"):(U=J(E),p="insert"),0===U)return z(!1);f=E,b=U,o=a.boundingRect(E);var L=E.nextElementSibling,j=!1;j=1===U;var q=this._onMove(T,_,y,r,E,o,e,j);if(!1!==q)return 1!==q&&-1!==q||(j=1===q),h=!0,setTimeout(g,30),x?w._hideClone():w._showClone(this),j&&!L?_.appendChild(y):E.parentNode.insertBefore(y,j?L:E),H&&a.scrollBy(H,0,O-H.scrollTop),l.parentEl=y.parentNode,void 0===A||d||(m=Math.abs(A-a.boundingRect(E)[G])),F(),z(!0)}if(_.contains(y))return z(!1)}return!1}function z(t){return t&&(x?w._hideClone():w._showClone(R),w&&(n.toggleClass(y,P?P.options.ghostClass:w.options.ghostClass,!1),n.toggleClass(y,C.ghostClass,!0)),P!==R&&R!==l.active?P=l.putSortable=R:R===l.active&&(P=l.putSortable=null),r&&R._animate(r,y),E&&o&&R._animate(o,E)),(E===y&&!y.animated||E===_&&!E.animated)&&(f=null),C.dragoverBubble||e.rootEl||E===document||(l.over(e),!t&&l.nearestEmptyInsertDetectEvent(e)),!C.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function F(){R._dispatchEvent(R,T,"change",E,_,T,M,v(y),B,v(y,C.draggable),e)}function J(e){return v(y)<v(e)?1:-1}}_onDrop(e){this.el;var t,a,i=this.options,h=this.sortable,u=l.active.elm(),g=l.dragEl,p=l.putSortable,f=l.parentEl,b=l.oldIndex,m=l.oldDraggableIndex,_=l.nextEl;d=!1,c=!1,h.nativeDraggable&&r.off(document,"drop",this),this._offUpEvents(),e&&(s&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),(u===f||p&&"clone"!==p.lastPutMode)&&o.remove(l.cloneEl),g&&(l._disableDraggable(g),g.style["will-change"]="",n.toggleClass(g,p?p.options.ghostClass:this.options.ghostClass,!1),n.toggleClass(g,this.options.chosenClass,!1),h._dispatchEvent(this,u,"unchoose",g,f,u,b,null,m,null,e),u!==f?(t=v(g),a=v(g,i.draggable),t>=0&&(h._dispatchEvent(null,f,"add",g,f,u,b,t,m,a,e),h._dispatchEvent(this,u,"remove",g,f,u,b,t,m,a,e),h._dispatchEvent(null,f,"sort",g,f,u,b,t,m,a,e),h._dispatchEvent(this,u,"sort",g,f,u,b,t,m,a,e)),p&&p.save()):g.nextSibling!==_&&(t=v(g),a=v(g,i.draggable),t>=0&&(h._dispatchEvent(this,u,"update",g,f,u,b,t,m,a,e),h._dispatchEvent(this,u,"sort",g,f,u,b,t,m,a,e))),l.active&&(null!=t&&-1!==t||(t=b,a=m),h._dispatchEvent(this,u,"end",g,f,u,b,t,m,a,e),h.save()))),this._nulling()}_offUpEvents(){var e=this.el.ownerDocument;r.off(e,"mouseup",this._onDrop),r.off(document,"selectstart",this)}_nulling(){s=null}handleEvent(e){switch(e.type){case"drop":this._onDrop(e);break;case"dragenter":case"dragover":l.dragEl&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}}}});
//# sourceMappingURL=sourcemaps/droppable.js.map
