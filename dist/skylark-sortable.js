/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
!function(e,t){var o=t.define,require=t.require,r="function"==typeof o&&o.amd,l=!r&&"undefined"!=typeof exports;if(!r&&!o){var n={};o=t.define=function(e,t,o){"function"==typeof o?(n[e]={factory:o,deps:t.map(function(t){return function(e,t){if("."!==e[0])return e;var o=t.split("/"),r=e.split("/");o.pop();for(var l=0;l<r.length;l++)"."!=r[l]&&(".."==r[l]?o.pop():o.push(r[l]));return o.join("/")}(t,e)}),resolved:!1,exports:null},require(e)):n[e]={factory:null,resolved:!0,exports:o}},require=t.require=function(e){if(!n.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=n[e];if(!module.resolved){var o=[];module.deps.forEach(function(e){o.push(require(e))}),module.exports=module.factory.apply(t,o)||null,module.resolved=!0}return module.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-langx-hoster/detects/browser",["../hoster"],function(e){return e.detects.browser=function(){return"undefined"!=typeof window&&void 0!==window.document?function(e){e=e.toLowerCase();var t=/(edge)\/([\w.]+)/.exec(e)||/(opr)[\/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(iemobile)[\/]([\w.]+)/.exec(e)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],o=/(ipad)/.exec(e)||/(ipod)/.exec(e)||/(windows phone)/.exec(e)||/(iphone)/.exec(e)||/(kindle)/.exec(e)||/(silk)/.exec(e)||/(android)/.exec(e)||/(win)/.exec(e)||/(mac)/.exec(e)||/(linux)/.exec(e)||/(cros)/.exec(e)||/(playbook)/.exec(e)||/(bb)/.exec(e)||/(blackberry)/.exec(e)||[],r={},l={browser:t[5]||t[3]||t[1]||"",version:t[2]||t[4]||"0",versionNumber:t[4]||t[2]||"0",platform:o[0]||""};l.browser&&(r[l.browser]=!0,r.version=l.version,r.versionNumber=parseInt(l.versionNumber,10));l.platform&&(r[l.platform]=!0);(r.android||r.bb||r.blackberry||r.ipad||r.iphone||r.ipod||r.kindle||r.playbook||r.silk||r["windows phone"])&&(r.mobile=!0);(r.cros||r.mac||r.linux||r.win)&&(r.desktop=!0);(r.chrome||r.opr||r.safari)&&(r.webkit=!0);if(r.rv||r.iemobile){l.browser="ie",r.ie=!0}if(r.edge){delete r.edge;l.browser="edge",r.edge=!0}if(r.safari&&r.blackberry){l.browser="blackberry",r.blackberry=!0}if(r.safari&&r.playbook){l.browser="playbook",r.playbook=!0}if(r.bb){var n="blackberry";l.browser=n,r[n]=!0}if(r.opr){l.browser="opera",r.opera=!0}if(r.safari&&r.android){l.browser="android",r.android=!0}if(r.safari&&r.kindle){l.browser="kindle",r.kindle=!0}if(r.safari&&r.silk){l.browser="silk",r.silk=!0}return r.name=l.browser,r.platform=l.platform,r}(navigator.userAgent):null}}),e("skylark-langx-hoster/isBrowser",["./hoster","./detects/browser"],function(e,t){return void 0==e.isBrowser&&(e.isBrowser=t()),e.isBrowser}),e("skylark-sortable/autoscroll",["skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-domx-geom","skylark-domx-styler","skylark-domx-scrolls/scrollingElement"],function(e,t,o,r,l){"use strict";var n,a,i,s,d,c=[],g=!1,h=null,u=t&&t.ie,f=t&&t.edge,p=(t&&t.firefox,t&&t.safari);var v,b=function(e,t){if(!e||!e.getBoundingClientRect)return l();var o=e,n=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var a=r.css(o);if(o.clientWidth<o.scrollWidth&&("auto"==a.overflowX||"scroll"==a.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==a.overflowY||"scroll"==a.overflowY)){if(!o||!o.getBoundingClientRect||o===document.body)return l();if(n||t)return o;n=!0}}}while(o=o.parentNode);return l()},m=x(function(e,t,i,s,d){if(t.scroll){var u=i?i[d]:window,f=t.scrollSensitivity,p=t.scrollSpeed,v=e.clientX,m=e.clientY,x=l(),y=!1;h!==i&&(k(),n=t.scroll,a=t.scrollFn,!0===n&&(n=b(i,!0),h=n));var _=0,w=n;do{var E,S,D,C,I,R,T,P,A,M=w,N=o.boundingRect(M),X=N.top,Y=N.bottom,B=N.left,O=N.right,H=N.width,G=N.height;if(E=M.scrollWidth,S=M.scrollHeight,D=r.css(M),P=M.scrollLeft,A=M.scrollTop,M===x?(R=H<E&&("auto"===D.overflowX||"scroll"===D.overflowX||"visible"===D.overflowX),T=G<S&&("auto"===D.overflowY||"scroll"===D.overflowY||"visible"===D.overflowY)):(R=H<E&&("auto"===D.overflowX||"scroll"===D.overflowX),T=G<S&&("auto"===D.overflowY||"scroll"===D.overflowY)),C=R&&(Math.abs(O-v)<=f&&P+H<E)-(Math.abs(B-v)<=f&&!!P),I=T&&(Math.abs(Y-m)<=f&&A+G<S)-(Math.abs(X-m)<=f&&!!A),!c[_])for(var q=0;q<=_;q++)c[q]||(c[q]={});c[_].vx==C&&c[_].vy==I&&c[_].el===M||(c[_].el=M,c[_].vx=C,c[_].vy=I,clearInterval(c[_].pid),!M||0==C&&0==I||(y=!0,c[_].pid=setInterval(function(){var t=c[this.layer].vy?c[this.layer].vy*p:0,r=c[this.layer].vx?c[this.layer].vx*p:0;"function"==typeof a&&"continue"!==a.call(u,r,t,e,touchEvt,c[this.layer].el)||o.scrollBy(c[this.layer].el,r,t)}.bind({layer:_}),24))),_++}while(t.bubbleScroll&&w!==x&&(w=b(w,!1)));g=y}},30),k=function(){c.forEach(function(e){clearInterval(e.pid)}),c=[]};function x(t,o){return e.debounce(t,o)}return{autoScrolls:c,_isScrolledPast:function(e,t){var r=b(e,!0),n=o.boundingRect(e)[t];for(;r;){var a=o.boundingRect(r)[t];if(!("top"===t||"left"===t?n>=a:n<=a))return r;if(r===l())break;r=b(r,!1)}return!1},_getRelativeScrollOffset:function(e){var t=0,o=0,r=l();if(e)do{var n=transforms.matrix(e),a=n.a,i=n.d;t+=e.scrollLeft*a,o+=e.scrollTop*i}while(e!==r&&(e=e.parentNode));return[t,o]},_autoScroll:m,_clearAutoScrolls:k,_handleAutoScroll:function(e,t,o,r){var n=e.clientX,a=e.clientY,c=document.elementFromPoint(n,a);if(o||f||u||p){v=m(e,t,c,o,r);var h=b(c,!0);!g||i&&n===s&&a===d||(i&&clearInterval(i),i=setInterval(function(){var r=b(document.elementFromPoint(n,a),!0);r!==h&&(h=r,k(),v=m(e,t,h,o))},10),s=n,d=a)}else{if(!t.bubbleScroll||b(c,!0)===l())return void k();v=m(e,t,b(c,!1),!1)}},_throttle:x,_cancelThrottle:function(){v&&v.stop&&(v.stop(),v=void 0)},_nulling:function(){i&&clearInterval(i),i=null,s=null,d=null,this.scrollEl=this.scrollParentEl=this.autoScrolls.length=null}}}),e("skylark-domx-layouts/oriented",["skylark-domx-geom","skylark-domx-styler","skylark-domx-finder","./Orientation"],function(e,t,o,r){return function(l,n){var a=t.css(l),i=e.contentRect(l).width,s=o.childAt(l,0,n),d=o.childAt(l,1,n),c=s&&t.css(s),g=d&&t.css(d),h=s&&e.marginSize(s).width,u=d&&e.marginSize(d).width;if("flex"===a.display)return"column"===a.flexDirection||"column-reverse"===a.flexDirection?r.Vertical:r.Horizontal;if("grid"===a.display)return a.gridTemplateColumns.split(" ").length<=1?r.Vertical:r.Horizontal;if(s&&"none"!==c.float){var f="left"===c.float?"left":"right";return!d||"both"!==g.clear&&g.clear!==f?r.Horizontal:r.Vertical}return s&&("block"===c.display||"flex"===c.display||"table"===c.display||"grid"===c.display||h>=i&&"none"===a.float||d&&"none"===a.float&&h+u>i)?r.Vertical:r.Horizontal}}),e("skylark-sortable/fallback/ghoster",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch"],function(e,t,o,r,l,n,a,i,s,d,c,g,h,u,f){"use strict";function p(e,t,o,r){if(e.getBoundingClientRect||e===window){var{top:l,left:n,bottom:a,right:i,width:d,height:c}=s.boundingRect(e);if(t&&e!==window){var h=g.matrix(o||e),u=h&&h.a,f=h&&h.d;h&&(a=(l/=f)+(c/=f),i=(n/=u)+(d/=u))}return{top:l,left:n,bottom:a,right:i,width:d,height:c}}}var v={ghostEl:null,PositionGhostAbsolutely:r.apple.device,ghostRelativeParent:null,ghostRelativeParentInitialScroll:[],_ghostIsLast:function(e,t,o){var r=s.boundingRect(i.lastChild(o,{ignoreHidden:!0,excluding:[this.ghostEl]})),l="vertical"===t?e.clientY:e.clientX,n="vertical"===t?e.clientX:e.clientY,a="vertical"===t?r.bottom:r.right,d="vertical"===t?r.left:r.top,c="vertical"===t?r.right:r.bottom;return"vertical"===t?n>c+10||n<=c&&l>a&&n>=d:l>a&&n>d||l<=a&&n>c+10},_lastChild:function(e){return i.lastChild(e,{ignoreHidden:!0,excluding:[this.ghostEl]})},_appendGhost:function(e,t,o){var r=this.ghostEl;if(!r){var l=p(e,!0,t,!this.PositionGhostAbsolutely);d.css(e);if(this.PositionGhostAbsolutely){for(var n=this.ghostRelativeParent=t;"static"===d.css(n,"position")&&"none"===d.css(n,"transform")&&n!==document;)n=n.parentNode;if(n!==document){var a=p(n,!0);l.top-=a.top,l.left-=a.left}n!==document.body&&n!==document.documentElement?(n===document&&(n=this.ghostRelativeParent=h()),l.top+=n.scrollTop,l.left+=n.scrollLeft):n=this.ghostRelativeParent=h(),ghostRelativeParentInitialScroll=autoscroll._getRelativeScrollOffset(n)}r=this.ghostEl=e.cloneNode(!0),d.toggleClass(r,o.ghostClass,!1),d.toggleClass(r,o.fallbackClass,!0),d.toggleClass(r,o.dragClass,!0),d.css(r,{"box-sizing":"border-box",margin:0,top:l.top,left:l.left,width:l.width,height:l.height,opacity:"0.8",position:this.PositionGhostAbsolutely?"absolute":"fixed",zIndex:"100000",pointerEvents:"none"}),t.appendChild(r)}},getRelativeScrollOffset:function(){return this.PositionGhostAbsolutely&&this.ghostRelativeParent&&autoscroll._getRelativeScrollOffset(this.ghostRelativeParent)},remove:function(){this.ghostEl&&a.remove(this.ghostEl),this.ghostEl=null}};return v}),e("skylark-sortable/fallback/MousedDragDrop",["skylark-langx/langx","skylark-domx-query","skylark-domx-eventer","skylark-domx-styler","skylark-domx-transforms","./ghoster"],function(e,t,o,r,l,n){var a=e.Emitter.inherit({_construct:function(e){this.dnd=e;var o=t(document);this.listenTo(o,"mousemove",this._onTouchMove.bind(this)),this.listenTo(o,"mouseup",this._onMouseUp.bind(this))},_onMouseUp:function(e){var t=this.dnd;t.putSortable&&t.putSortable._onDrop(e),t.draggable&&t.draggable._onDragEnd(e),n.remove(),this.destroy()},_onTouchMove:function(e,t){var o=this.dnd,a=n.ghostEl,i=o.draggable,s=i.dragEl,d=o.tapEvt;if(d){var c=i.options,g=c.fallbackTolerance,h=c.fallbackOffset,u=e.touches?e.touches[0]:e,f=a&&l.matrix(a),p=a&&f&&f.a,v=a&&f&&f.d,b=n.getRelativeScrollOffset(),m=(u.clientX-d.clientX+h.x)/(p||1)+(b?b[0]-ghostRelativeParentInitialScroll[0]:0)/(p||1),k=(u.clientY-d.clientY+h.y)/(v||1)+(b?b[1]-ghostRelativeParentInitialScroll[1]:0)/(v||1),x=e.touches?"translate3d("+m+"px,"+k+"px,0)":"translate("+m+"px,"+k+"px)";if(!o.active&&!o.awaitingDragStarted){if(g&&Math.min(Math.abs(u.clientX-i._lastX),Math.abs(u.clientY-i._lastY))<g)return;i._onDragStart(e,!0),n._appendGhost(s,document.body,i.options),o.ignoreNextClick=!0,this._loopId=setInterval(this._emulateDragOver.bind(this),50)}!t&&o._handleAutoScroll(u,!0),o.touchEvt=u,a&&r.css(a,"transform",x),e.preventDefault()}},_emulateDragOver:function(e){var t=this.dnd,o=t.draggable.dragEl,r=t.touchEvt;if(r){if(this._lastX===r.clientX&&this._lastY===r.clientY&&!e)return;this._lastX=r.clientX,this._lastY=r.clientY;for(var l=document.elementFromPoint(r.clientX,r.clientY),n=l;l&&l.shadowRoot&&(l=l.shadowRoot.elementFromPoint(r.clientX,r.clientY))!==n;)n=l;if(n)do{if(n[t.expando])if(n[t.expando]._onDragOver({clientX:r.clientX,clientY:r.clientY,target:l,rootEl:n}))break;l=n}while(n=n.parentNode);o.parentNode[t.expando]._computeIsAligned(r)}},destroy:function(){this.unlistenTo(),this._loopId&&clearInterval(this._loopId)}});return a}),e("skylark-sortable/dnd",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./fallback/MousedDragDrop"],function(e,t,o,r,l,n,a,i,s,d,c,g,h,u,f,p,v){"use strict";var b="Sortable"+(new Date).getTime(),m={log:function(e,t){l("#console").append("<div>"+e+":"+t+"</div>")},expando:b,activeGroup:null,active:null,putSortable:null,sortables:[],cloneEl:null,ignoreNextClick:!1,awaitingDragStarted:!1,touchEvt:null,prepare:function(e){this.draggable=e,e.nativeDraggable||(this._fallbacker=new v(this))},start:function(e,t){this.draggable=e;var o=e.elm(),r=o.ownerDocument;c.on(r,"dragover",this.nearestEmptyInsertDetectEvent),this.draggable.nativeDraggable?(c.on(document,"dragover",this._handleAutoScroll),c.on(document,"dragover",this._checkAlignment)):c.on(document,"mousemove",this._handleAutoScroll)},over:function(e){this._handleAutoScroll(e)},end:function(e){c.off(document,"dragover",this.nearestEmptyInsertDetectEvent),this.draggable.nativeDraggable?(c.off(document,"dragover",this._handleAutoScroll),c.off(document,"dragover",this._checkAlignment)):c.off(document,"mousemove",this._onTouchMove),this._nulling()},nearestEmptyInsertDetectEvent:function(e){if(m.draggable.dragEl){var t=m._detectNearestEmptySortable(e.clientX,e.clientY);if(t){var o={};for(var r in e)o[r]=e[r];o.target=o.rootEl=t,o.preventDefault=void 0,o.stopPropagation=void 0,t[b]._onDragOver(o)}}},_detectNearestEmptySortable:function(e,t){for(var o=this.sortables,r=0;r<o.length;r++)if(!i.lastChild(o[r],{ignoreHidden:!0,excluding:[this.ghostEl]})){var l=s.boundingRect(o[r]),n=o[r][b].options.emptyInsertThreshold,a=e>=l.left-n&&e<=l.right+n,d=t>=l.top-n&&t<=l.bottom+n;if(n&&a&&d)return o[r]}},_checkAlignment:function(e){m.draggable.dragEl&&m.draggable.dragEl.parentNode&&m.draggable._computeIsAligned(e)},_disableDraggable:function(e){e.draggable=!1},_handleAutoScroll:function(e,t){if(m.draggable.dragEl&&m.draggable.options.scroll)return p._handleAutoScroll(e,m.draggable.options,t,b)},_nulling:function(){m.rootEl=m.parentEl=m.nextEl=m.cloneEl=m.tapEvt=m.touchEvt=m.oldIndex=m.putSortable=m.activeGroup=m.active=null}};return m}),e("skylark-sortable/containers",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-devices-points/touch","./autoscroll","./dnd"],function(e,t,o,r,l,n,a,i,s,d,c,g,h,u,f,p,v){"use strict";return{_index:function(e,t){return i.index(e,function(e){return!("TEMPLATE"===e.nodeName.toUpperCase()||e===v.cloneEl||t&&!i.matches(e,t))})},_isElInRowColumn:function(e,t,o){v.draggable.dragEl;var r=s.boundingRect(e),l=s.boundingRect(t),n="vertical"===o?r.left:r.top,a="vertical"===o?r.right:r.bottom,i="vertical"===o?r.width:r.height,d="vertical"===o?l.left:l.top,c="vertical"===o?l.right:l.bottom,g="vertical"===o?l.width:l.height;return n===d||a===c||n+i/2===d+g/2},_isClientInRowColumn:function(e,t,o,r,l){var n=s.boundingRect(o),a="vertical"===r?n.left:n.top,i="vertical"===r?n.right:n.bottom,d="vertical"===r?e:t;return a<d&&d<i}}}),e("skylark-sortable/Sortable",["skylark-langx/skylark","skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-langx-hoster/isMobile","skylark-domx-query","skylark-domx-browser","skylark-domx-noder","skylark-domx-finder","skylark-domx-geom","skylark-domx-styler","skylark-domx-eventer","skylark-domx-transforms","skylark-domx-scrolls/scrollingElement","skylark-domx-layouts/oriented","skylark-domx-plugins","skylark-devices-points/touch","./autoscroll","./containers","./dnd","./fallback/ghoster"],function(e,t,o,r,l,n,a,i,s,d,c,g,h,u,f,p,v,b,m,k){"use strict";var x,y=[];var _,w,E,S,D,C,I,R=!1,T=!1,P=window,A=P.document,M=P.parseInt,N=P.setTimeout,X=(P.Polymer,o&&o.ie,o&&o.edge,o&&o.firefox,o&&o.safari,r&&r.apple.device,"draggable"in A.createElement("div")&&!r.apple.device),Y=(n.support.cssPointerEvents,!1),B=!1,O=function(e){function t(e,o){return function(r,l,n,a){var i=r.options.group.name&&l.options.group.name&&r.options.group.name===l.options.group.name;if(null==e&&(o||i))return!0;if(null==e||!1===e)return!1;if(o&&"clone"===e)return e;if("function"==typeof e)return t(e(r,l,n,a),o)(r,l,n,a);var s=(o?r:l).options.group.name;return!0===e||"string"==typeof e&&e===s||e.join&&e.indexOf(s)>-1}}var o={},r=e.group;r&&"object"==typeof r||(r={name:r}),o.name=r.name,o.checkPull=t(r.pull,!0),o.checkPut=t(r.put),o.revertClone=r.revertClone,e.group=o},H=f.Plugin.inherit({klassName:"Sortable",pluginName:"intg.sortable",options:{group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(e,o,r,l){return u(this.el,t.mixin({excluding:[l,r]},this.options))},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:M(window.devicePixelRatio,10)||1,fallbackOnBody:!0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackTolerance:0,fallbackOffset:{x:0,y:0},emptyInsertThreshold:5},_construct:function(e,t){for(var o in this.overrided(e,t),this.el=e,e[m.expando]=this,(t=this.options).draggable=t.draggable||/[uo]l/i.test(e.nodeName)?">li":">*",O(t),this)"_"===o.charAt(0)&&"function"==typeof this[o]&&(this[o]=this[o].bind(this));this.nativeDraggable=!t.forceFallback&&X,this.nativeDraggable&&(this.options.touchStartThreshold=1),p.mousy(e),c.on(e,"mousedown",this._onMouseDown),this.nativeDraggable&&(c.on(e,"dragover",this),c.on(e,"dragenter",this),c.on(e,"drop",this)),m.sortables.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),c.on(e,"selectstart",this)},_onMouseDown:function(e){var t,o,r=this,l=this._elm,n=this.options,a=n.preventOnFilter,s=e.type,d=e.touches&&e.touches[0],c=(d||e).target,g=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||c,h=n.filter;if(function(e){y.length=0;var t=e.getElementsByTagName("input"),o=t.length;for(;o--;){var r=t[o];r.checked&&y.push(r)}}(l),!(/mousedown/.test(s)&&0!==e.button||n.disabled||g.isContentEditable||(c=i.closest(c,n.draggable,l,!1),x===c))){if(m.log("_onTapStart",c.tagName+","+c.className),t=b._index(c),o=b._index(c,n.draggable),"function"==typeof h){if(h.call(this,e,c,this))return r._dispatchEvent(r,g,"filter",c,l,l,t,void 0,o),void(a&&e.cancelable&&e.preventDefault())}else if(h&&(h=h.split(",").some(function(e){if(e=i.closest(g,e.trim(),l,!1))return r._dispatchEvent(r,e,"filter",c,l,l,t,void 0,o),!0})))return void(a&&e.cancelable&&e.preventDefault());n.handle&&!i.closest(g,n.handle,l,!1)||this._prepareDragStart(e,d,c,t,o)}},_prepareDragStart:function(e,t,o,r,l){var n,a,i=this,s=i._elm,c=i.options,g=(s.ownerDocument,this.dragEl),h=(m.parentEl,m.nextEl,m.oldIndex),u=m.oldDraggableIndex;m.tapEvt;m.log("_prepareDragStart","start"),o&&!g&&o.parentNode===s&&(a=s,g=this.dragEl=o,m.parentEl=g.parentNode,m.nextEl=g.nextSibling,x=o,m.activeGroup=this.options.group,h=m.oldIndex=r,u=m.oldDraggableIndex=l,m.tapEvt={target:g,clientX:(t||e).clientX,clientY:(t||e).clientY},this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,g.style["will-change"]="all",g.style.transition="",g.style.transform="",n=function(){i.nativeDraggable&&(g.draggable=!0),i._triggerDragStart(e,t),i._dispatchEvent(i,a,"choose",g,a,a,h,void 0,u),d.toggleClass(g,c.chosenClass,!0)},c.ignore.split(",").forEach(function(e){!function(e,t,o){if(e){var r=e.getElementsByTagName(t),l=0,n=r.length;if(o)for(;l<n;l++)o(r[l],l);return r}}(g,e.trim(),m._disableDraggable)}),this.nativeDraggable&&(this.options.touchStartThreshold=4,g.draggable=!0),n())},_triggerDragStart:function(e,o){m.log("_triggerDragStart","start"),m.log("_triggerDragStart","nativeDraggable is "+this.nativeDraggable),m.prepare(this),this.nativeDraggable&&(c.on(this.dragEl,"dragend",this._onDragEnd),c.on(this.dragEl,"dragstart",this._onDragStart));try{A.selection?t.defer(function(){A.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_onDragStart:function(e,o){m.log("_onDragStart","start");var r=this,l=this.dragEl,n=this._elm,i=e.dataTransfer,s=r.options,c=m.cloneEl=a.clone(l,!0);c.draggable=!1,c.style["will-change"]="",d.toggleClass(c,r.options.chosenClass,!1),r._cloneId=t.defer(function(){r.options.removeCloneOnHide||n.insertBefore(c,l),r._dispatchEvent(r,n,"clone",l)}),o||d.toggleClass(l,s.dragClass,!0),o||(i&&(i.effectAllowed="move",s.setData&&s.setData.call(r,i,l)),d.css(l,"transform","translateZ(0)")),m.awaitingDragStarted=!0,r._dragStartId=t.defer(r._dragStarted.bind(r,o,e))},_dragStarted:function(e,t){m.awaitingDragStarted=!1;var o=this.dragEl,r=this._elm,l=m.oldIndex,n=m.oldDraggableIndex;if(r&&o){m.start(this);var a=this.options;!e&&d.toggleClass(o,a.dragClass,!1),d.toggleClass(o,a.ghostClass,!0),d.css(o,"transform",""),m.active=this,this._dispatchEvent(this,r,"start",o,r,r,l,void 0,n,void 0,t)}else this._nulling()},_onDragEnd:function(e){this._elm,this.options,this.dragEl,m.putSortable;m.awaitingDragStarted=!1,!1,v._nulling(),v._clearAutoScrolls(),v._cancelThrottle(),clearTimeout(this._dragStartTimer),this._cloneId&&(this._cloneId.stop(),this._cloneId=null),this._dragStartId&&(this._dragStartId.stop(),this._dragStartId=null),this.nativeDraggable&&(c.off(this.dragEl,"dragstart",this._onDragStart),c.off(this.dragEl,"dragend",this._onDragEnd)),x=null,y.forEach(function(e){e.checked=!0}),y.length=0,this.dragEl=null,m.end()},_onMove:function(e,t,o,r,l,n,a,i){var d,g,h=e[m.expando],u=h.options.onMove;return d=c.create("move",{to:t,from:e,dragged:o,draggedRect:r,related:l||t,relatedRect:n||s.boundingRect(t),willInsertAfter:i,originalEvent:a}),e.dispatchEvent(d),u&&(g=u.call(h,d,a)),g},_computeIsAligned:function(e){var t,o=m.draggable.dragEl;if(t=e.target,t=i.closest(t,this.options.draggable,this.el,!1),!B&&o&&o.parentNode===this.el){for(var r=this.el.children,l=0;l<r.length;l++)i.closest(r[l],this.options.draggable,this.el,!1)&&r[l]!==t&&(r[l].sortableMouseAligned=b._isClientInRowColumn(e.clientX,e.clientY,r[l],this._getDirection(e,null),this.options));i.closest(t,this.options.draggable,this.el,!0)||(S=null),B=!0,N(function(){B=!1},30)}},_getDirection:function(e,t){var o=m.draggable.dragEl;return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,o,k.ghostEl):this.options.direction},_animate:function(e,t){var o=this.options.animation,r=m.draggable.dragEl;if(o){var l=s.boundingRect(t);if(t===r&&l,1===e.nodeType&&(e=s.boundingRect(e)),e.left+e.width/2!==l.left+l.width/2||e.top+e.height/2!==l.top+l.height/2){var n=g.matrix(this.el),a=n&&n.a,i=n&&n.d;d.css(t,"transition","none"),d.css(t,"transform","translate3d("+(e.left-l.left)/(a||1)+"px,"+(e.top-l.top)/(i||1)+"px,0)"),this._repaint(t),d.css(t,"transition","transform "+o+"ms"+(this.options.easing?" "+this.options.easing:"")),d.css(t,"transform","translate3d(0,0,0)")}"number"==typeof t.animated&&clearTimeout(t.animated),t.animated=N(function(){d.css(t,"transition",""),d.css(t,"transform",""),t.animated=!1},o)}},_repaint:function(e){return e.offsetWidth},_offUpEvents:function(){var e=this.el.ownerDocument;c.off(e,"mouseup",this._onDrop),c.off(A,"selectstart",this)},_onDragOver:function(e){var t,o,r,l=this.el,n=e.target,a=this.options,c=a.group,g=m.active,h=m.activeGroup===c,u=a.sort,f=this,p=m.draggable.dragEl,x=m.draggable.elm(),y=m.putSortable,_=m.nextEl,w=m.oldIndex,P=m.oldDraggableIndex;if(!Y){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),E=!0,n=i.closest(n,a.draggable,l,!0),p.contains(e.target)||n.animated)return V(!1);if(n!==p&&(m.ignoreNextClick=!1),g&&!a.disabled&&(h?u||(r=!x.contains(p)):y===this||(this.lastPutMode=m.activeGroup.checkPull(this,g,p,e))&&c.checkPut(this,g,p,e))){var M=this._getDirection(e,n);if(t=s.boundingRect(p),r)return this._hideClone(),m.parentEl=x,_?x.insertBefore(p,_):x.appendChild(p),V(!0);var X=k._lastChild(l);if(!X||k._ghostIsLast(e,M,l)&&!X.animated){if(X&&l===e.target&&(n=X),n&&(o=s.boundingRect(n)),h?g._hideClone():g._showClone(this),!1!==this._onMove(x,l,p,t,n,o,e,!!n))return l.appendChild(p),m.parentEl=l,null,Z(),V(!0)}else if(n&&n!==p&&n.parentNode===l){var B,O=0,H=n.sortableMouseAligned,q=p.parentNode!==l,z="vertical"===M?"top":"left",F=v._isScrolledPast(n,"top")||v._isScrolledPast(p,"top"),L=F?F.scrollTop:void 0;if(S!==n&&(C=null,B=s.boundingRect(n)[z],R=!1),b._isElInRowColumn(p,n,M)&&H||q||F||a.invertSwap||"insert"===C||"swap"===C?("swap"!==C&&(T=a.invertSwap||q),O=function(e,t,o,r,l,n,a){var i=s.boundingRect(t),d="vertical"===o?e.clientY:e.clientX,c="vertical"===o?i.height:i.width,g="vertical"===o?i.top:i.left,h="vertical"===o?i.bottom:i.right,u=s.boundingRect(p),f=!1;if(!n)if(a&&I<c*r)if(!R&&(1===D?d>g+c*l/2:d<h-c*l/2)&&(R=!0),R)f=!0;else{"vertical"===o?u.top:u.left,"vertical"===o?u.bottom:u.right;if(1===D?d<g+I:d>h-I)return-1*D}else if(d>g+c*(1-r)/2&&d<h-c*(1-r)/2)return J(t);if((f=f||n)&&(d<g+c*l/2||d>h-c*l/2))return d>g+c/2?1:-1;return 0}(e,n,M,a.swapThreshold,null==a.invertedSwapThreshold?a.swapThreshold:a.invertedSwapThreshold,T,S===n),C="swap"):(O=J(n),C="insert"),0===O)return V(!1);null,S=n,D=O,o=s.boundingRect(n);var U=n.nextElementSibling,W=!1;W=1===O;var j=this._onMove(x,l,p,t,n,o,e,W);if(!1!==j)return 1!==j&&-1!==j||(W=1===j),Y=!0,N(G,30),h?g._hideClone():g._showClone(this),W&&!U?l.appendChild(p):n.parentNode.insertBefore(p,W?U:n),F&&s.scrollBy(F,0,L-F.scrollTop),m.parentEl=p.parentNode,void 0===B||T||(I=Math.abs(B-s.boundingRect(n)[z])),Z(),V(!0)}if(l.contains(p))return V(!1)}return!1}function V(r){return r&&(h?g._hideClone():g._showClone(f),g&&(d.toggleClass(p,y?y.options.ghostClass:g.options.ghostClass,!1),d.toggleClass(p,a.ghostClass,!0)),y!==f&&f!==m.active?y=m.putSortable=f:f===m.active&&(y=m.putSortable=null),t&&f._animate(t,p),n&&o&&f._animate(o,n)),(n===p&&!p.animated||n===l&&!n.animated)&&(S=null),a.dragoverBubble||e.rootEl||n===A||(m.over(e),p.parentNode[m.expando]._computeIsAligned(e),!r&&m.nearestEmptyInsertDetectEvent(e)),!a.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),!0}function Z(){f._dispatchEvent(f,x,"change",n,l,x,w,b._index(p),P,b._index(p,a.draggable),e)}function J(e){var t=b._index(p),o=b._index(e);return t<o?1:-1}},_onDrop:function(e){this.el;var t=this.options,o=m.draggable.elm(),r=m.draggable.dragEl,l=m.putSortable,n=m.parentEl,i=m.oldIndex,s=m.oldDraggableIndex,g=m.nextEl;T=!1,R=!1,this.nativeDraggable&&c.off(A,"drop",this),this._offUpEvents(),e&&(E&&(e.cancelable&&e.preventDefault(),!t.dropBubble&&e.stopPropagation()),k.remove(),(o===n||l&&"clone"!==l.lastPutMode)&&a.remove(m.cloneEl),r&&(m._disableDraggable(r),r.style["will-change"]="",d.toggleClass(r,l?l.options.ghostClass:this.options.ghostClass,!1),d.toggleClass(r,this.options.chosenClass,!1),this._dispatchEvent(this,o,"unchoose",r,n,o,i,null,s,null,e),o!==n?(_=b._index(r),w=b._index(r,t.draggable),_>=0&&(this._dispatchEvent(null,n,"add",r,n,o,i,_,s,w,e),this._dispatchEvent(this,o,"remove",r,n,o,i,_,s,w,e),this._dispatchEvent(null,n,"sort",r,n,o,i,_,s,w,e),this._dispatchEvent(this,o,"sort",r,n,o,i,_,s,w,e)),l&&l.save()):r.nextSibling!==g&&(_=b._index(r),w=b._index(r,t.draggable),_>=0&&(this._dispatchEvent(this,o,"update",r,n,o,i,_,s,w,e),this._dispatchEvent(this,o,"sort",r,n,o,i,_,s,w,e))),m.active&&(null!=_&&-1!==_||(_=i,w=s),this._dispatchEvent(this,o,"end",r,n,o,i,_,s,w,e),this.save()))),this._nulling()},_nulling:function(){E=_=S=D=null},_hideClone:function(){m.cloneEl.cloneHidden||(d.hide(m.cloneEl),m.cloneEl.cloneHidden=!0,m.cloneEl.parentNode&&this.options.removeCloneOnHide&&a.remove(m.cloneEl))},_showClone:function(e){var t=m.active.el,o=m.nextEl;"clone"===e.lastPutMode?m.cloneEl.cloneHidden&&(t.contains(m.draggable.dragEl)&&!this.options.group.revertClone?t.insertBefore(m.cloneEl,m.draggable.dragEl):o?t.insertBefore(m.cloneEl,o):t.appendChild(m.cloneEl),this.options.group.revertClone&&this._animate(m.draggable.dragEl,m.cloneEl),d.show(m.cloneEl),m.cloneEl.cloneHidden=!1):this._hideClone()},handleEvent:function(e){switch(e.type){case"drop":this._onDrop(e);break;case"dragenter":case"dragover":m.draggable.dragEl&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move");e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},_dispatchEvent:function(e,t,o,r,l,n,a,i,s,d,g){var h,u=(e=e||t[expando]).options,f="on"+o.charAt(0).toUpperCase()+o.substr(1),p=this.putSortable;h=c.create(o,{to:l||t,from:n||t,item:r||t,clone:this.cloneEl,oldIndex:a,newIndex:i,oldDraggableIndex:s,newDraggableIndex:d,originalEvent:g,pullMode:p?p.lastPutMode:void 0}),t&&t.dispatchEvent(h),u[f]&&u[f].call(e,h)},toArray:function(){for(var e,t=[],o=this.el.children,r=0,l=o.length,n=this.options;r<l;r++)e=o[r],i.closest(e,n.draggable,this.el,!1)&&t.push(e.getAttribute(n.dataIdAttr)||a.generateId(e));return t},sort:function(e){var t={},o=this.el;this.toArray().forEach(function(e,r){var l=o.children[r];i.closest(l,this.options.draggable,o,!1)&&(t[e]=l)},this),e.forEach(function(e){t[e]&&(o.removeChild(t[e]),o.appendChild(t[e]))})},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return i.closest(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var o=this.options;if(void 0===t)return o[e];o[e]=t,"group"===e&&O(o)},destroy:function(){var e=this.el;e[m.expando]=null,c.off(e,"mousedown",this._onTapStart),this.nativeDraggable&&(c.off(e,"dragover",this),c.off(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),m.sortables.splice(m.sortables.indexOf(this.el),1),this.el=e=null}});function G(){Y=!1}return H.create=function(e,t){return new H(e,t)},H.version="1.9.0",e.attach("intg.Sortable",H)}),e("skylark-sortable/main",["skylark-langx","skylark-domx-eventer","skylark-domx-finder","skylark-domx-noder","skylark-domx-styler","./autoscroll","./containers","./Sortable"],function(e,t,o,r,l,n,a,i){return i.utils={on:t.on,off:t.off,css:l.css,is:function(e,t){return!!o.closest(e,t,e,!1)},extend:e.mixin,throttle:n._throttle,closest:o.closest,toggleClass:l.toggleClass,clone:function(e){return r.clone(e,!0)},index:a._index,nextTick:function(t){return e.defer(t)},cancelNextTick:function(e){return e&&e.stop()},getChild:function(e,t,r){return r.excluding=[],r.closesting=r.draggable,o.childAt(e,t,r)}},i}),e("skylark-sortable",["skylark-sortable/main"],function(e){return e})}(o),!r){var a=require("skylark-langx-ns");l?module.exports=a:t.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map
