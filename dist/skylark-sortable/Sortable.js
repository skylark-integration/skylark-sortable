/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/skylark"],function(t){var e,o,n,i,r,a,l,s,c,d,h,u,f,p,v,g,m,b,w,_,y,D,T,C,S,E,x,M,N=[],k=!1,P=!1,A=!1,X=[],Y=!1,I=!1,O=[],H=/\s+/g,B="Sortable"+(new Date).getTime(),R=window,L=R.document,W=R.parseInt,F=R.setTimeout,z=R.jQuery||R.Zepto,U=R.Polymer,j={capture:!1,passive:!1},V=!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),G=!!navigator.userAgent.match(/Edge/i),K=!!navigator.userAgent.match(/firefox/i),Z=!(!navigator.userAgent.match(/safari/i)||navigator.userAgent.match(/chrome/i)||navigator.userAgent.match(/android/i)),q=!!navigator.userAgent.match(/iP(ad|od|hone)/i),Q=G||V?"cssFloat":"float",J="draggable"in L.createElement("div"),$=function(){if(V)return!1;var t=L.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}(),tt=!1,et=!1,ot=Math.abs,nt=Math.min,it=Math.max,rt=[],at=function(t,e){var o=Ct(t),n=W(o.width)-W(o.paddingLeft)-W(o.paddingRight)-W(o.borderLeftWidth)-W(o.borderRightWidth),i=Pt(t,0,e),r=Pt(t,1,e),a=i&&Ct(i),l=r&&Ct(r),s=a&&W(a.marginLeft)+W(a.marginRight)+Ft(i).width,c=l&&W(l.marginLeft)+W(l.marginRight)+Ft(r).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?"vertical":"horizontal";if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(i&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==l.clear&&l.clear!==d?"horizontal":"vertical"}return i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||s>=n&&"none"===o[Q]||r&&"none"===o[Q]&&s+c>n)?"vertical":"horizontal"},lt=function(t,e){if(!t||!t.getBoundingClientRect)return st();var o=t,n=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=Ct(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===L.body)return st();if(n||e)return o;n=!0}}}while(o=o.parentNode);return st()},st=function(){return V?L.documentElement:L.scrollingElement},ct=function(t,e,o){t.scrollLeft+=e,t.scrollTop+=o},dt=Ht(function(t,e,o,n){if(e.scroll){var i=o?o[B]:window,r=e.scrollSensitivity,a=e.scrollSpeed,l=t.clientX,h=t.clientY,u=st(),f=!1;c!==o&&(ht(),s=e.scroll,d=e.scrollFn,!0===s&&(s=lt(o,!0),c=s));var p=0,v=s;do{var g,m,b,w,_,D,T,C,S,E=v,x=Ft(E),M=x.top,P=x.bottom,A=x.left,X=x.right,Y=x.width,I=x.height;if(g=E.scrollWidth,m=E.scrollHeight,b=Ct(E),C=E.scrollLeft,S=E.scrollTop,E===u?(D=Y<g&&("auto"===b.overflowX||"scroll"===b.overflowX||"visible"===b.overflowX),T=I<m&&("auto"===b.overflowY||"scroll"===b.overflowY||"visible"===b.overflowY)):(D=Y<g&&("auto"===b.overflowX||"scroll"===b.overflowX),T=I<m&&("auto"===b.overflowY||"scroll"===b.overflowY)),w=D&&(ot(X-l)<=r&&C+Y<g)-(ot(A-l)<=r&&!!C),_=T&&(ot(P-h)<=r&&S+I<m)-(ot(M-h)<=r&&!!S),!N[p])for(var O=0;O<=p;O++)N[O]||(N[O]={});N[p].vx==w&&N[p].vy==_&&N[p].el===E||(N[p].el=E,N[p].vx=w,N[p].vy=_,clearInterval(N[p].pid),!E||0==w&&0==_||(f=!0,N[p].pid=setInterval(function(){n&&0===this.layer&&(bt.active._emulateDragOver(!0),bt.active._onTouchMove(y,!0));var e=N[this.layer].vy?N[this.layer].vy*a:0,o=N[this.layer].vx?N[this.layer].vx*a:0;"function"==typeof d&&"continue"!==d.call(i,o,e,t,y,N[this.layer].el)||ct(N[this.layer].el,o,e)}.bind({layer:p}),24))),p++}while(e.bubbleScroll&&v!==u&&(v=lt(v,!1)));k=f}},30),ht=function(){N.forEach(function(t){clearInterval(t.pid)}),N=[]},ut=function(t){function e(t,o){return function(n,i,r,a){var l=n.options.group.name&&i.options.group.name&&n.options.group.name===i.options.group.name;if(null==t&&(o||l))return!0;if(null==t||!1===t)return!1;if(o&&"clone"===t)return t;if("function"==typeof t)return e(t(n,i,r,a),o)(n,i,r,a);var s=(o?n:i).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var o={},n=t.group;n&&"object"==typeof n||(n={name:n}),o.name=n.name,o.checkPull=e(n.pull,!0),o.checkPut=e(n.put),o.revertClone=n.revertClone,t.group=o},ft=function(t){e&&e.parentNode&&e.parentNode[B]&&e.parentNode[B]._computeIsAligned(t)},pt=function(){!$&&n&&Ct(n,"display","none")},vt=function(){!$&&n&&Ct(n,"display","")};L.addEventListener("click",function(t){if(A)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),A=!1,!1},!0);var gt,mt=function(t){if(e){var o=function(t,e){for(var o=0;o<X.length;o++)if(!At(X[o])){var n=Ft(X[o]),i=X[o][B].options.emptyInsertThreshold,r=t>=n.left-i&&t<=n.right+i,a=e>=n.top-i&&e<=n.bottom+i;if(i&&r&&a)return X[o]}}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(o){var n={};for(var i in t)n[i]=t[i];n.target=n.rootEl=o,n.preventDefault=void 0,n.stopPropagation=void 0,o[B]._onDragOver(n)}}};function bt(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(t);this.el=t,this.options=e=Bt({},e),t[B]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable:/[uo]l/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return at(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:W(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==bt.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var n in o)!(n in e)&&(e[n]=o[n]);for(var i in ut(e),this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&J,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?yt(t,"pointerdown",this._onTapStart):(yt(t,"mousedown",this._onTapStart),yt(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(yt(t,"dragover",this),yt(t,"dragenter",this)),X.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[])}function wt(t,e,o,n){if(t){o=o||L;do{if(null!=e&&(">"===e[0]?t.parentNode===o&&Ot(t,e):Ot(t,e))||n&&t===o)return t;if(t===o)break}while(t=_t(t))}return null}function _t(t){return t.host&&t!==L&&t.host.nodeType?t.host:t.parentNode}function yt(t,e,o){t.addEventListener(e,o,!V&&j)}function Dt(t,e,o){t.removeEventListener(e,o,!V&&j)}function Tt(t,e,o){if(t&&e)if(t.classList)t.classList[o?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(H," ").replace(" "+e+" "," ");t.className=(n+(o?" "+e:"")).replace(H," ")}}function Ct(t,e,o){var n=t&&t.style;if(n){if(void 0===o)return L.defaultView&&L.defaultView.getComputedStyle?o=L.defaultView.getComputedStyle(t,""):t.currentStyle&&(o=t.currentStyle),void 0===e?o:o[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=o+("string"==typeof o?"":"px")}}function St(t){var e="";do{var o=Ct(t,"transform");o&&"none"!==o&&(e=o+" "+e)}while(t=t.parentNode);return window.DOMMatrix?new DOMMatrix(e):window.WebKitCSSMatrix?new WebKitCSSMatrix(e):window.CSSMatrix?new CSSMatrix(e):void 0}function Et(t,e,o){if(t){var n=t.getElementsByTagName(e),i=0,r=n.length;if(o)for(;i<r;i++)o(n[i],i);return n}return[]}function xt(t,e,o,n,r,a,l,s,c,d,h){var u,f=(t=t||e[B]).options,p="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||V||G?(u=L.createEvent("Event")).initEvent(o,!0,!0):u=new CustomEvent(o,{bubbles:!0,cancelable:!0}),u.to=r||e,u.from=a||e,u.item=n||e,u.clone=i,u.oldIndex=l,u.newIndex=s,u.oldDraggableIndex=c,u.newDraggableIndex=d,u.originalEvent=h,u.pullMode=g?g.lastPutMode:void 0,e&&e.dispatchEvent(u),f[p]&&f[p].call(t,u)}function Mt(t,e,o,n,i,r,a,l){var s,c,d=t[B],h=d.options.onMove;return!window.CustomEvent||V||G?(s=L.createEvent("Event")).initEvent("move",!0,!0):s=new CustomEvent("move",{bubbles:!0,cancelable:!0}),s.to=e,s.from=t,s.dragged=o,s.draggedRect=n,s.related=i||e,s.relatedRect=r||Ft(e),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function Nt(t){t.draggable=!1}function kt(){tt=!1}function Pt(t,o,i){for(var r=0,a=0,l=t.children;a<l.length;){if("none"!==l[a].style.display&&l[a]!==n&&l[a]!==e&&wt(l[a],i.draggable,t,!1)){if(r===o)return l[a];r++}a++}return null}function At(t){for(var e=t.lastElementChild;e&&(e===n||"none"===Ct(e,"display"));)e=e.previousElementSibling;return e||null}function Xt(t){return It(e)<It(t)?1:-1}function Yt(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,o=e.length,n=0;o--;)n+=e.charCodeAt(o);return n.toString(36)}function It(t,e){var o=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||t===i||e&&!Ot(t,e)||o++;return o}function Ot(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function Ht(t,e){return function(){if(!gt){var o=arguments,n=this;gt=F(function(){1===o.length?t.call(n,o[0]):t.apply(n,o),gt=void 0},e)}}}function Bt(t,e){if(t&&e)for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}function Rt(t){return U&&U.dom?U.dom(t).cloneNode(!0):z?z(t).clone(!0)[0]:t.cloneNode(!0)}function Lt(t){return F(t,0)}function Wt(t){return clearTimeout(t)}function Ft(t,e,o,n){if(t.getBoundingClientRect||t===R){var i,r,a,l,s,c,d;if(t!==R&&t!==st()?(r=(i=t.getBoundingClientRect()).top,a=i.left,l=i.bottom,s=i.right,c=i.height,d=i.width):(r=0,a=0,l=window.innerHeight,s=window.innerWidth,c=window.innerHeight,d=window.innerWidth),n&&t!==R&&(o=o||t.parentNode,!V))do{if(o&&o.getBoundingClientRect&&"none"!==Ct(o,"transform")){var h=o.getBoundingClientRect();r-=h.top+W(Ct(o,"border-top-width")),a-=h.left+W(Ct(o,"border-left-width")),l=r+i.height,s=a+i.width;break}}while(o=o.parentNode);if(e&&t!==R){var u=St(o||t),f=u&&u.a,p=u&&u.d;u&&(l=(r/=p)+(c/=p),s=(a/=f)+(d/=f))}return{top:r,left:a,bottom:l,right:s,width:d,height:c}}}function zt(t,e){for(var o=lt(t,!0),n=Ft(t)[e];o;){var i=Ft(o)[e];if(!("top"===e||"left"===e?n>=i:n<=i))return o;if(o===st())break;o=lt(o,!1)}return!1}function Ut(t){var e=0,o=0,n=st();if(t)do{var i=St(t),r=i.a,a=i.d;e+=t.scrollLeft*r,o+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,o]}return bt.prototype={constructor:bt,_computeIsAligned:function(t){var o;if(n&&!$?(pt(),o=L.elementFromPoint(t.clientX,t.clientY),vt()):o=t.target,o=wt(o,this.options.draggable,this.el,!1),!et&&e&&e.parentNode===this.el){for(var i,r,a,l,s,c,d,h,u=this.el.children,f=0;f<u.length;f++)wt(u[f],this.options.draggable,this.el,!1)&&u[f]!==o&&(u[f].sortableMouseAligned=(i=t.clientX,r=t.clientY,a=u[f],l=this._getDirection(t,null),this.options,void 0,void 0,void 0,void 0,s=Ft(a),c="vertical"===l?s.left:s.top,d="vertical"===l?s.right:s.bottom,c<(h="vertical"===l?i:r)&&h<d));wt(o,this.options.draggable,this.el,!0)||(T=null),et=!0,F(function(){et=!1},30)}},_getDirection:function(t,o){return"function"==typeof this.options.direction?this.options.direction.call(this,t,o,e):this.options.direction},_onTapStart:function(t){if(t.cancelable){var o,n,i=this,r=this.el,a=this.options,s=a.preventOnFilter,c=t.type,d=t.touches&&t.touches[0],h=(d||t).target,u=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||h,f=a.filter;if(function(t){rt.length=0;var e=t.getElementsByTagName("input"),o=e.length;for(;o--;){var n=e[o];n.checked&&rt.push(n)}}(r),!e&&!(/mousedown|pointerdown/.test(c)&&0!==t.button||a.disabled||u.isContentEditable||(h=wt(h,a.draggable,r,!1),l===h))){if(o=It(h),n=It(h,a.draggable),"function"==typeof f){if(f.call(this,t,h,this))return xt(i,u,"filter",h,r,r,o,void 0,n),void(s&&t.cancelable&&t.preventDefault())}else if(f&&(f=f.split(",").some(function(t){if(t=wt(u,t.trim(),r,!1))return xt(i,t,"filter",h,r,r,o,void 0,n),!0})))return void(s&&t.cancelable&&t.preventDefault());a.handle&&!wt(u,a.handle,r,!1)||this._prepareDragStart(t,d,h,o,n)}}},_handleAutoScroll:function(t,o){if(e&&this.options.scroll){var n=t.clientX,i=t.clientY,r=L.elementFromPoint(n,i),a=this;if(o||G||V||Z){dt(t,a.options,r,o);var l=lt(r,!0);!k||m&&n===b&&i===w||(m&&clearInterval(m),m=setInterval(function(){if(e){var r=lt(L.elementFromPoint(n,i),!0);r!==l&&(l=r,ht(),dt(t,a.options,l,o))}},10),b=n,w=i)}else{if(!a.options.bubbleScroll||lt(r,!0)===st())return void ht();dt(t,a.options,lt(r,!1),!1)}}},_prepareDragStart:function(t,n,i,s,c){var d,u=this,p=u.el,g=u.options,m=p.ownerDocument;i&&!e&&i.parentNode===p&&(r=p,o=(e=i).parentNode,a=e.nextSibling,l=i,v=g.group,h=s,f=c,_={target:e,clientX:(n||t).clientX,clientY:(n||t).clientY},this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,e.style["will-change"]="all",e.style.transition="",e.style.transform="",d=function(){u._disableDelayedDragEvents(),!K&&u.nativeDraggable&&(e.draggable=!0),u._triggerDragStart(t,n),xt(u,r,"choose",e,r,r,h,void 0,f),Tt(e,g.chosenClass,!0)},g.ignore.split(",").forEach(function(t){Et(e,t.trim(),Nt)}),yt(m,"dragover",mt),yt(m,"mousemove",mt),yt(m,"touchmove",mt),yt(m,"mouseup",u._onDrop),yt(m,"touchend",u._onDrop),yt(m,"touchcancel",u._onDrop),K&&this.nativeDraggable&&(this.options.touchStartThreshold=4,e.draggable=!0),!g.delay||g.delayOnTouchOnly&&!n||this.nativeDraggable&&(G||V)?d():(yt(m,"mouseup",u._disableDelayedDrag),yt(m,"touchend",u._disableDelayedDrag),yt(m,"touchcancel",u._disableDelayedDrag),yt(m,"mousemove",u._delayedDragTouchMoveHandler),yt(m,"touchmove",u._delayedDragTouchMoveHandler),g.supportPointer&&yt(m,"pointermove",u._delayedDragTouchMoveHandler),u._dragStartTimer=F(d,g.delay)))},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;it(ot(e.clientX-this._lastX),ot(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){e&&Nt(e),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Dt(t,"mouseup",this._disableDelayedDrag),Dt(t,"touchend",this._disableDelayedDrag),Dt(t,"touchcancel",this._disableDelayedDrag),Dt(t,"mousemove",this._delayedDragTouchMoveHandler),Dt(t,"touchmove",this._delayedDragTouchMoveHandler),Dt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,o){o=o||("touch"==t.pointerType?t:null),!this.nativeDraggable||o?this.options.supportPointer?yt(L,"pointermove",this._onTouchMove):yt(L,o?"touchmove":"mousemove",this._onTouchMove):(yt(e,"dragend",this),yt(r,"dragstart",this._onDragStart));try{L.selection?Lt(function(){L.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,o){if(P=!1,r&&e){this.nativeDraggable&&(yt(L,"dragover",this._handleAutoScroll),yt(L,"dragover",ft));var n=this.options;!t&&Tt(e,n.dragClass,!1),Tt(e,n.ghostClass,!0),Ct(e,"transform",""),bt.active=this,t&&this._appendGhost(),xt(this,r,"start",e,r,r,h,void 0,f,void 0,o)}else this._nulling()},_emulateDragOver:function(t){if(y){if(this._lastX===y.clientX&&this._lastY===y.clientY&&!t)return;this._lastX=y.clientX,this._lastY=y.clientY,pt();for(var o=L.elementFromPoint(y.clientX,y.clientY),n=o;o&&o.shadowRoot&&(o=o.shadowRoot.elementFromPoint(y.clientX,y.clientY))!==n;)n=o;if(n)do{if(n[B])if(n[B]._onDragOver({clientX:y.clientX,clientY:y.clientY,target:o,rootEl:n})&&!this.options.dragoverBubble)break;o=n}while(n=n.parentNode);e.parentNode[B]._computeIsAligned(y),vt()}},_onTouchMove:function(t,e){if(_){var o=this.options,i=o.fallbackTolerance,r=o.fallbackOffset,a=t.touches?t.touches[0]:t,l=n&&St(n),s=n&&l&&l.a,c=n&&l&&l.d,d=q&&x&&Ut(x),h=(a.clientX-_.clientX+r.x)/(s||1)+(d?d[0]-O[0]:0)/(s||1),u=(a.clientY-_.clientY+r.y)/(c||1)+(d?d[1]-O[1]:0)/(c||1),f=t.touches?"translate3d("+h+"px,"+u+"px,0)":"translate("+h+"px,"+u+"px)";if(!bt.active&&!P){if(i&&nt(ot(a.clientX-this._lastX),ot(a.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}!e&&this._handleAutoScroll(a,!0),D=!0,y=a,Ct(n,"webkitTransform",f),Ct(n,"mozTransform",f),Ct(n,"msTransform",f),Ct(n,"transform",f),t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!n){var t=this.options.fallbackOnBody?L.body:r,o=Ft(e,!0,t,!q),i=(Ct(e),this.options);if(q){for(x=t;"static"===Ct(x,"position")&&"none"===Ct(x,"transform")&&x!==L;)x=x.parentNode;if(x!==L){var a=Ft(x,!0);o.top-=a.top,o.left-=a.left}x!==L.body&&x!==L.documentElement?(x===L&&(x=st()),o.top+=x.scrollTop,o.left+=x.scrollLeft):x=st(),O=Ut(x)}Tt(n=e.cloneNode(!0),i.ghostClass,!1),Tt(n,i.fallbackClass,!0),Tt(n,i.dragClass,!0),Ct(n,"box-sizing","border-box"),Ct(n,"margin",0),Ct(n,"top",o.top),Ct(n,"left",o.left),Ct(n,"width",o.width),Ct(n,"height",o.height),Ct(n,"opacity","0.8"),Ct(n,"position",q?"absolute":"fixed"),Ct(n,"zIndex","100000"),Ct(n,"pointerEvents","none"),t.appendChild(n)}},_onDragStart:function(t,o){var n=this,a=t.dataTransfer,l=n.options;(i=Rt(e)).draggable=!1,i.style["will-change"]="",this._hideClone(),Tt(i,n.options.chosenClass,!1),n._cloneId=Lt(function(){n.options.removeCloneOnHide||r.insertBefore(i,e),xt(n,r,"clone",e)}),!o&&Tt(e,l.dragClass,!0),o?(A=!0,n._loopId=setInterval(n._emulateDragOver,50)):(Dt(L,"mouseup",n._onDrop),Dt(L,"touchend",n._onDrop),Dt(L,"touchcancel",n._onDrop),a&&(a.effectAllowed="move",l.setData&&l.setData.call(n,a,e)),yt(L,"drop",n),Ct(e,"transform","translateZ(0)")),P=!0,n._dragStartId=Lt(n._dragStarted.bind(n,o,t)),yt(L,"selectstart",n),Z&&Ct(L.body,"user-select","none")},_onDragOver:function(t){var n,i,l,s=this.el,c=t.target,d=this.options,u=d.group,p=bt.active,m=v===u,b=d.sort,w=this;if(!tt){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),D=!0,c=wt(c,d.draggable,s,!0),e.contains(t.target)||c.animated)return U(!1);if(c!==e&&(A=!1),p&&!d.disabled&&(m?b||(l=!r.contains(e)):g===this||(this.lastPutMode=v.checkPull(this,p,e,t))&&u.checkPut(this,p,e,t))){var _=this._getDirection(t,c);if(n=Ft(e),l)return this._hideClone(),o=r,a?r.insertBefore(e,a):r.appendChild(e),U(!0);var y=At(s);if(!y||function(t,e,o){var n=Ft(At(o)),i="vertical"===e?t.clientY:t.clientX,r="vertical"===e?t.clientX:t.clientY,a="vertical"===e?n.bottom:n.right,l="vertical"===e?n.left:n.top,s="vertical"===e?n.right:n.bottom;return"vertical"===e?r>s+10||r<=s&&i>a&&r>=l:i>a&&r>l||i<=a&&r>s+10}(t,_,s)&&!y.animated){if(y&&s===t.target&&(c=y),c&&(i=Ft(c)),m?p._hideClone():p._showClone(this),!1!==Mt(r,s,e,n,c,i,t,!!c))return s.appendChild(e),o=s,M=null,j(),U(!0)}else if(c&&c!==e&&c.parentNode===s){var x,N=0,k=c.sortableMouseAligned,P=e.parentNode!==s,X="vertical"===_?"top":"left",O=zt(c,"top")||zt(e,"top"),H=O?O.scrollTop:void 0;if(T!==c&&(S=null,x=Ft(c)[X],Y=!1),function(t,o,n){var i=t===e&&M||Ft(t),r=o===e&&M||Ft(o),a="vertical"===n?i.left:i.top,l="vertical"===n?i.right:i.bottom,s="vertical"===n?i.width:i.height,c="vertical"===n?r.left:r.top,d="vertical"===n?r.right:r.bottom,h="vertical"===n?r.width:r.height;return a===c||l===d||a+s/2===c+h/2}(e,c,_)&&k||P||O||d.invertSwap||"insert"===S||"swap"===S?("swap"!==S&&(I=d.invertSwap||P),N=function(t,o,n,i,r,a,l){var s=Ft(o),c="vertical"===n?t.clientY:t.clientX,d="vertical"===n?s.height:s.width,h="vertical"===n?s.top:s.left,u="vertical"===n?s.bottom:s.right,f=Ft(e),p=!1;if(!a)if(l&&E<d*i)if(!Y&&(1===C?c>h+d*r/2:c<u-d*r/2)&&(Y=!0),Y)p=!0;else{"vertical"===n?f.top:f.left,"vertical"===n?f.bottom:f.right;if(1===C?c<h+E:c>u-E)return-1*C}else if(c>h+d*(1-i)/2&&c<u-d*(1-i)/2)return Xt(o);if((p=p||a)&&(c<h+d*r/2||c>u-d*r/2))return c>h+d/2?1:-1;return 0}(t,c,_,d.swapThreshold,null==d.invertedSwapThreshold?d.swapThreshold:d.invertedSwapThreshold,I,T===c),S="swap"):(N=Xt(c),S="insert"),0===N)return U(!1);M=null,T=c,C=N,i=Ft(c);var R=c.nextElementSibling,W=!1,z=Mt(r,s,e,n,c,i,t,W=1===N);if(!1!==z)return 1!==z&&-1!==z||(W=1===z),tt=!0,F(kt,30),m?p._hideClone():p._showClone(this),W&&!R?s.appendChild(e):c.parentNode.insertBefore(e,W?R:c),O&&ct(O,0,H-O.scrollTop),o=e.parentNode,void 0===x||I||(E=ot(x-Ft(c)[X])),j(),U(!0)}if(s.contains(e))return U(!1)}return!1}function U(o){return o&&(m?p._hideClone():p._showClone(w),p&&(Tt(e,g?g.options.ghostClass:p.options.ghostClass,!1),Tt(e,d.ghostClass,!0)),g!==w&&w!==bt.active?g=w:w===bt.active&&(g=null),n&&w._animate(n,e),c&&i&&w._animate(i,c)),(c===e&&!e.animated||c===s&&!c.animated)&&(T=null),d.dragoverBubble||t.rootEl||c===L||(w._handleAutoScroll(t),e.parentNode[B]._computeIsAligned(t),!o&&mt(t)),!d.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function j(){xt(w,r,"change",c,s,r,h,It(e),f,It(e,d.draggable),t)}},_animate:function(t,o){var n=this.options.animation;if(n){var i=Ft(o);if(o===e&&(M=i),1===t.nodeType&&(t=Ft(t)),t.left+t.width/2!==i.left+i.width/2||t.top+t.height/2!==i.top+i.height/2){var r=St(this.el),a=r&&r.a,l=r&&r.d;Ct(o,"transition","none"),Ct(o,"transform","translate3d("+(t.left-i.left)/(a||1)+"px,"+(t.top-i.top)/(l||1)+"px,0)"),this._repaint(o),Ct(o,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),Ct(o,"transform","translate3d(0,0,0)")}"number"==typeof o.animated&&clearTimeout(o.animated),o.animated=F(function(){Ct(o,"transition",""),Ct(o,"transform",""),o.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offMoveEvents:function(){Dt(L,"touchmove",this._onTouchMove),Dt(L,"pointermove",this._onTouchMove),Dt(L,"dragover",mt),Dt(L,"mousemove",mt),Dt(L,"touchmove",mt)},_offUpEvents:function(){var t=this.el.ownerDocument;Dt(t,"mouseup",this._onDrop),Dt(t,"touchend",this._onDrop),Dt(t,"pointerup",this._onDrop),Dt(t,"touchcancel",this._onDrop),Dt(L,"selectstart",this)},_onDrop:function(t){var l=this.el,s=this.options;P=!1,k=!1,I=!1,Y=!1,clearInterval(this._loopId),clearInterval(m),ht(),clearTimeout(gt),gt=void 0,clearTimeout(this._dragStartTimer),Wt(this._cloneId),Wt(this._dragStartId),Dt(L,"mousemove",this._onTouchMove),this.nativeDraggable&&(Dt(L,"drop",this),Dt(l,"dragstart",this._onDragStart),Dt(L,"dragover",this._handleAutoScroll),Dt(L,"dragover",ft)),Z&&Ct(L.body,"user-select",""),this._offMoveEvents(),this._offUpEvents(),t&&(D&&(t.cancelable&&t.preventDefault(),!s.dropBubble&&t.stopPropagation()),n&&n.parentNode&&n.parentNode.removeChild(n),(r===o||g&&"clone"!==g.lastPutMode)&&i&&i.parentNode&&i.parentNode.removeChild(i),e&&(this.nativeDraggable&&Dt(e,"dragend",this),Nt(e),e.style["will-change"]="",Tt(e,g?g.options.ghostClass:this.options.ghostClass,!1),Tt(e,this.options.chosenClass,!1),xt(this,r,"unchoose",e,o,r,h,null,f,null,t),r!==o?(u=It(e),p=It(e,s.draggable),u>=0&&(xt(null,o,"add",e,o,r,h,u,f,p,t),xt(this,r,"remove",e,o,r,h,u,f,p,t),xt(null,o,"sort",e,o,r,h,u,f,p,t),xt(this,r,"sort",e,o,r,h,u,f,p,t)),g&&g.save()):e.nextSibling!==a&&(u=It(e),p=It(e,s.draggable),u>=0&&(xt(this,r,"update",e,o,r,h,u,f,p,t),xt(this,r,"sort",e,o,r,h,u,f,p,t))),bt.active&&(null!=u&&-1!==u||(u=h,p=f),xt(this,r,"end",e,o,r,h,u,f,p,t),this.save()))),this._nulling()},_nulling:function(){r=e=o=n=a=i=l=s=c=N.length=m=b=w=_=y=D=u=h=T=C=M=g=v=bt.active=null,rt.forEach(function(t){t.checked=!0}),rt.length=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":e&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],o=this.el.children,n=0,i=o.length,r=this.options;n<i;n++)wt(t=o[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||Yt(t));return e},sort:function(t){var e={},o=this.el;this.toArray().forEach(function(t,n){var i=o.children[n];wt(i,this.options.draggable,o,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(o.removeChild(e[t]),o.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return wt(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&ut(o)},destroy:function(){var t=this.el;t[B]=null,Dt(t,"mousedown",this._onTapStart),Dt(t,"touchstart",this._onTapStart),Dt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Dt(t,"dragover",this),Dt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),X.splice(X.indexOf(this.el),1),this.el=t=null},_hideClone:function(){i.cloneHidden||(Ct(i,"display","none"),i.cloneHidden=!0,i.parentNode&&this.options.removeCloneOnHide&&i.parentNode.removeChild(i))},_showClone:function(t){"clone"===t.lastPutMode?i.cloneHidden&&(r.contains(e)&&!this.options.group.revertClone?r.insertBefore(i,e):a?r.insertBefore(i,a):r.appendChild(i),this.options.group.revertClone&&this._animate(e,i),Ct(i,"display",""),i.cloneHidden=!1):this._hideClone()}},yt(L,"touchmove",function(t){(bt.active||P)&&t.cancelable&&t.preventDefault()}),bt.utils={on:yt,off:Dt,css:Ct,find:Et,is:function(t,e){return!!wt(t,e,t,!1)},extend:Bt,throttle:Ht,closest:wt,toggleClass:Tt,clone:Rt,index:It,nextTick:Lt,cancelNextTick:Wt,detectDirection:at,getChild:Pt},bt.create=function(t,e){return new bt(t,e)},bt.version="1.9.0",t.attach("itg.Sortable",bt)});
//# sourceMappingURL=sourcemaps/Sortable.js.map