/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
!function(t,e){var o=e.define,require=e.require,r="function"==typeof o&&o.amd,n=!r&&"undefined"!=typeof exports;if(!r&&!o){var l={};o=e.define=function(t,e,o){"function"==typeof o?(l[t]={factory:o,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var o=e.split("/"),r=t.split("/");o.pop();for(var n=0;n<r.length;n++)"."!=r[n]&&(".."==r[n]?o.pop():o.push(r[n]));return o.join("/")}(e,t)}),resolved:!1,exports:null},require(t)):l[t]={factory:null,resolved:!0,exports:o}},require=e.require=function(t){if(!l.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var module=l[t];if(!module.resolved){var o=[];module.deps.forEach(function(t){o.push(require(t))}),module.exports=module.factory.apply(e,o)||null,module.resolved=!0}return module.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,require){t("skylark-langx-hoster/detects/browser",["../hoster"],function(t){return t.detects.browser=function(){return"undefined"!=typeof window&&void 0!==window.document?function(t){t=t.toLowerCase();var e=/(edge)\/([\w.]+)/.exec(t)||/(opr)[\/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(iemobile)[\/]([\w.]+)/.exec(t)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(t)||/(webkit)[ \/]([\w.]+)/.exec(t)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||t.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(t)||t.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(t)||[],o=/(ipad)/.exec(t)||/(ipod)/.exec(t)||/(windows phone)/.exec(t)||/(iphone)/.exec(t)||/(kindle)/.exec(t)||/(silk)/.exec(t)||/(android)/.exec(t)||/(win)/.exec(t)||/(mac)/.exec(t)||/(linux)/.exec(t)||/(cros)/.exec(t)||/(playbook)/.exec(t)||/(bb)/.exec(t)||/(blackberry)/.exec(t)||[],r={},n={browser:e[5]||e[3]||e[1]||"",version:e[2]||e[4]||"0",versionNumber:e[4]||e[2]||"0",platform:o[0]||""};n.browser&&(r[n.browser]=!0,r.version=n.version,r.versionNumber=parseInt(n.versionNumber,10));n.platform&&(r[n.platform]=!0);(r.android||r.bb||r.blackberry||r.ipad||r.iphone||r.ipod||r.kindle||r.playbook||r.silk||r["windows phone"])&&(r.mobile=!0);(r.cros||r.mac||r.linux||r.win)&&(r.desktop=!0);(r.chrome||r.opr||r.safari)&&(r.webkit=!0);if(r.rv||r.iemobile){n.browser="ie",r.ie=!0}if(r.edge){delete r.edge;n.browser="edge",r.edge=!0}if(r.safari&&r.blackberry){n.browser="blackberry",r.blackberry=!0}if(r.safari&&r.playbook){n.browser="playbook",r.playbook=!0}if(r.bb){var l="blackberry";n.browser=l,r[l]=!0}if(r.opr){n.browser="opera",r.opera=!0}if(r.safari&&r.android){n.browser="android",r.android=!0}if(r.safari&&r.kindle){n.browser="kindle",r.kindle=!0}if(r.safari&&r.silk){n.browser="silk",r.silk=!0}return r.name=n.browser,r.platform=n.platform,r}(navigator.userAgent):null}}),t("skylark-langx-hoster/isBrowser",["./hoster","./detects/browser"],function(t,e){return void 0==t.isBrowser&&(t.isBrowser=e()),t.isBrowser}),t("skylark-sortable/fallback/autoscroll",["skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-domx-geom","skylark-domx-styler","skylark-domx-scrolls/scrollingElement"],function(t,e,o,r,n){"use strict";var l,i,a,s,c,d=[],h=!1,u=null,g=e&&e.ie,f=e&&e.edge,p=(e&&e.firefox,e&&e.safari);var v,b=function(t,e){if(!t||!t.getBoundingClientRect)return n();var o=t,l=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=r.css(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===document.body)return n();if(l||e)return o;l=!0}}}while(o=o.parentNode);return n()},m=y(function(t,e,a,s,c){if(e.scroll){var g=a?a[c]:window,f=e.scrollSensitivity,p=e.scrollSpeed,v=t.clientX,m=t.clientY,y=n(),x=!1;u!==a&&(k(),l=e.scroll,i=e.scrollFn,!0===l&&(l=b(a,!0),u=l));var w=0,_=l;do{var E,D,S,C,I,R,T,P,A,N=_,M=o.boundingRect(N),X=M.top,Y=M.bottom,O=M.left,B=M.right,H=M.width,G=M.height;if(E=N.scrollWidth,D=N.scrollHeight,S=r.css(N),P=N.scrollLeft,A=N.scrollTop,N===y?(R=H<E&&("auto"===S.overflowX||"scroll"===S.overflowX||"visible"===S.overflowX),T=G<D&&("auto"===S.overflowY||"scroll"===S.overflowY||"visible"===S.overflowY)):(R=H<E&&("auto"===S.overflowX||"scroll"===S.overflowX),T=G<D&&("auto"===S.overflowY||"scroll"===S.overflowY)),C=R&&(Math.abs(B-v)<=f&&P+H<E)-(Math.abs(O-v)<=f&&!!P),I=T&&(Math.abs(Y-m)<=f&&A+G<D)-(Math.abs(X-m)<=f&&!!A),!d[w])for(var z=0;z<=w;z++)d[z]||(d[z]={});d[w].vx==C&&d[w].vy==I&&d[w].el===N||(d[w].el=N,d[w].vx=C,d[w].vy=I,clearInterval(d[w].pid),!N||0==C&&0==I||(x=!0,d[w].pid=setInterval(function(){var e=d[this.layer].vy?d[this.layer].vy*p:0,r=d[this.layer].vx?d[this.layer].vx*p:0;"function"==typeof i&&"continue"!==i.call(g,r,e,t,touchEvt,d[this.layer].el)||o.scrollBy(d[this.layer].el,r,e)}.bind({layer:w}),24))),w++}while(e.bubbleScroll&&_!==y&&(_=b(_,!1)));h=x}},30),k=function(){d.forEach(function(t){clearInterval(t.pid)}),d=[]};function y(e,o){return t.debounce(e,o)}return{autoScrolls:d,_isScrolledPast:function(t,e){var r=b(t,!0),l=o.boundingRect(t)[e];for(;r;){var i=o.boundingRect(r)[e];if(!("top"===e||"left"===e?l>=i:l<=i))return r;if(r===n())break;r=b(r,!1)}return!1},_getRelativeScrollOffset:function(t){var e=0,o=0,r=n();if(t)do{var l=transforms.matrix(t),i=l.a,a=l.d;e+=t.scrollLeft*i,o+=t.scrollTop*a}while(t!==r&&(t=t.parentNode));return[e,o]},_autoScroll:m,_clearAutoScrolls:k,_handleAutoScroll:function(t,e,o,r){var l=t.clientX,i=t.clientY,d=document.elementFromPoint(l,i);if(o||f||g||p){v=m(t,e,d,o,r);var u=b(d,!0);!h||a&&l===s&&i===c||(a&&clearInterval(a),a=setInterval(function(){var r=b(document.elementFromPoint(l,i),!0);r!==u&&(u=r,k(),v=m(t,e,u,o))},10),s=l,c=i)}else{if(!e.bubbleScroll||b(d,!0)===n())return void k();v=m(t,e,b(d,!1),!1)}},_throttle:y,_cancelThrottle:function(){v&&v.stop&&(v.stop(),v=void 0)},_nulling:function(){a&&clearInterval(a),a=null,s=null,c=null,this.scrollEl=this.scrollParentEl=this.autoScrolls.length=null}}}),t("skylark-domx-layouts/oriented",["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(t,e,o,r){return function(n,l){var i=e.css(n),a=t.contentRect(n).width,s=o.childAt(n,0,l),c=o.childAt(n,1,l),d=s&&e.css(s),h=c&&e.css(c),u=s&&t.marginSize(s).width,g=c&&t.marginSize(c).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?r.Vertical:r.Horizontal;if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?r.Vertical:r.Horizontal;if(s&&"none"!==d.float){var f="left"===d.float?"left":"right";return!c||"both"!==h.clear&&h.clear!==f?r.Horizontal:r.Vertical}return s&&("block"===d.display||"flex"===d.display||"table"===d.display||"grid"===d.display||u>=a&&"none"===i.float||c&&"none"===i.float&&u+g>a)?r.Vertical:r.Horizontal}}),t("skylark-sortable/fallback/ghoster",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch"],function(t,e,o,r,n,l,i,a,s,c,d,h,u,g,f){"use strict";function p(t,e,o,r){if(t.getBoundingClientRect||t===window){var{top:n,left:l,bottom:i,right:a,width:c,height:d}=s.boundingRect(t);if(e&&t!==window){var u=h.matrix(o||t),g=u&&u.a,f=u&&u.d;u&&(i=(n/=f)+(d/=f),a=(l/=g)+(c/=g))}return{top:n,left:l,bottom:i,right:a,width:c,height:d}}}var v={ghostEl:null,PositionGhostAbsolutely:r.apple.device,ghostRelativeParent:null,ghostRelativeParentInitialScroll:[],_appendGhost:function(t,e,o){var r=this.ghostEl;if(!r){var n=p(t,!0,e,!this.PositionGhostAbsolutely);c.css(t);if(this.PositionGhostAbsolutely){for(var l=this.ghostRelativeParent=e;"static"===c.css(l,"position")&&"none"===c.css(l,"transform")&&l!==document;)l=l.parentNode;if(l!==document){var i=p(l,!0);n.top-=i.top,n.left-=i.left}l!==document.body&&l!==document.documentElement?(l===document&&(l=this.ghostRelativeParent=u()),n.top+=l.scrollTop,n.left+=l.scrollLeft):l=this.ghostRelativeParent=u(),ghostRelativeParentInitialScroll=autoscroll._getRelativeScrollOffset(l)}r=this.ghostEl=t.cloneNode(!0),c.toggleClass(r,o.ghostClass,!1),c.toggleClass(r,o.fallbackClass,!0),c.toggleClass(r,o.dragClass,!0),c.css(r,{"box-sizing":"border-box",margin:0,top:n.top,left:n.left,width:n.width,height:n.height,opacity:"0.8",position:this.PositionGhostAbsolutely?"absolute":"fixed",zIndex:"100000",pointerEvents:"none"}),e.appendChild(r)}},getRelativeScrollOffset:function(){return this.PositionGhostAbsolutely&&this.ghostRelativeParent&&autoscroll._getRelativeScrollOffset(this.ghostRelativeParent)},remove:function(){this.ghostEl&&i.remove(this.ghostEl),this.ghostEl=null}};return v}),t("skylark-sortable/fallback/MousedDragDrop",["skylark-langx/langx","skylark-domx-query","skylark-domx-eventer","skylark-domx-styler","skylark-domx-transforms","./ghoster","./autoscroll"],function(t,e,o,r,n,l,i){var a=t.Emitter.inherit({_construct:function(t){this.dnd=t;var o=e(document);this.listenTo(o,"mousemove",this._onTouchMove.bind(this)),this.listenTo(o,"mouseup",this._onMouseUp.bind(this))},_onMouseUp:function(t){var e=this.dnd;e.putSortable&&e.putSortable._onDrop(t),e.active&&e.active._onDragEnd(t),l.remove(),this.destroy()},_onTouchMove:function(t,e){var o=this.dnd,i=l.ghostEl,a=o.active,s=a.dragEl,c=o.tapEvt;if(c){var d=a.options,h=d.fallbackTolerance,u=d.fallbackOffset,g=t.touches?t.touches[0]:t,f=i&&n.matrix(i),p=i&&f&&f.a,v=i&&f&&f.d,b=l.getRelativeScrollOffset(),m=(g.clientX-c.clientX+u.x)/(p||1)+(b?b[0]-ghostRelativeParentInitialScroll[0]:0)/(p||1),k=(g.clientY-c.clientY+u.y)/(v||1)+(b?b[1]-ghostRelativeParentInitialScroll[1]:0)/(v||1),y=t.touches?"translate3d("+m+"px,"+k+"px,0)":"translate("+m+"px,"+k+"px)";if(!this._dragStarted&&!o.awaitingDragStarted){if(h&&Math.min(Math.abs(g.clientX-a._lastX),Math.abs(g.clientY-a._lastY))<h)return;a._onDragStart(t,!0),l._appendGhost(s,document.body,a.options),o.ignoreNextClick=!0,this._dragStarted=!0,this._loopId=setInterval(this._emulateDragOver.bind(this),50)}!e&&this._handleAutoScroll(g,!0),o.touchEvt=g,i&&r.css(i,"transform",y),t.preventDefault()}},_emulateDragOver:function(t){var e=this.dnd,o=e.active.dragEl,r=e.touchEvt;if(r){if(this._lastX===r.clientX&&this._lastY===r.clientY&&!t)return;this._lastX=r.clientX,this._lastY=r.clientY;for(var n=document.elementFromPoint(r.clientX,r.clientY),l=n;n&&n.shadowRoot&&(n=n.shadowRoot.elementFromPoint(r.clientX,r.clientY))!==l;)l=n;if(l)do{if(l[e.expando])if(l[e.expando]._onDragOver({clientX:r.clientX,clientY:r.clientY,target:n,rootEl:l}))break;n=l}while(l=l.parentNode);o.parentNode[e.expando]._computeIsAligned(r)}},_handleAutoScroll:function(t,e){var o=this.dnd;if(o.active.dragEl&&o.active.options.scroll)return i._handleAutoScroll(t,o.active.options,e,o.expando)},destroy:function(){this.unlistenTo(),this._loopId&&clearInterval(this._loopId),i._nulling(),i._clearAutoScrolls(),i._cancelThrottle(),this._dragStarted=!1}});return a}),t("skylark-sortable/dnd",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","./fallback/MousedDragDrop"],function(t,e,o,r,n,l,i,a,s,c){"use strict";var d="Sortable"+(new Date).getTime(),h={log:function(t,e){o("#console").append("<div>"+t+":"+e+"</div>")},expando:d,activeGroup:null,active:null,putSortable:null,sortables:[],cloneEl:null,ignoreNextClick:!1,awaitingDragStarted:!1,touchEvt:null,prepare:function(t){this.active=t,this.active.nativeDraggable||(this._fallbacker=new c(this))},start:function(t,e){this.active=t;var o=this.active.elm();o.ownerDocument;this.active.nativeDraggable},over:function(t){},end:function(t){this.active.nativeDraggable,this._nulling()},nearestEmptyInsertDetectEvent:function(t){if(h.active.dragEl){var e=h._detectNearestEmptySortable(t.clientX,t.clientY);if(e){var o={};for(var r in t)o[r]=t[r];o.target=o.rootEl=e,o.preventDefault=void 0,o.stopPropagation=void 0,e[d]._onDragOver(o)}}},_detectNearestEmptySortable:function(t,e){for(var o=this.sortables,r=0;r<o.length;r++)if(!l.lastChild(o[r],{ignoreHidden:!0,excluding:[this.ghostEl]})){var n=i.boundingRect(o[r]),a=o[r][d].options.emptyInsertThreshold,s=t>=n.left-a&&t<=n.right+a,c=e>=n.top-a&&e<=n.bottom+a;if(a&&s&&c)return o[r]}},_checkAlignment:function(t){h.active.dragEl&&h.active.dragEl.parentNode&&h.active._computeIsAligned(t)},_disableDraggable:function(t){t.draggable=!1},_nulling:function(){h.rootEl=h.parentEl=h.nextEl=h.cloneEl=h.tapEvt=h.touchEvt=h.oldIndex=h.putSortable=h.activeGroup=h.active=null}};return h}),t("skylark-sortable/Sortable",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-domx-plugins","skylark-devices-points/touch","./dnd"],function(t,e,o,r,n,l,i,a,s,c,d,h,u,g,f,p,v){"use strict";var b,m=[];function k(t,e){return a.index(t,function(t){return!("TEMPLATE"===t.nodeName.toUpperCase()||t===v.cloneEl||e&&!a.matches(t,e))})}var y,x,w,_,E,D,S,C=!1,I=!1,R=window,T=R.document,P=R.parseInt,A=R.setTimeout,N=(R.Polymer,o&&o.ie,o&&o.edge,o&&o.firefox,o&&o.safari,r&&r.apple.device,"draggable"in T.createElement("div")&&!r.apple.device),M=(l.support.cssPointerEvents,!1),X=!1,Y=function(t){function e(t,o){return function(r,n,l,i){var a=r.options.group.name&&n.options.group.name&&r.options.group.name===n.options.group.name;if(null==t&&(o||a))return!0;if(null==t||!1===t)return!1;if(o&&"clone"===t)return t;if("function"==typeof t)return e(t(r,n,l,i),o)(r,n,l,i);var s=(o?r:n).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var o={},r=t.group;r&&"object"==typeof r||(r={name:r}),o.name=r.name,o.checkPull=e(r.pull,!0),o.checkPut=e(r.put),o.revertClone=r.revertClone,t.group=o},O=f.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(t,o,r,n){return g(this.el,e.mixin({excluding:[n,r]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:P(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(t,e){for(var o in this.overrided(t,e),this.el=t,t[v.expando]=this,(e=this.options).draggable=e.draggable||/[uo]l/i.test(t.nodeName)?">li":">*",Y(e),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!e.forceFallback&&N,this.nativeDraggable&&(this.options.touchStartThreshold=1),p.mousy(t),d.on(t,"mousedown",this._onMouseDown),this.nativeDraggable&&(d.on(t,"dragover",this),d.on(t,"dragenter",this),d.on(t,"drop",this)),v.sortables.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[]),d.on(t,"selectstart",this)},_onMouseDown:function(t){var e,o,r=this,n=this._elm,l=this.options,i=l.preventOnFilter,s=t.type,c=t.touches&&t.touches[0],d=(c||t).target,h=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||d,u=l.filter;if(function(t){m.length=0;var e=t.getElementsByTagName("input"),o=e.length;for(;o--;){var r=e[o];r.checked&&m.push(r)}}(n),!(/mousedown/.test(s)&&0!==t.button||l.disabled||h.isContentEditable||(d=a.closest(d,l.draggable,n,!1),b===d))){if(v.log("_onTapStart",d.tagName+","+d.className),e=k(d),o=k(d,l.draggable),"function"==typeof u){if(u.call(this,t,d,this))return r._dispatchEvent(r,h,"filter",d,n,n,e,void 0,o),void(i&&t.cancelable&&t.preventDefault())}else if(u&&(u=u.split(",").some(function(t){if(t=a.closest(h,t.trim(),n,!1))return r._dispatchEvent(r,t,"filter",d,n,n,e,void 0,o),!0})))return void(i&&t.cancelable&&t.preventDefault());l.handle&&!a.closest(h,l.handle,n,!1)||this._prepareDragStart(t,c,d,e,o)}},_prepareDragStart:function(t,e,o,r,n){var l,i,a=this,s=a._elm,d=a.options,h=(s.ownerDocument,this.dragEl),u=(v.parentEl,v.nextEl,v.oldIndex),g=v.oldDraggableIndex;v.tapEvt;v.log("_prepareDragStart","start"),o&&!h&&o.parentNode===s&&(i=s,h=this.dragEl=o,v.parentEl=h.parentNode,v.nextEl=h.nextSibling,b=o,v.activeGroup=this.options.group,u=v.oldIndex=r,g=v.oldDraggableIndex=n,v.tapEvt={target:h,clientX:(e||t).clientX,clientY:(e||t).clientY},this._lastX=(e||t).clientX,this._lastY=(e||t).clientY,h.style["will-change"]="all",h.style.transition="",h.style.transform="",l=function(){a.nativeDraggable&&(h.draggable=!0),a._triggerDragStart(t,e),a._dispatchEvent(a,i,"choose",h,i,i,u,void 0,g),c.toggleClass(h,d.chosenClass,!0)},d.ignore.split(",").forEach(function(t){!function(t,e,o){if(t){var r=t.getElementsByTagName(e),n=0,l=r.length;if(o)for(;n<l;n++)o(r[n],n);return r}}(h,t.trim(),v._disableDraggable)}),this.nativeDraggable&&(this.options.touchStartThreshold=4,h.draggable=!0),l())},_triggerDragStart:function(t,o){v.log("_triggerDragStart","start"),v.log("_triggerDragStart","nativeDraggable is "+this.nativeDraggable),v.prepare(this),this.nativeDraggable&&(d.on(this.dragEl,"dragend",this._onDragEnd),d.on(this.dragEl,"dragstart",this._onDragStart));try{T.selection?e.defer(function(){T.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_onDragStart:function(t,o){v.log("_onDragStart","start");var r=this,n=this.dragEl,l=this._elm,a=t.dataTransfer,s=r.options,d=v.cloneEl=i.clone(n,!0);d.draggable=!1,d.style["will-change"]="",c.toggleClass(d,r.options.chosenClass,!1),r._cloneId=e.defer(function(){r.options.removeCloneOnHide||l.insertBefore(d,n),r._dispatchEvent(r,l,"clone",n)}),o||c.toggleClass(n,s.dragClass,!0),o||(a&&(a.effectAllowed="move",s.setData&&s.setData.call(r,a,n)),c.css(n,"transform","translateZ(0)")),v.awaitingDragStarted=!0,r._dragStartId=e.defer(function(t,e){v.awaitingDragStarted=!1;var o=this.dragEl,r=this._elm,n=v.oldIndex,l=v.oldDraggableIndex;if(r&&o){v.start(this);var i=this.options;!t&&c.toggleClass(o,i.dragClass,!1),c.toggleClass(o,i.ghostClass,!0),c.css(o,"transform",""),this._dispatchEvent(this,r,"start",o,r,r,n,void 0,l,void 0,e)}else this._nulling()}.bind(r,o,t))},_onDragEnd:function(t){this._elm,this.options,this.dragEl,v.putSortable;v.awaitingDragStarted=!1,!1,clearTimeout(this._dragStartTimer),this._cloneId&&(this._cloneId.stop(),this._cloneId=null),this._dragStartId&&(this._dragStartId.stop(),this._dragStartId=null),this.nativeDraggable&&(d.off(this.dragEl,"dragstart",this._onDragStart),d.off(this.dragEl,"dragend",this._onDragEnd)),b=null,m.forEach(function(t){t.checked=!0}),m.length=0,this.dragEl=null,v.end()},_onMove:function(t,e,o,r,n,l,i,a){var c,h,u=t[v.expando],g=u.options.onMove;return c=d.create("move",{to:e,from:t,dragged:o,draggedRect:r,related:n||e,relatedRect:l||s.boundingRect(e),willInsertAfter:a,originalEvent:i}),t.dispatchEvent(c),g&&(h=g.call(u,c,i)),h},_computeIsAligned:function(t){var e,o=v.active.dragEl;if(e=t.target,e=a.closest(e,this.options.draggable,this.el,!1),!X&&o&&o.parentNode===this.el){for(var r,n,l,i,c,d,h,u,g=this.el.children,f=0;f<g.length;f++)a.closest(g[f],this.options.draggable,this.el,!1)&&g[f]!==e&&(g[f].sortableMouseAligned=(r=t.clientX,n=t.clientY,l=g[f],i=this._getDirection(t,null),this.options,void 0,void 0,void 0,void 0,c=s.boundingRect(l),d="vertical"===i?c.left:c.top,h="vertical"===i?c.right:c.bottom,d<(u="vertical"===i?r:n)&&u<h));a.closest(e,this.options.draggable,this.el,!0)||(_=null),X=!0,A(function(){X=!1},30)}},_getDirection:function(t,e){var o=v.active.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,t,e,o,null):this.options.direction},_animate:function(t,e){var o=this.options.animation,r=v.active.dragEl;if(o){var n=s.boundingRect(e);if(e===r&&n,1===t.nodeType&&(t=s.boundingRect(t)),t.left+t.width/2!==n.left+n.width/2||t.top+t.height/2!==n.top+n.height/2){var l=h.matrix(this.el),i=l&&l.a,a=l&&l.d;c.css(e,"transition","none"),c.css(e,"transform","translate3d("+(t.left-n.left)/(i||1)+"px,"+(t.top-n.top)/(a||1)+"px,0)"),this._repaint(e),c.css(e,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),c.css(e,"transform","translate3d(0,0,0)")}"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=A(function(){c.css(e,"transition",""),c.css(e,"transform",""),e.animated=!1},o)}},_repaint:function(t){return t.offsetWidth},_offUpEvents:function(){var t=this.el.ownerDocument;d.off(t,"mouseup",this._onDrop),d.off(T,"selectstart",this)},_onDragOver:function(t){var e,o,r,n=this.el,l=t.target,i=this.options,d=i.group,h=v.active,u=v.activeGroup===d,g=i.sort,f=this,p=v.active.dragEl,b=v.active.elm(),m=v.putSortable,y=v.nextEl,x=v.oldIndex,R=v.oldDraggableIndex;if(!M){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),w=!0,l=a.closest(l,i.draggable,n,!0),p.contains(t.target)||l.animated)return U(!1);if(l!==p&&(v.ignoreNextClick=!1),h&&!i.disabled&&(u?g||(r=!b.contains(p)):m===this||(this.lastPutMode=v.activeGroup.checkPull(this,h,p,t))&&d.checkPut(this,h,p,t))){var P=this._getDirection(t,l);if(e=s.boundingRect(p),r)return this._hideClone(),v.parentEl=b,y?b.insertBefore(p,y):b.appendChild(p),U(!0);var N=function(t){return a.lastChild(t,{ignoreHidden:!0,excluding:[]})}(n);if(!N||function(t,e,o){var r=s.boundingRect(a.lastChild(o,{ignoreHidden:!0,excluding:[]})),n="vertical"===e?t.clientY:t.clientX,l="vertical"===e?t.clientX:t.clientY,i="vertical"===e?r.bottom:r.right,c="vertical"===e?r.left:r.top,d="vertical"===e?r.right:r.bottom;return"vertical"===e?l>d+10||l<=d&&n>i&&l>=c:n>i&&l>c||n<=i&&l>d+10}(t,P,n)&&!N.animated){if(N&&n===t.target&&(l=N),l&&(o=s.boundingRect(l)),u?h._hideClone():h._showClone(this),!1!==this._onMove(b,n,p,e,l,o,t,!!l))return n.appendChild(p),v.parentEl=n,null,W(),U(!0)}else if(l&&l!==p&&l.parentNode===n){var X,Y=0,O=l.sortableMouseAligned,H=p.parentNode!==n,G="vertical"===P?"top":"left";if(_!==l&&(D=null,X=s.boundingRect(l)[G],C=!1),function(t,e,o){var r=s.boundingRect(t),n=s.boundingRect(e),l="vertical"===o?r.left:r.top,i="vertical"===o?r.right:r.bottom,a="vertical"===o?r.width:r.height,c="vertical"===o?n.left:n.top,d="vertical"===o?n.right:n.bottom,h="vertical"===o?n.width:n.height;return l===c||i===d||l+a/2===c+h/2}(p,l,P)&&O||H||i.invertSwap||"insert"===D||"swap"===D?("swap"!==D&&(I=i.invertSwap||H),Y=function(t,e,o,r,n,l,i){var a=s.boundingRect(e),c="vertical"===o?t.clientY:t.clientX,d="vertical"===o?a.height:a.width,h="vertical"===o?a.top:a.left,u="vertical"===o?a.bottom:a.right,g=s.boundingRect(p),f=!1;if(!l)if(i&&S<d*r)if(!C&&(1===E?c>h+d*n/2:c<u-d*n/2)&&(C=!0),C)f=!0;else{"vertical"===o?g.top:g.left,"vertical"===o?g.bottom:g.right;if(1===E?c<h+S:c>u-S)return-1*E}else if(c>h+d*(1-r)/2&&c<u-d*(1-r)/2)return j(e);if((f=f||l)&&(c<h+d*n/2||c>u-d*n/2))return c>h+d/2?1:-1;return 0}(t,l,P,i.swapThreshold,null==i.invertedSwapThreshold?i.swapThreshold:i.invertedSwapThreshold,I,_===l),D="swap"):(Y=j(l),D="insert"),0===Y)return U(!1);null,_=l,E=Y,o=s.boundingRect(l);var z=l.nextElementSibling,F=!1;F=1===Y;var q=this._onMove(b,n,p,e,l,o,t,F);if(!1!==q)return 1!==q&&-1!==q||(F=1===q),M=!0,A(B,30),u?h._hideClone():h._showClone(this),F&&!z?n.appendChild(p):l.parentNode.insertBefore(p,F?z:l),v.parentEl=p.parentNode,void 0===X||I||(S=Math.abs(X-s.boundingRect(l)[G])),W(),U(!0)}if(n.contains(p))return U(!1)}return!1}function U(r){return r&&(u?h._hideClone():h._showClone(f),h&&(c.toggleClass(p,m?m.options.ghostClass:h.options.ghostClass,!1),c.toggleClass(p,i.ghostClass,!0)),m!==f&&f!==v.active?m=v.putSortable=f:f===v.active&&(m=v.putSortable=null),e&&f._animate(e,p),l&&o&&f._animate(o,l)),(l===p&&!p.animated||l===n&&!l.animated)&&(_=null),i.dragoverBubble||t.rootEl||l===T||(v.over(t),p.parentNode[v.expando]._computeIsAligned(t),!r&&v.nearestEmptyInsertDetectEvent(t)),!i.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function W(){f._dispatchEvent(f,b,"change",l,n,b,x,k(p),R,k(p,i.draggable),t)}function j(t){var e=k(p),o=k(t);return e<o?1:-1}},_onDrop:function(t){this.el;var e=this.options,o=v.active.elm(),r=v.active.dragEl,n=v.putSortable,l=v.parentEl,a=v.oldIndex,s=v.oldDraggableIndex,h=v.nextEl;I=!1,C=!1,this.nativeDraggable&&d.off(T,"drop",this),this._offUpEvents(),t&&(w&&(t.cancelable&&t.preventDefault(),!e.dropBubble&&t.stopPropagation()),(o===l||n&&"clone"!==n.lastPutMode)&&i.remove(v.cloneEl),r&&(v._disableDraggable(r),r.style["will-change"]="",c.toggleClass(r,n?n.options.ghostClass:this.options.ghostClass,!1),c.toggleClass(r,this.options.chosenClass,!1),this._dispatchEvent(this,o,"unchoose",r,l,o,a,null,s,null,t),o!==l?(y=k(r),x=k(r,e.draggable),y>=0&&(this._dispatchEvent(null,l,"add",r,l,o,a,y,s,x,t),this._dispatchEvent(this,o,"remove",r,l,o,a,y,s,x,t),this._dispatchEvent(null,l,"sort",r,l,o,a,y,s,x,t),this._dispatchEvent(this,o,"sort",r,l,o,a,y,s,x,t)),n&&n.save()):r.nextSibling!==h&&(y=k(r),x=k(r,e.draggable),y>=0&&(this._dispatchEvent(this,o,"update",r,l,o,a,y,s,x,t),this._dispatchEvent(this,o,"sort",r,l,o,a,y,s,x,t))),v.active&&(null!=y&&-1!==y||(y=a,x=s),this._dispatchEvent(this,o,"end",r,l,o,a,y,s,x,t),this.save()))),this._nulling()},_nulling:function(){w=y=_=E=null},_hideClone:function(){v.cloneEl.cloneHidden||(c.hide(v.cloneEl),v.cloneEl.cloneHidden=!0,v.cloneEl.parentNode&&this.options.removeCloneOnHide&&i.remove(v.cloneEl))},_showClone:function(t){var e=v.active.el,o=v.nextEl;"clone"===t.lastPutMode?v.cloneEl.cloneHidden&&(e.contains(v.active.dragEl)&&!this.options.group.revertClone?e.insertBefore(v.cloneEl,v.active.dragEl):o?e.insertBefore(v.cloneEl,o):e.appendChild(v.cloneEl),this.options.group.revertClone&&this._animate(v.active.dragEl,v.cloneEl),c.show(v.cloneEl),v.cloneEl.cloneHidden=!1):this._hideClone()},handleEvent:function(t){switch(t.type){case"drop":this._onDrop(t);break;case"dragenter":case"dragover":v.active.dragEl&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},_dispatchEvent:function(t,e,o,r,n,l,i,a,s,c,h){var u,g=(t=t||e[v.expando]).options,f="on"+o.charAt(0).toUpperCase()+o.substr(1),p=this.putSortable;u=d.create(o,{to:n||e,from:l||e,item:r||e,clone:this.cloneEl,oldIndex:i,newIndex:a,oldDraggableIndex:s,newDraggableIndex:c,originalEvent:h,pullMode:p?p.lastPutMode:void 0}),e&&e.dispatchEvent(u),g[f]&&g[f].call(t,u)},toArray:function(){for(var t,e=[],o=this.el.children,r=0,n=o.length,l=this.options;r<n;r++)t=o[r],a.closest(t,l.draggable,this.el,!1)&&e.push(t.getAttribute(l.dataIdAttr)||i.generateId(t));return e},sort:function(t){var e={},o=this.el;this.toArray().forEach(function(t,r){var n=o.children[r];a.closest(n,this.options.draggable,o,!1)&&(e[t]=n)},this),t.forEach(function(t){e[t]&&(o.removeChild(e[t]),o.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return a.closest(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&Y(o)},destroy:function(){var t=this.el;t[v.expando]=null,d.off(t,"mousedown",this._onTapStart),this.nativeDraggable&&(d.off(t,"dragover",this),d.off(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),v.sortables.splice(v.sortables.indexOf(this.el),1),this.el=t=null}});function B(){M=!1}return O.create=function(t,e){return new O(t,e)},O.version="1.9.0",t.attach("intg.Sortable",O)}),t("skylark-sortable/main",["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./fallback/autoscroll","./Sortable"],function(t,e,o,r,n,l,i){return i.utils={on:e.on,off:e.off,css:n.css,is:function(t,e){return!!o.closest(t,e,t,!1)},extend:t.mixin,throttle:l._throttle,closest:o.closest,toggleClass:n.toggleClass,clone:function(t){return r.clone(t,!0)},nextTick:function(e){return t.defer(e)},cancelNextTick:function(t){return t&&t.stop()},getChild:function(t,e,r){return r.excluding=[],r.closesting=r.draggable,o.childAt(t,e,r)}},i}),t("skylark-sortable",["skylark-sortable/main"],function(t){return t})}(o),!r){var i=require("skylark-langx-ns");n?module.exports=i:e.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map
