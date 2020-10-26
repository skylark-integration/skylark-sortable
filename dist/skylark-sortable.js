/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
!function(e,t){var o=t.define,require=t.require,r="function"==typeof o&&o.amd,n=!r&&"undefined"!=typeof exports;if(!r&&!o){var l={};o=t.define=function(e,t,o){"function"==typeof o?(l[e]={factory:o,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var o=t.split("/"),r=e.split("/");o.pop();for(var n=0;n<r.length;n++)"."!=r[n]&&(".."==r[n]?o.pop():o.push(r[n]));return o.join("/")}(t,e)}),resolved:!1,exports:null},require(e)):l[e]={factory:null,resolved:!0,exports:o}},require=t.require=function(e){if(!l.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=l[e];if(!module.resolved){var o=[];module.deps.forEach(function(e){o.push(require(e))}),module.exports=module.factory.apply(t,o)||null,module.resolved=!0}return module.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-langx-hoster/detects/browser",["../hoster"],function(e){return e.detects.browser=function(){return"undefined"!=typeof window&&void 0!==window.document?function(e){e=e.toLowerCase();var t=/(edge)\/([\w.]+)/.exec(e)||/(opr)[\/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(iemobile)[\/]([\w.]+)/.exec(e)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],o=/(ipad)/.exec(e)||/(ipod)/.exec(e)||/(windows phone)/.exec(e)||/(iphone)/.exec(e)||/(kindle)/.exec(e)||/(silk)/.exec(e)||/(android)/.exec(e)||/(win)/.exec(e)||/(mac)/.exec(e)||/(linux)/.exec(e)||/(cros)/.exec(e)||/(playbook)/.exec(e)||/(bb)/.exec(e)||/(blackberry)/.exec(e)||[],r={},n={browser:t[5]||t[3]||t[1]||"",version:t[2]||t[4]||"0",versionNumber:t[4]||t[2]||"0",platform:o[0]||""};n.browser&&(r[n.browser]=!0,r.version=n.version,r.versionNumber=parseInt(n.versionNumber,10));n.platform&&(r[n.platform]=!0);(r.android||r.bb||r.blackberry||r.ipad||r.iphone||r.ipod||r.kindle||r.playbook||r.silk||r["windows phone"])&&(r.mobile=!0);(r.cros||r.mac||r.linux||r.win)&&(r.desktop=!0);(r.chrome||r.opr||r.safari)&&(r.webkit=!0);if(r.rv||r.iemobile){n.browser="ie",r.ie=!0}if(r.edge){delete r.edge;n.browser="edge",r.edge=!0}if(r.safari&&r.blackberry){n.browser="blackberry",r.blackberry=!0}if(r.safari&&r.playbook){n.browser="playbook",r.playbook=!0}if(r.bb){var l="blackberry";n.browser=l,r[l]=!0}if(r.opr){n.browser="opera",r.opera=!0}if(r.safari&&r.android){n.browser="android",r.android=!0}if(r.safari&&r.kindle){n.browser="kindle",r.kindle=!0}if(r.safari&&r.silk){n.browser="silk",r.silk=!0}return r.name=n.browser,r.platform=n.platform,r}(navigator.userAgent):null}}),e("skylark-langx-hoster/isBrowser",["./hoster","./detects/browser"],function(e,t){return void 0==e.isBrowser&&(e.isBrowser=t()),e.isBrowser}),e("skylark-domx-layouts/oriented",["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(e,t,o,r){return function(n,l){var i=t.css(n),a=e.contentRect(n).width,s=o.childAt(n,0,l),c=o.childAt(n,1,l),d=s&&t.css(s),h=c&&t.css(c),u=s&&e.marginSize(s).width,g=c&&e.marginSize(c).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?r.Vertical:r.Horizontal;if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?r.Vertical:r.Horizontal;if(s&&"none"!==d.float){var f="left"===d.float?"left":"right";return!c||"both"!==h.clear&&h.clear!==f?r.Horizontal:r.Vertical}return s&&("block"===d.display||"flex"===d.display||"table"===d.display||"grid"===d.display||u>=a&&"none"===i.float||c&&"none"===i.float&&u+g>a)?r.Vertical:r.Horizontal}}),e("skylark-sortable/dnd",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch"],function(e,t,o,r,n,l,i,a,s,c,d,h,u,g,f){var p="Sortable"+(new Date).getTime(),v={expando:p,active:null,putSortable:null,sortables:[],dragEl:null,cloneEl:null,touchEvt:null,prepare:function(e){var t=e.el,o=t.ownerDocument;d.on(o,"dragover",this.nearestEmptyInsertDetectEvent),d.on(o,"mousemove",this.nearestEmptyInsertDetectEvent)},start:function(e,t){},over:function(){},end:function(e){},nearestEmptyInsertDetectEvent:function(e){if(v.dragEl){e=e.touches?e.touches[0]:e;var t=v._detectNearestEmptySortable(e.clientX,e.clientY);if(t){var o={};for(var r in e)o[r]=e[r];o.target=o.rootEl=t,o.preventDefault=void 0,o.stopPropagation=void 0,t[p]._onDragOver(o)}}},_detectNearestEmptySortable:function(e,t){for(var o=this.sortables,r=0;r<o.length;r++)if(!a.lastChild(o[r],{ignoreHidden:!0,excluding:[this.ghostEl]})){var n=s.boundingRect(o[r]),l=o[r][p].options.emptyInsertThreshold,i=e>=n.left-l&&e<=n.right+l,c=t>=n.top-l&&t<=n.bottom+l;if(l&&i&&c)return o[r]}},_checkAlignment:function(e){this.dragEl&&this.dragEl.parentNode&&this.dragEl.parentNode[p]&&this.dragEl.parentNode[p]._computeIsAligned(e)},_emulateDragOver:function(e){var t=this.dragEl,o=this.touchEvt;if(o){if(this._lastX===o.clientX&&this._lastY===o.clientY&&!e)return;this._lastX=o.clientX,this._lastY=o.clientY;for(var r=document.elementFromPoint(o.clientX,o.clientY),n=r;r&&r.shadowRoot&&(r=r.shadowRoot.elementFromPoint(o.clientX,o.clientY))!==n;)n=r;if(n)do{if(n[p])if(n[p]._onDragOver({clientX:o.clientX,clientY:o.clientY,target:r,rootEl:n}))break;r=n}while(n=n.parentNode);t.parentNode[p]._computeIsAligned(o)}},_onMove:function(e,t,o,r,n,l,i,a){var c,h,u=e[p],g=u.options.onMove;return c=d.create("move",{to:t,from:e,dragged:o,draggedRect:r,related:n||t,relatedRect:l||s.boundingRect(t),willInsertAfter:a,originalEvent:i}),e.dispatchEvent(c),g&&(h=g.call(u,c,i)),h},_dispatchEvent:function(e,t,o,r,n,l,i,a,s,c,h){var u,g=(e=e||t[p]).options,f="on"+o.charAt(0).toUpperCase()+o.substr(1),v=this.putSortable;u=d.create(o,{to:n||t,from:l||t,item:r||t,clone:this.cloneEl,oldIndex:i,newIndex:a,oldDraggableIndex:s,newDraggableIndex:c,originalEvent:h,pullMode:v?v.lastPutMode:void 0}),t&&t.dispatchEvent(u),g[f]&&g[f].call(e,u)}};return v}),e("skylark-sortable/autoscroll",["skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-domx-geom","skylark-domx-styler","skylark-domx-scrolls/scrollingElement","./dnd"],function(e,t,o,r,n,l){var i=[],a=!1,s=null,c=t&&t.ie,d=t&&t.edge,h=(t&&t.firefox,t&&t.safari);var u,g=function(e,t){if(!e||!e.getBoundingClientRect)return n();var o=e,l=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=r.css(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===document.body)return n();if(l||t)return o;l=!0}}}while(o=o.parentNode);return n()},f=v(function(e,t,c,d){if(t.scroll){var h=c?c[l.expando]:window,u=t.scrollSensitivity,f=t.scrollSpeed,v=e.clientX,m=e.clientY,b=n(),k=!1;s!==c&&(p(),scrollEl=t.scroll,scrollCustomFn=t.scrollFn,!0===scrollEl&&(scrollEl=g(c,!0),s=scrollEl));var y=0,x=scrollEl;do{var _,E,w,C,S,D,T,I,P,R=x,A=o.boundingRect(R),N=A.top,X=A.bottom,Y=A.left,M=A.right,O=A.width,B=A.height;if(_=R.scrollWidth,E=R.scrollHeight,w=r.css(R),I=R.scrollLeft,P=R.scrollTop,R===b?(D=O<_&&("auto"===w.overflowX||"scroll"===w.overflowX||"visible"===w.overflowX),T=B<E&&("auto"===w.overflowY||"scroll"===w.overflowY||"visible"===w.overflowY)):(D=O<_&&("auto"===w.overflowX||"scroll"===w.overflowX),T=B<E&&("auto"===w.overflowY||"scroll"===w.overflowY)),C=D&&(abs(M-v)<=u&&I+O<_)-(abs(Y-v)<=u&&!!I),S=T&&(abs(X-m)<=u&&P+B<E)-(abs(N-m)<=u&&!!P),!i[y])for(var H=0;H<=y;H++)i[H]||(i[H]={});i[y].vx==C&&i[y].vy==S&&i[y].el===R||(i[y].el=R,i[y].vx=C,i[y].vy=S,clearInterval(i[y].pid),!R||0==C&&0==S||(k=!0,i[y].pid=setInterval(function(){d&&0===this.layer&&(Sortable.active._emulateDragOver(!0),Sortable.active._onTouchMove(touchEvt,!0));var t=i[this.layer].vy?i[this.layer].vy*f:0,r=i[this.layer].vx?i[this.layer].vx*f:0;"function"==typeof scrollCustomFn&&"continue"!==scrollCustomFn.call(h,r,t,e,touchEvt,i[this.layer].el)||o.scrollBy(i[this.layer].el,r,t)}.bind({layer:y}),24))),y++}while(t.bubbleScroll&&x!==b&&(x=g(x,!1)));a=k}},30),p=function(){i.forEach(function(e){clearInterval(e.pid)}),i=[]};function v(t,o){return e.debounce(t,o)}return{autoScrolls:i,_isScrolledPast:function(e,t){var r=g(e,!0),l=o.boundingRect(e)[t];for(;r;){var i=o.boundingRect(r)[t];if(!("top"===t||"left"===t?l>=i:l<=i))return r;if(r===n())break;r=g(r,!1)}return!1},_getRelativeScrollOffset:function(e){var t=0,o=0,r=n();if(e)do{var l=transforms.matrix(e),i=l.a,a=l.d;t+=e.scrollLeft*i,o+=e.scrollTop*a}while(e!==r&&(e=e.parentNode));return[t,o]},_autoScroll:f,_clearAutoScrolls:p,_handleAutoScroll:function(e,t,o){var r=e.clientX,l=e.clientY,i=document.elementFromPoint(r,l);if(o||d||c||h){u=f(e,t,i,o);var s=g(i,!0);!a||pointerElemChangedInterval&&r===lastPointerElemX&&l===lastPointerElemY||(pointerElemChangedInterval&&clearInterval(pointerElemChangedInterval),pointerElemChangedInterval=setInterval(function(){if(dragEl){var n=g(document.elementFromPoint(r,l),!0);n!==s&&(s=n,p(),u=f(e,t,s,o))}},10),lastPointerElemX=r,lastPointerElemY=l)}else{if(!t.bubbleScroll||g(i,!0)===n())return void p();u=f(e,t,g(i,!1),!1)}},_throttle:v,_cancelThrottle:function(){u&&u.stop&&(u.stop(),u=void 0)}}}),e("skylark-sortable/containers",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./dnd"],function(e,t,o,r,n,l,i,a,s,c,d,h,u,g,f,p,v){return{_index:function(e,t){return a.index(e,function(e){return!("TEMPLATE"===e.nodeName.toUpperCase()||e===v.cloneEl||t&&!a.matches(e,t))})},_isElInRowColumn:function(e,t,o){v.dragEl;var r=s.boundingRect(e),n=s.boundingRect(t),l="vertical"===o?r.left:r.top,i="vertical"===o?r.right:r.bottom,a="vertical"===o?r.width:r.height,c="vertical"===o?n.left:n.top,d="vertical"===o?n.right:n.bottom,h="vertical"===o?n.width:n.height;return l===c||i===d||l+a/2===c+h/2},_isClientInRowColumn:function(e,t,o,r,n){var l=s.boundingRect(o),i="vertical"===r?l.left:l.top,a="vertical"===r?l.right:l.bottom,c="vertical"===r?e:t;return i<c&&c<a}}}),e("skylark-sortable/ghoster",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch"],function(e,t,o,r,n,l,i,a,s,c,d,h,u,g,f){function p(e,t,o,r){if(e.getBoundingClientRect||e===window){var{top:n,left:l,bottom:i,right:a,width:c,height:d}=s.boundingRect(e);if(t&&e!==window){var u=h.matrix(o||e),g=u&&u.a,f=u&&u.d;u&&(i=(n/=f)+(d/=f),a=(l/=g)+(c/=g))}return{top:n,left:l,bottom:i,right:a,width:c,height:d}}}var v={ghostEl:null,PositionGhostAbsolutely:r.apple.device,ghostRelativeParent:null,ghostRelativeParentInitialScroll:[],_ghostIsLast:function(e,t,o){var r=s.boundingRect(a.lastChild(o,{ignoreHidden:!0,excluding:[this.ghostEl]})),n="vertical"===t?e.clientY:e.clientX,l="vertical"===t?e.clientX:e.clientY,i="vertical"===t?r.bottom:r.right,c="vertical"===t?r.left:r.top,d="vertical"===t?r.right:r.bottom;return"vertical"===t?l>d+10||l<=d&&n>i&&l>=c:n>i&&l>c||n<=i&&l>d+10},_lastChild:function(e){return a.lastChild(e,{ignoreHidden:!0,excluding:[this.ghostEl]})},_appendGhost:function(e,t,o){var r=this.ghostEl;if(!r){var n=p(e,!0,t,!this.PositionGhostAbsolutely);c.css(e);if(this.PositionGhostAbsolutely){for(var l=this.ghostRelativeParent=t;"static"===c.css(l,"position")&&"none"===c.css(l,"transform")&&l!==document;)l=l.parentNode;if(l!==document){var i=p(l,!0);n.top-=i.top,n.left-=i.left}l!==document.body&&l!==document.documentElement?(l===document&&(l=this.ghostRelativeParent=u()),n.top+=l.scrollTop,n.left+=l.scrollLeft):l=this.ghostRelativeParent=u(),ghostRelativeParentInitialScroll=autoscroll._getRelativeScrollOffset(l)}r=this.ghostEl=e.cloneNode(!0),c.toggleClass(r,o.ghostClass,!1),c.toggleClass(r,o.fallbackClass,!0),c.toggleClass(r,o.dragClass,!0),c.css(r,"box-sizing","border-box"),c.css(r,"margin",0),c.css(r,"top",n.top),c.css(r,"left",n.left),c.css(r,"width",n.width),c.css(r,"height",n.height),c.css(r,"opacity","0.8"),c.css(r,"position",this.PositionGhostAbsolutely?"absolute":"fixed"),c.css(r,"zIndex","100000"),c.css(r,"pointerEvents","none"),t.appendChild(r)}},getRelativeScrollOffset:function(){return this.PositionGhostAbsolutely&&this.ghostRelativeParent&&autoscroll._getRelativeScrollOffset(this.ghostRelativeParent)}};return v}),e("skylark-sortable/Sortable",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./containers","./dnd","./ghoster"],function(e,t,o,r,n,l,i,a,s,c,d,h,u,g,f,p,v,m,b){function k(e,t){n("#console").append("<div>"+e+":"+t+"</div>")}var y,x,_,E,w,C,S,D,T,I,P,R,A,N,X,Y,M=!1,O=!1,B=!1,H=!1,F=window,G=F.document,z=F.parseInt,L=F.setTimeout,q=(F.Polymer,o&&o.ie),W=o&&o.edge,j=o&&o.firefox,U=o&&o.safari,V=(r&&r.apple.device,"draggable"in G.createElement("div")&&!r.apple.device);l.support.cssPointerEvents;function Z(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,o=t.length,r=0;o--;)r+=t.charCodeAt(o);return r.toString(36)}function J(e){return t.defer(e)}function K(e){return e&&e.stop()}function Q(e,o){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(e);this.el=e,this.options=o=t.mixin({},o),e[m.expando]=this;var r={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable:/[uo]l/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(o,r,n,l){return g(e,t.mixin({excluding:[l,n]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:z(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==Q.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var n in r)!(n in o)&&(o[n]=r[n]);for(var l in _prepareGroup(o),this)"_"===l.charAt(0)&&"function"==typeof this[l]&&(this[l]=this[l].bind(this));this.nativeDraggable=!o.forceFallback&&V,this.nativeDraggable&&(this.options.touchStartThreshold=1),f.mousy(e),d.on(e,"mousedown",this._onTapStart),this.nativeDraggable&&(d.on(e,"dragover",this),d.on(e,"dragenter",this)),m.sortables.push(this.el),o.store&&o.store.get&&this.sort(o.store.get(this)||[])}function $(e){e.draggable=!1}function ee(){_silent=!1}return _silent=!1,_alignedSilent=!1,abs=Math.abs,min=Math.min,max=Math.max,savedInputChecked=[],_prepareGroup=function(e){function t(e,o){return function(r,n,l,i){var a=r.options.group.name&&n.options.group.name&&r.options.group.name===n.options.group.name;if(null==e&&(o||a))return!0;if(null==e||!1===e)return!1;if(o&&"clone"===e)return e;if("function"==typeof e)return t(e(r,n,l,i),o)(r,n,l,i);var s=(o?r:n).options.group.name;return!0===e||"string"==typeof e&&e===s||e.join&&e.indexOf(s)>-1}}var o={},r=e.group;r&&"object"==typeof r||(r={name:r}),o.name=r.name,o.checkPull=t(r.pull,!0),o.checkPut=t(r.put),o.revertClone=r.revertClone,e.group=o},G.addEventListener("click",function(e){if(O)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),O=!1,!1},!0),d.on(G,"touchmove",function(e){(Q.active||M)&&e.cancelable&&e.preventDefault()}),Q.prototype={constructor:Q,_computeIsAligned:function(e){var t,o=m.dragEl;if(t=e.target,t=a.closest(t,this.options.draggable,this.el,!1),!_alignedSilent&&o&&o.parentNode===this.el){for(var r=this.el.children,n=0;n<r.length;n++)a.closest(r[n],this.options.draggable,this.el,!1)&&r[n]!==t&&(r[n].sortableMouseAligned=v._isClientInRowColumn(e.clientX,e.clientY,r[n],this._getDirection(e,null),this.options));a.closest(t,this.options.draggable,this.el,!0)||(A=null),_alignedSilent=!0,L(function(){_alignedSilent=!1},30)}},_getDirection:function(e,t){var o=m.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,o,b.ghostEl):this.options.direction},_onTapStart:function(e){var t,o,r=this,n=this.el,l=this.options,i=l.preventOnFilter,s=e.type,c=e.touches&&e.touches[0],d=(c||e).target,h=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||d,u=l.filter;if(function(e){savedInputChecked.length=0;var t=e.getElementsByTagName("input"),o=t.length;for(;o--;){var r=t[o];r.checked&&savedInputChecked.push(r)}}(n),!m.dragEl&&!(/mousedown|pointerdown/.test(s)&&0!==e.button||l.disabled||h.isContentEditable||(d=a.closest(d,l.draggable,n,!1),E===d))){if(k("_onTapStart",d.tagName+","+d.className),t=v._index(d),o=v._index(d,l.draggable),"function"==typeof u){if(u.call(this,e,d,this))return m._dispatchEvent(r,h,"filter",d,n,n,t,void 0,o),void(i&&e.cancelable&&e.preventDefault())}else if(u&&(u=u.split(",").some(function(e){if(e=a.closest(h,e.trim(),n,!1))return m._dispatchEvent(r,e,"filter",d,n,n,t,void 0,o),!0})))return void(i&&e.cancelable&&e.preventDefault());l.handle&&!a.closest(h,l.handle,n,!1)||this._prepareDragStart(e,c,d,t,o)}},_handleAutoScroll:function(e,t){if(m.dragEl&&this.options.scroll)return p._handleAutoScroll(e,this.options,t)},_prepareDragStart:function(e,t,o,r,n){var l,i=this,a=i.el,s=i.options,h=a.ownerDocument,u=m.dragEl;k("_prepareDragStart","start"),o&&!u&&o.parentNode===a&&(x=a,u=m.dragEl=o,y=u.parentNode,_=u.nextSibling,E=o,T=s.group,w=r,S=n,P={target:u,clientX:(t||e).clientX,clientY:(t||e).clientY},this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,u.style["will-change"]="all",u.style.transition="",u.style.transform="",l=function(){i._disableDelayedDragEvents(),!j&&i.nativeDraggable&&(u.draggable=!0),i._triggerDragStart(e,t),m._dispatchEvent(i,x,"choose",u,x,x,w,void 0,S),c.toggleClass(u,s.chosenClass,!0)},s.ignore.split(",").forEach(function(e){!function(e,t,o){if(e){var r=e.getElementsByTagName(t),n=0,l=r.length;if(o)for(;n<l;n++)o(r[n],n);return r}}(u,e.trim(),$)}),m.prepare(this),d.on(h,"mouseup",i._onDrop),j&&this.nativeDraggable&&(this.options.touchStartThreshold=4,u.draggable=!0),!s.delay||s.delayOnTouchOnly&&!t||this.nativeDraggable&&(W||q)?l():(d.on(h,"mouseup",i._disableDelayedDrag),d.on(h,"mousemove",i._delayedDragTouchMoveHandler),i._dragStartTimer=L(l,s.delay)))},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;max(abs(t.clientX-this._lastX),abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){m.dragEl&&$(m.dragEl),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;d.off(e,"mouseup",this._disableDelayedDrag),d.off(e,"mousemove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){k("_triggerDragStart","start"),k("_triggerDragStart","nativeDraggable is "+this.nativeDraggable),this.nativeDraggable?(d.on(m.dragEl,"dragend",this),d.on(x,"dragstart",this._onDragStart)):d.on(G,"mousemove",this._onTouchMove);try{G.selection?J(function(){G.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){M=!1;var o=m.dragEl;if(x&&o){this.nativeDraggable&&(d.on(G,"dragover",this._handleAutoScroll),d.on(G,"dragover",m._checkAlignment));var r=this.options;!e&&c.toggleClass(o,r.dragClass,!1),c.toggleClass(o,r.ghostClass,!0),c.css(o,"transform",""),m.active=this,e&&this._appendGhost(),m._dispatchEvent(this,x,"start",o,x,x,w,void 0,S,void 0,t)}else this._nulling()},_onTouchMove:function(e,t){k("_onTouchMove","start");var o=b.ghostEl;if(P){var r=this.options,n=r.fallbackTolerance,l=r.fallbackOffset,i=e.touches?e.touches[0]:e,a=o&&h.matrix(o),s=o&&a&&a.a,d=o&&a&&a.d,u=b.getRelativeScrollOffset(),g=(i.clientX-P.clientX+l.x)/(s||1)+(u?u[0]-ghostRelativeParentInitialScroll[0]:0)/(s||1),f=(i.clientY-P.clientY+l.y)/(d||1)+(u?u[1]-ghostRelativeParentInitialScroll[1]:0)/(d||1),p=e.touches?"translate3d("+g+"px,"+f+"px,0)":"translate("+g+"px,"+f+"px)";if(!m.active&&!M){if(n&&min(abs(i.clientX-this._lastX),abs(i.clientY-this._lastY))<n)return;this._onDragStart(e,!0)}!t&&this._handleAutoScroll(i,!0),R=!0,m.touchEvt=i,o&&(c.css(o,"webkitTransform",p),c.css(o,"mozTransform",p),c.css(o,"msTransform",p),c.css(o,"transform",p)),e.preventDefault()}},_appendGhost:function(){var e=this.options.fallbackOnBody?G.body:x;return b._appendGhost(m.dragEl,e,this.options)},_animate:function(e,t){var o=this.options.animation,r=m.dragEl;if(o){var n=s.boundingRect(t);if(t===r&&n,1===e.nodeType&&(e=s.boundingRect(e)),e.left+e.width/2!==n.left+n.width/2||e.top+e.height/2!==n.top+n.height/2){var l=h.matrix(this.el),i=l&&l.a,a=l&&l.d;c.css(t,"transition","none"),c.css(t,"transform","translate3d("+(e.left-n.left)/(i||1)+"px,"+(e.top-n.top)/(a||1)+"px,0)"),this._repaint(t),c.css(t,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),c.css(t,"transform","translate3d(0,0,0)")}"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=L(function(){c.css(t,"transition",""),c.css(t,"transform",""),t.animated=!1},o)}},_repaint:function(e){return e.offsetWidth},_offMoveEvents:function(){d.off(G,"dragover",m.nearestEmptyInsertDetectEvent),d.off(G,"mousemove",m.nearestEmptyInsertDetectEvent)},_offUpEvents:function(){var e=this.el.ownerDocument;d.off(e,"mouseup",this._onDrop),d.off(G,"selectstart",this)},_onDragStart:function(e,t){var o=this,r=m.dragEl,n=e.dataTransfer,l=o.options,a=m.cloneEl=i.clone(r,!0);a.draggable=!1,a.style["will-change"]="",this._hideClone(),c.toggleClass(a,o.options.chosenClass,!1),o._cloneId=J(function(){o.options.removeCloneOnHide||x.insertBefore(a,r),m._dispatchEvent(o,x,"clone",r)}),!t&&c.toggleClass(r,l.dragClass,!0),t?(O=!0,o._loopId=setInterval(m._emulateDragOver.bind(m),50)):(d.off(G,"mouseup",o._onDrop),n&&(n.effectAllowed="move",l.setData&&l.setData.call(o,n,r)),d.on(G,"drop",o),c.css(r,"transform","translateZ(0)")),M=!0,o._dragStartId=J(o._dragStarted.bind(o,t,e)),d.on(G,"selectstart",o),U&&c.css(G.body,"user-select","none")},_onDragOver:function(e){var t,o,r,n=this.el,l=e.target,i=this.options,d=i.group,h=m.active,u=T===d,g=i.sort,f=this,k=m.dragEl,E=m.putSortable;if(!_silent){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),R=!0,l=a.closest(l,i.draggable,n,!0),k.contains(e.target)||l.animated)return Z(!1);if(l!==k&&(O=!1),h&&!i.disabled&&(u?g||(r=!x.contains(k)):E===this||(this.lastPutMode=T.checkPull(this,h,k,e))&&d.checkPut(this,h,k,e))){var C=this._getDirection(e,l);if(t=s.boundingRect(k),r)return this._hideClone(),y=x,_?x.insertBefore(k,_):x.appendChild(k),Z(!0);var D=b._lastChild(n);if(!D||b._ghostIsLast(e,C,n)&&!D.animated){if(D&&n===e.target&&(l=D),l&&(o=s.boundingRect(l)),u?h._hideClone():h._showClone(this),!1!==m._onMove(x,n,k,t,l,o,e,!!l))return n.appendChild(k),y=n,null,J(),Z(!0)}else if(l&&l!==k&&l.parentNode===n){var I,P=0,M=l.sortableMouseAligned,F=k.parentNode!==n,z="vertical"===C?"top":"left",q=p._isScrolledPast(l,"top")||p._isScrolledPast(k,"top"),W=q?q.scrollTop:void 0;if(A!==l&&(X=null,I=s.boundingRect(l)[z],B=!1),v._isElInRowColumn(k,l,C)&&M||F||q||i.invertSwap||"insert"===X||"swap"===X?("swap"!==X&&(H=i.invertSwap||F),P=function(e,t,o,r,n,l,i){var a=s.boundingRect(t),c="vertical"===o?e.clientY:e.clientX,d="vertical"===o?a.height:a.width,h="vertical"===o?a.top:a.left,u="vertical"===o?a.bottom:a.right,g=s.boundingRect(k),f=!1;if(!l)if(i&&Y<d*r)if(!B&&(1===N?c>h+d*n/2:c<u-d*n/2)&&(B=!0),B)f=!0;else{"vertical"===o?g.top:g.left,"vertical"===o?g.bottom:g.right;if(1===N?c<h+Y:c>u-Y)return-1*N}else if(c>h+d*(1-r)/2&&c<u-d*(1-r)/2)return K(t);if((f=f||l)&&(c<h+d*n/2||c>u-d*n/2))return c>h+d/2?1:-1;return 0}(e,l,C,i.swapThreshold,null==i.invertedSwapThreshold?i.swapThreshold:i.invertedSwapThreshold,H,A===l),X="swap"):(P=K(l),X="insert"),0===P)return Z(!1);null,A=l,N=P,o=s.boundingRect(l);var j=l.nextElementSibling,U=!1;U=1===P;var V=m._onMove(x,n,k,t,l,o,e,U);if(!1!==V)return 1!==V&&-1!==V||(U=1===V),_silent=!0,L(ee,30),u?h._hideClone():h._showClone(this),U&&!j?n.appendChild(k):l.parentNode.insertBefore(k,U?j:l),q&&s.scrollBy(q,0,W-q.scrollTop),y=k.parentNode,void 0===I||H||(Y=abs(I-s.boundingRect(l)[z])),J(),Z(!0)}if(n.contains(k))return Z(!1)}return!1}function Z(r){return r&&(u?h._hideClone():h._showClone(f),h&&(c.toggleClass(k,E?E.options.ghostClass:h.options.ghostClass,!1),c.toggleClass(k,i.ghostClass,!0)),E!==f&&f!==m.active?E=m.putSortable=f:f===m.active&&(E=m.putSortable=null),t&&f._animate(t,k),l&&o&&f._animate(o,l)),(l===k&&!k.animated||l===n&&!l.animated)&&(A=null),i.dragoverBubble||e.rootEl||l===G||(f._handleAutoScroll(e),k.parentNode[m.expando]._computeIsAligned(e),!r&&m.nearestEmptyInsertDetectEvent(e)),!i.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function J(){m._dispatchEvent(f,x,"change",l,n,x,w,v._index(k),S,v._index(k,i.draggable),e)}function K(e){var t=v._index(k),o=v._index(e);return t<o?1:-1}},_onDrop:function(e){var t=this.el,o=this.options,r=m.dragEl,n=m.putSortable;M=!1,scrolling=!1,H=!1,B=!1,clearInterval(this._loopId),clearInterval(I),p._clearAutoScrolls(),p._cancelThrottle(),clearTimeout(this._dragStartTimer),K(this._cloneId),K(this._dragStartId),d.off(G,"mousemove",this._onTouchMove),this.nativeDraggable&&(d.off(G,"drop",this),d.off(t,"dragstart",this._onDragStart),d.off(G,"dragover",this._handleAutoScroll),d.off(G,"dragover",m._checkAlignment)),U&&c.css(G.body,"user-select",""),this._offMoveEvents(),this._offUpEvents(),e&&(R&&(e.cancelable&&e.preventDefault(),!o.dropBubble&&e.stopPropagation()),b.ghostEl&&b.ghostEl.parentNode&&b.ghostEl.parentNode.removeChild(b.ghostEl),(x===y||n&&"clone"!==n.lastPutMode)&&m.cloneEl&&m.cloneEl.parentNode&&m.cloneEl.parentNode.removeChild(m.cloneEl),r&&(this.nativeDraggable&&d.off(r,"dragend",this),$(r),r.style["will-change"]="",c.toggleClass(r,n?n.options.ghostClass:this.options.ghostClass,!1),c.toggleClass(r,this.options.chosenClass,!1),m._dispatchEvent(this,x,"unchoose",r,y,x,w,null,S,null,e),x!==y?(C=v._index(r),D=v._index(r,o.draggable),C>=0&&(m._dispatchEvent(null,y,"add",r,y,x,w,C,S,D,e),m._dispatchEvent(this,x,"remove",r,y,x,w,C,S,D,e),m._dispatchEvent(null,y,"sort",r,y,x,w,C,S,D,e),m._dispatchEvent(this,x,"sort",r,y,x,w,C,S,D,e)),n&&n.save()):r.nextSibling!==_&&(C=v._index(r),D=v._index(r,o.draggable),C>=0&&(m._dispatchEvent(this,x,"update",r,y,x,w,C,S,D,e),m._dispatchEvent(this,x,"sort",r,y,x,w,C,S,D,e))),m.active&&(null!=C&&-1!==C||(C=w,D=S),m._dispatchEvent(this,x,"end",r,y,x,w,C,S,D,e),this.save()))),this._nulling()},_nulling:function(){x=m.dragEl=y=b.ghostEl=_=m.cloneEl=E=p.scrollParentEl=p.autoScrolls.length=I=P=m.touchEvt=R=C=w=A=N=m.putSortable=T=m.active=null,savedInputChecked.forEach(function(e){e.checked=!0}),savedInputChecked.length=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":m.dragEl&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move");e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],o=this.el.children,r=0,n=o.length,l=this.options;r<n;r++)e=o[r],a.closest(e,l.draggable,this.el,!1)&&t.push(e.getAttribute(l.dataIdAttr)||Z(e));return t},sort:function(e){var t={},o=this.el;this.toArray().forEach(function(e,r){var n=o.children[r];a.closest(n,this.options.draggable,o,!1)&&(t[e]=n)},this),e.forEach(function(e){t[e]&&(o.removeChild(t[e]),o.appendChild(t[e]))})},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return a.closest(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var o=this.options;if(void 0===t)return o[e];o[e]=t,"group"===e&&_prepareGroup(o)},destroy:function(){var e=this.el;e[m.expando]=null,d.off(e,"mousedown",this._onTapStart),this.nativeDraggable&&(d.off(e,"dragover",this),d.off(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),m.sortables.splice(m.sortables.indexOf(this.el),1),this.el=e=null},_hideClone:function(){m.cloneEl.cloneHidden||(c.css(m.cloneEl,"display","none"),m.cloneEl.cloneHidden=!0,m.cloneEl.parentNode&&this.options.removeCloneOnHide&&m.cloneEl.parentNode.removeChild(m.cloneEl))},_showClone:function(e){"clone"===e.lastPutMode?m.cloneEl.cloneHidden&&(x.contains(m.dragEl)&&!this.options.group.revertClone?x.insertBefore(m.cloneEl,m.dragEl):_?x.insertBefore(m.cloneEl,_):x.appendChild(m.cloneEl),this.options.group.revertClone&&this._animate(m.dragEl,m.cloneEl),c.css(m.cloneEl,"display",""),m.cloneEl.cloneHidden=!1):this._hideClone()}},Q.create=function(e,t){return new Q(e,t)},Q.version="1.9.0",e.attach("intg.Sortable",Q)}),e("skylark-sortable/main",["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./autoscroll","./containers","./Sortable"],function(e,t,o,r,n,l,i,a){return a.utils={on:t.on,off:t.off,css:n.css,is:function(e,t){return!!o.closest(e,t,e,!1)},extend:e.mixin,throttle:l._throttle,closest:o.closest,toggleClass:n.toggleClass,clone:function(e){return r.clone(e,!0)},index:i._index,getChild:function(e,t,r){return r.excluding=[],r.closesting=r.draggable,o.childAt(e,t,r)}},a}),e("skylark-sortable",["skylark-sortable/main"],function(e){return e})}(o),!r){var i=require("skylark-langx-ns");n?module.exports=i:t.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map