/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
!function(t,e){var o=e.define,n=e.require,i="function"==typeof o&&o.amd,r=!i&&"undefined"!=typeof exports;if(!i&&!o){var a={};o=e.define=function(t,e,o){"function"==typeof o?(a[t]={factory:o,deps:e.map(function(e){return function(t,e){if("."!==t[0])return t;var o=e.split("/"),n=t.split("/");o.pop();for(var i=0;i<n.length;i++)"."!=n[i]&&(".."==n[i]?o.pop():o.push(n[i]));return o.join("/")}(e,t)}),resolved:!1,exports:null},n(t)):a[t]={factory:null,resolved:!0,exports:o}},n=e.require=function(t){if(!a.hasOwnProperty(t))throw new Error("Module "+t+" has not been defined");var o=a[t];if(!o.resolved){var i=[];o.deps.forEach(function(t){i.push(n(t))}),o.exports=o.factory.apply(e,i)||null,o.resolved=!0}return o.exports}}if(!o)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(t,e){t("skylark-sortable/Sortable",["skylark-langx/skylark"],function(t){var e,o,n,i,r,a,l,s,c,d,h,u,f,p,v,g,m,b,y,w,_,D,T,S,C,x,E,k,M=[],N=!1,P=!1,A=!1,X=[],Y=!1,I=!1,O=[],H=/\s+/g,B="Sortable"+(new Date).getTime(),R=window,L=R.document,W=R.parseInt,F=R.setTimeout,z=R.jQuery||R.Zepto,j=R.Polymer,q={capture:!1,passive:!1},U=!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie|iemobile)/i),V=!!navigator.userAgent.match(/Edge/i),G=!!navigator.userAgent.match(/firefox/i),K=!(!navigator.userAgent.match(/safari/i)||navigator.userAgent.match(/chrome/i)||navigator.userAgent.match(/android/i)),Z=!!navigator.userAgent.match(/iP(ad|od|hone)/i),Q=Z,J=V||U?"cssFloat":"float",$="draggable"in L.createElement("div"),tt=function(){if(U)return!1;var t=L.createElement("x");return t.style.cssText="pointer-events:auto","auto"===t.style.pointerEvents}(),et=!1,ot=!1,nt=Math.abs,it=Math.min,rt=Math.max,at=[],lt=function(t,e){var o=Ct(t),n=W(o.width)-W(o.paddingLeft)-W(o.paddingRight)-W(o.borderLeftWidth)-W(o.borderRightWidth),i=At(t,0,e),r=At(t,1,e),a=i&&Ct(i),l=r&&Ct(r),s=a&&W(a.marginLeft)+W(a.marginRight)+zt(i).width,c=l&&W(l.marginLeft)+W(l.marginRight)+zt(r).width;if("flex"===o.display)return"column"===o.flexDirection||"column-reverse"===o.flexDirection?"vertical":"horizontal";if("grid"===o.display)return o.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(i&&"none"!==a.float){var d="left"===a.float?"left":"right";return!r||"both"!==l.clear&&l.clear!==d?"horizontal":"vertical"}return i&&("block"===a.display||"flex"===a.display||"table"===a.display||"grid"===a.display||s>=n&&"none"===o[J]||r&&"none"===o[J]&&s+c>n)?"vertical":"horizontal"},st=function(t,e){if(!t||!t.getBoundingClientRect)return ct();var o=t,n=!1;do{if(o.clientWidth<o.scrollWidth||o.clientHeight<o.scrollHeight){var i=Ct(o);if(o.clientWidth<o.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||o.clientHeight<o.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!o||!o.getBoundingClientRect||o===L.body)return ct();if(n||e)return o;n=!0}}}while(o=o.parentNode);return ct()},ct=function(){return U?L.documentElement:L.scrollingElement},dt=function(t,e,o){t.scrollLeft+=e,t.scrollTop+=o},ht=Bt(function(t,e,o,n){if(e.scroll){var i=o?o[B]:window,r=e.scrollSensitivity,a=e.scrollSpeed,l=t.clientX,h=t.clientY,u=ct(),f=!1;c!==o&&(ut(),s=e.scroll,d=e.scrollFn,!0===s&&(s=st(o,!0),c=s));var p=0,v=s;do{var g,m,b,y,w,D,T,S,C,x=v,E=zt(x),k=E.top,P=E.bottom,A=E.left,X=E.right,Y=E.width,I=E.height;if(g=x.scrollWidth,m=x.scrollHeight,b=Ct(x),S=x.scrollLeft,C=x.scrollTop,x===u?(D=Y<g&&("auto"===b.overflowX||"scroll"===b.overflowX||"visible"===b.overflowX),T=I<m&&("auto"===b.overflowY||"scroll"===b.overflowY||"visible"===b.overflowY)):(D=Y<g&&("auto"===b.overflowX||"scroll"===b.overflowX),T=I<m&&("auto"===b.overflowY||"scroll"===b.overflowY)),y=D&&(nt(X-l)<=r&&S+Y<g)-(nt(A-l)<=r&&!!S),w=T&&(nt(P-h)<=r&&C+I<m)-(nt(k-h)<=r&&!!C),!M[p])for(var O=0;O<=p;O++)M[O]||(M[O]={});M[p].vx==y&&M[p].vy==w&&M[p].el===x||(M[p].el=x,M[p].vx=y,M[p].vy=w,clearInterval(M[p].pid),!x||0==y&&0==w||(f=!0,M[p].pid=setInterval(function(){n&&0===this.layer&&(yt.active._emulateDragOver(!0),yt.active._onTouchMove(_,!0));var e=M[this.layer].vy?M[this.layer].vy*a:0,o=M[this.layer].vx?M[this.layer].vx*a:0;"function"==typeof d&&"continue"!==d.call(i,o,e,t,_,M[this.layer].el)||dt(M[this.layer].el,o,e)}.bind({layer:p}),24))),p++}while(e.bubbleScroll&&v!==u&&(v=st(v,!1)));N=f}},30),ut=function(){M.forEach(function(t){clearInterval(t.pid)}),M=[]},ft=function(t){function e(t,o){return function(n,i,r,a){var l=n.options.group.name&&i.options.group.name&&n.options.group.name===i.options.group.name;if(null==t&&(o||l))return!0;if(null==t||!1===t)return!1;if(o&&"clone"===t)return t;if("function"==typeof t)return e(t(n,i,r,a),o)(n,i,r,a);var s=(o?n:i).options.group.name;return!0===t||"string"==typeof t&&t===s||t.join&&t.indexOf(s)>-1}}var o={},n=t.group;n&&"object"==typeof n||(n={name:n}),o.name=n.name,o.checkPull=e(n.pull,!0),o.checkPut=e(n.put),o.revertClone=n.revertClone,t.group=o},pt=function(t){e&&e.parentNode&&e.parentNode[B]&&e.parentNode[B]._computeIsAligned(t)},vt=function(){!tt&&n&&Ct(n,"display","none")},gt=function(){!tt&&n&&Ct(n,"display","")};L.addEventListener("click",function(t){if(A)return t.preventDefault(),t.stopPropagation&&t.stopPropagation(),t.stopImmediatePropagation&&t.stopImmediatePropagation(),A=!1,!1},!0);var mt,bt=function(t){if(e){var o=function(t,e){for(var o=0;o<X.length;o++)if(!Xt(X[o])){var n=zt(X[o]),i=X[o][B].options.emptyInsertThreshold,r=t>=n.left-i&&t<=n.right+i,a=e>=n.top-i&&e<=n.bottom+i;if(i&&r&&a)return X[o]}}((t=t.touches?t.touches[0]:t).clientX,t.clientY);if(o){var n={};for(var i in t)n[i]=t[i];n.target=n.rootEl=o,n.preventDefault=void 0,n.stopPropagation=void 0,o[B]._onDragOver(n)}}};function yt(t,e){if(!t||!t.nodeType||1!==t.nodeType)throw"Sortable: `el` must be HTMLElement, not "+{}.toString.call(t);this.el=t,this.options=e=Rt({},e),t[B]=this;var o={group:null,sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0,draggable:/[uo]l/i.test(t.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return lt(t,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(t,e){t.setData("Text",e.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:W(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==yt.supportPointer&&"PointerEvent"in window,emptyInsertThreshold:5};for(var n in o)!(n in e)&&(e[n]=o[n]);for(var i in ft(e),this)"_"===i.charAt(0)&&"function"==typeof this[i]&&(this[i]=this[i].bind(this));this.nativeDraggable=!e.forceFallback&&$,this.nativeDraggable&&(this.options.touchStartThreshold=1),e.supportPointer?Dt(t,"pointerdown",this._onTapStart):(Dt(t,"mousedown",this._onTapStart),Dt(t,"touchstart",this._onTapStart)),this.nativeDraggable&&(Dt(t,"dragover",this),Dt(t,"dragenter",this)),X.push(this.el),e.store&&e.store.get&&this.sort(e.store.get(this)||[])}function wt(t,e,o,n){if(t){o=o||L;do{if(null!=e&&(">"===e[0]?t.parentNode===o&&Ht(t,e):Ht(t,e))||n&&t===o)return t;if(t===o)break}while(t=_t(t))}return null}function _t(t){return t.host&&t!==L&&t.host.nodeType?t.host:t.parentNode}function Dt(t,e,o){t.addEventListener(e,o,!U&&q)}function Tt(t,e,o){t.removeEventListener(e,o,!U&&q)}function St(t,e,o){if(t&&e)if(t.classList)t.classList[o?"add":"remove"](e);else{var n=(" "+t.className+" ").replace(H," ").replace(" "+e+" "," ");t.className=(n+(o?" "+e:"")).replace(H," ")}}function Ct(t,e,o){var n=t&&t.style;if(n){if(void 0===o)return L.defaultView&&L.defaultView.getComputedStyle?o=L.defaultView.getComputedStyle(t,""):t.currentStyle&&(o=t.currentStyle),void 0===e?o:o[e];e in n||-1!==e.indexOf("webkit")||(e="-webkit-"+e),n[e]=o+("string"==typeof o?"":"px")}}function xt(t){var e="";do{var o=Ct(t,"transform");o&&"none"!==o&&(e=o+" "+e)}while(t=t.parentNode);return window.DOMMatrix?new DOMMatrix(e):window.WebKitCSSMatrix?new WebKitCSSMatrix(e):window.CSSMatrix?new CSSMatrix(e):void 0}function Et(t,e,o){if(t){var n=t.getElementsByTagName(e),i=0,r=n.length;if(o)for(;i<r;i++)o(n[i],i);return n}return[]}function kt(t,e,o,n,r,a,l,s,c,d,h){var u,f=(t=t||e[B]).options,p="on"+o.charAt(0).toUpperCase()+o.substr(1);!window.CustomEvent||U||V?(u=L.createEvent("Event")).initEvent(o,!0,!0):u=new CustomEvent(o,{bubbles:!0,cancelable:!0}),u.to=r||e,u.from=a||e,u.item=n||e,u.clone=i,u.oldIndex=l,u.newIndex=s,u.oldDraggableIndex=c,u.newDraggableIndex=d,u.originalEvent=h,u.pullMode=g?g.lastPutMode:void 0,e&&e.dispatchEvent(u),f[p]&&f[p].call(t,u)}function Mt(t,e,o,n,i,r,a,l){var s,c,d=t[B],h=d.options.onMove;return!window.CustomEvent||U||V?(s=L.createEvent("Event")).initEvent("move",!0,!0):s=new CustomEvent("move",{bubbles:!0,cancelable:!0}),s.to=e,s.from=t,s.dragged=o,s.draggedRect=n,s.related=i||e,s.relatedRect=r||zt(e),s.willInsertAfter=l,s.originalEvent=a,t.dispatchEvent(s),h&&(c=h.call(d,s,a)),c}function Nt(t){t.draggable=!1}function Pt(){et=!1}function At(t,o,i){for(var r=0,a=0,l=t.children;a<l.length;){if("none"!==l[a].style.display&&l[a]!==n&&l[a]!==e&&wt(l[a],i.draggable,t,!1)){if(r===o)return l[a];r++}a++}return null}function Xt(t){for(var e=t.lastElementChild;e&&(e===n||"none"===Ct(e,"display"));)e=e.previousElementSibling;return e||null}function Yt(t){var o=Ot(e),n=Ot(t);return o<n?1:-1}function It(t){for(var e=t.tagName+t.className+t.src+t.href+t.textContent,o=e.length,n=0;o--;)n+=e.charCodeAt(o);return n.toString(36)}function Ot(t,e){var o=0;if(!t||!t.parentNode)return-1;for(;t&&(t=t.previousElementSibling);)"TEMPLATE"===t.nodeName.toUpperCase()||t===i||e&&!Ht(t,e)||o++;return o}function Ht(t,e){if(e){if(">"===e[0]&&(e=e.substring(1)),t)try{if(t.matches)return t.matches(e);if(t.msMatchesSelector)return t.msMatchesSelector(e);if(t.webkitMatchesSelector)return t.webkitMatchesSelector(e)}catch(t){return!1}return!1}}function Bt(t,e){return function(){if(!mt){var o=arguments,n=this;mt=F(function(){1===o.length?t.call(n,o[0]):t.apply(n,o),mt=void 0},e)}}}function Rt(t,e){if(t&&e)for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);return t}function Lt(t){return j&&j.dom?j.dom(t).cloneNode(!0):z?z(t).clone(!0)[0]:t.cloneNode(!0)}function Wt(t){return F(t,0)}function Ft(t){return clearTimeout(t)}function zt(t,e,o,n){if(t.getBoundingClientRect||t===R){var i,r,a,l,s,c,d;if(t!==R&&t!==ct()?(i=t.getBoundingClientRect(),r=i.top,a=i.left,l=i.bottom,s=i.right,c=i.height,d=i.width):(r=0,a=0,l=window.innerHeight,s=window.innerWidth,c=window.innerHeight,d=window.innerWidth),n&&t!==R&&(o=o||t.parentNode,!U))do{if(o&&o.getBoundingClientRect&&"none"!==Ct(o,"transform")){var h=o.getBoundingClientRect();r-=h.top+W(Ct(o,"border-top-width")),a-=h.left+W(Ct(o,"border-left-width")),l=r+i.height,s=a+i.width;break}}while(o=o.parentNode);if(e&&t!==R){var u=xt(o||t),f=u&&u.a,p=u&&u.d;u&&(l=(r/=p)+(c/=p),s=(a/=f)+(d/=f))}return{top:r,left:a,bottom:l,right:s,width:d,height:c}}}function jt(t,e){for(var o=st(t,!0),n=zt(t)[e];o;){var i=zt(o)[e];if(!("top"===e||"left"===e?n>=i:n<=i))return o;if(o===ct())break;o=st(o,!1)}return!1}function qt(t){var e=0,o=0,n=ct();if(t)do{var i=xt(t),r=i.a,a=i.d;e+=t.scrollLeft*r,o+=t.scrollTop*a}while(t!==n&&(t=t.parentNode));return[e,o]}return yt.prototype={constructor:yt,_computeIsAligned:function(t){var o;if(n&&!tt?(vt(),o=L.elementFromPoint(t.clientX,t.clientY),gt()):o=t.target,o=wt(o,this.options.draggable,this.el,!1),!ot&&e&&e.parentNode===this.el){for(var i,r,a,l,s,c,d,h,u=this.el.children,f=0;f<u.length;f++)wt(u[f],this.options.draggable,this.el,!1)&&u[f]!==o&&(u[f].sortableMouseAligned=(i=t.clientX,r=t.clientY,a=u[f],l=this._getDirection(t,null),this.options,void 0,void 0,void 0,void 0,s=zt(a),c="vertical"===l?s.left:s.top,d="vertical"===l?s.right:s.bottom,c<(h="vertical"===l?i:r)&&h<d));wt(o,this.options.draggable,this.el,!0)||(T=null),ot=!0,F(function(){ot=!1},30)}},_getDirection:function(t,o){return"function"==typeof this.options.direction?this.options.direction.call(this,t,o,e):this.options.direction},_onTapStart:function(t){if(t.cancelable){var o,n,i=this,r=this.el,a=this.options,s=a.preventOnFilter,c=t.type,d=t.touches&&t.touches[0],h=(d||t).target,u=t.target.shadowRoot&&(t.path&&t.path[0]||t.composedPath&&t.composedPath()[0])||h,f=a.filter;if(function(t){at.length=0;var e=t.getElementsByTagName("input"),o=e.length;for(;o--;){var n=e[o];n.checked&&at.push(n)}}(r),!e&&!(/mousedown|pointerdown/.test(c)&&0!==t.button||a.disabled||u.isContentEditable||(h=wt(h,a.draggable,r,!1),l===h))){if(o=Ot(h),n=Ot(h,a.draggable),"function"==typeof f){if(f.call(this,t,h,this))return kt(i,u,"filter",h,r,r,o,void 0,n),void(s&&t.cancelable&&t.preventDefault())}else if(f&&(f=f.split(",").some(function(t){if(t=wt(u,t.trim(),r,!1))return kt(i,t,"filter",h,r,r,o,void 0,n),!0})))return void(s&&t.cancelable&&t.preventDefault());a.handle&&!wt(u,a.handle,r,!1)||this._prepareDragStart(t,d,h,o,n)}}},_handleAutoScroll:function(t,o){if(e&&this.options.scroll){var n=t.clientX,i=t.clientY,r=L.elementFromPoint(n,i),a=this;if(o||V||U||K){ht(t,a.options,r,o);var l=st(r,!0);!N||m&&n===b&&i===y||(m&&clearInterval(m),m=setInterval(function(){if(e){var r=st(L.elementFromPoint(n,i),!0);r!==l&&(l=r,ut(),ht(t,a.options,l,o))}},10),b=n,y=i)}else{if(!a.options.bubbleScroll||st(r,!0)===ct())return void ut();ht(t,a.options,st(r,!1),!1)}}},_prepareDragStart:function(t,n,i,s,c){var d,u=this,p=u.el,g=u.options,m=p.ownerDocument;i&&!e&&i.parentNode===p&&(r=p,o=(e=i).parentNode,a=e.nextSibling,l=i,v=g.group,h=s,f=c,w={target:e,clientX:(n||t).clientX,clientY:(n||t).clientY},this._lastX=(n||t).clientX,this._lastY=(n||t).clientY,e.style["will-change"]="all",e.style.transition="",e.style.transform="",d=function(){u._disableDelayedDragEvents(),!G&&u.nativeDraggable&&(e.draggable=!0),u._triggerDragStart(t,n),kt(u,r,"choose",e,r,r,h,void 0,f),St(e,g.chosenClass,!0)},g.ignore.split(",").forEach(function(t){Et(e,t.trim(),Nt)}),Dt(m,"dragover",bt),Dt(m,"mousemove",bt),Dt(m,"touchmove",bt),Dt(m,"mouseup",u._onDrop),Dt(m,"touchend",u._onDrop),Dt(m,"touchcancel",u._onDrop),G&&this.nativeDraggable&&(this.options.touchStartThreshold=4,e.draggable=!0),!g.delay||g.delayOnTouchOnly&&!n||this.nativeDraggable&&(V||U)?d():(Dt(m,"mouseup",u._disableDelayedDrag),Dt(m,"touchend",u._disableDelayedDrag),Dt(m,"touchcancel",u._disableDelayedDrag),Dt(m,"mousemove",u._delayedDragTouchMoveHandler),Dt(m,"touchmove",u._delayedDragTouchMoveHandler),g.supportPointer&&Dt(m,"pointermove",u._delayedDragTouchMoveHandler),u._dragStartTimer=F(d,g.delay)))},_delayedDragTouchMoveHandler:function(t){var e=t.touches?t.touches[0]:t;rt(nt(e.clientX-this._lastX),nt(e.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){e&&Nt(e),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var t=this.el.ownerDocument;Tt(t,"mouseup",this._disableDelayedDrag),Tt(t,"touchend",this._disableDelayedDrag),Tt(t,"touchcancel",this._disableDelayedDrag),Tt(t,"mousemove",this._delayedDragTouchMoveHandler),Tt(t,"touchmove",this._delayedDragTouchMoveHandler),Tt(t,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(t,o){o=o||("touch"==t.pointerType?t:null),!this.nativeDraggable||o?this.options.supportPointer?Dt(L,"pointermove",this._onTouchMove):Dt(L,o?"touchmove":"mousemove",this._onTouchMove):(Dt(e,"dragend",this),Dt(r,"dragstart",this._onDragStart));try{L.selection?Wt(function(){L.selection.empty()}):window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(t,o){if(P=!1,r&&e){this.nativeDraggable&&(Dt(L,"dragover",this._handleAutoScroll),Dt(L,"dragover",pt));var n=this.options;!t&&St(e,n.dragClass,!1),St(e,n.ghostClass,!0),Ct(e,"transform",""),yt.active=this,t&&this._appendGhost(),kt(this,r,"start",e,r,r,h,void 0,f,void 0,o)}else this._nulling()},_emulateDragOver:function(t){if(_){if(this._lastX===_.clientX&&this._lastY===_.clientY&&!t)return;this._lastX=_.clientX,this._lastY=_.clientY,vt();for(var o=L.elementFromPoint(_.clientX,_.clientY),n=o;o&&o.shadowRoot&&(o=o.shadowRoot.elementFromPoint(_.clientX,_.clientY))!==n;)n=o;if(n)do{if(n[B])if(n[B]._onDragOver({clientX:_.clientX,clientY:_.clientY,target:o,rootEl:n})&&!this.options.dragoverBubble)break;o=n}while(n=n.parentNode);e.parentNode[B]._computeIsAligned(_),gt()}},_onTouchMove:function(t,e){if(w){var o=this.options,i=o.fallbackTolerance,r=o.fallbackOffset,a=t.touches?t.touches[0]:t,l=n&&xt(n),s=n&&l&&l.a,c=n&&l&&l.d,d=Q&&E&&qt(E),h=(a.clientX-w.clientX+r.x)/(s||1)+(d?d[0]-O[0]:0)/(s||1),u=(a.clientY-w.clientY+r.y)/(c||1)+(d?d[1]-O[1]:0)/(c||1),f=t.touches?"translate3d("+h+"px,"+u+"px,0)":"translate("+h+"px,"+u+"px)";if(!yt.active&&!P){if(i&&it(nt(a.clientX-this._lastX),nt(a.clientY-this._lastY))<i)return;this._onDragStart(t,!0)}!e&&this._handleAutoScroll(a,!0),D=!0,_=a,Ct(n,"webkitTransform",f),Ct(n,"mozTransform",f),Ct(n,"msTransform",f),Ct(n,"transform",f),t.cancelable&&t.preventDefault()}},_appendGhost:function(){if(!n){var t=this.options.fallbackOnBody?L.body:r,o=zt(e,!0,t,!Q),i=(Ct(e),this.options);if(Q){for(E=t;"static"===Ct(E,"position")&&"none"===Ct(E,"transform")&&E!==L;)E=E.parentNode;if(E!==L){var a=zt(E,!0);o.top-=a.top,o.left-=a.left}E!==L.body&&E!==L.documentElement?(E===L&&(E=ct()),o.top+=E.scrollTop,o.left+=E.scrollLeft):E=ct(),O=qt(E)}St(n=e.cloneNode(!0),i.ghostClass,!1),St(n,i.fallbackClass,!0),St(n,i.dragClass,!0),Ct(n,"box-sizing","border-box"),Ct(n,"margin",0),Ct(n,"top",o.top),Ct(n,"left",o.left),Ct(n,"width",o.width),Ct(n,"height",o.height),Ct(n,"opacity","0.8"),Ct(n,"position",Q?"absolute":"fixed"),Ct(n,"zIndex","100000"),Ct(n,"pointerEvents","none"),t.appendChild(n)}},_onDragStart:function(t,o){var n=this,a=t.dataTransfer,l=n.options;(i=Lt(e)).draggable=!1,i.style["will-change"]="",this._hideClone(),St(i,n.options.chosenClass,!1),n._cloneId=Wt(function(){n.options.removeCloneOnHide||r.insertBefore(i,e),kt(n,r,"clone",e)}),!o&&St(e,l.dragClass,!0),o?(A=!0,n._loopId=setInterval(n._emulateDragOver,50)):(Tt(L,"mouseup",n._onDrop),Tt(L,"touchend",n._onDrop),Tt(L,"touchcancel",n._onDrop),a&&(a.effectAllowed="move",l.setData&&l.setData.call(n,a,e)),Dt(L,"drop",n),Ct(e,"transform","translateZ(0)")),P=!0,n._dragStartId=Wt(n._dragStarted.bind(n,o,t)),Dt(L,"selectstart",n),K&&Ct(L.body,"user-select","none")},_onDragOver:function(t){var n,i,l,s=this.el,c=t.target,d=this.options,u=d.group,p=yt.active,m=v===u,b=d.sort,y=this;if(!et){if(void 0!==t.preventDefault&&t.cancelable&&t.preventDefault(),D=!0,c=wt(c,d.draggable,s,!0),e.contains(t.target)||c.animated)return j(!1);if(c!==e&&(A=!1),p&&!d.disabled&&(m?b||(l=!r.contains(e)):g===this||(this.lastPutMode=v.checkPull(this,p,e,t))&&u.checkPut(this,p,e,t))){var w=this._getDirection(t,c);if(n=zt(e),l)return this._hideClone(),o=r,a?r.insertBefore(e,a):r.appendChild(e),j(!0);var _=Xt(s);if(!_||function(t,e,o){var n=zt(Xt(o)),i="vertical"===e?t.clientY:t.clientX,r="vertical"===e?t.clientX:t.clientY,a="vertical"===e?n.bottom:n.right,l="vertical"===e?n.left:n.top,s="vertical"===e?n.right:n.bottom;return"vertical"===e?r>s+10||r<=s&&i>a&&r>=l:i>a&&r>l||i<=a&&r>s+10}(t,w,s)&&!_.animated){if(_&&s===t.target&&(c=_),c&&(i=zt(c)),m?p._hideClone():p._showClone(this),!1!==Mt(r,s,e,n,c,i,t,!!c))return s.appendChild(e),o=s,k=null,q(),j(!0)}else if(c&&c!==e&&c.parentNode===s){var E,M=0,N=c.sortableMouseAligned,P=e.parentNode!==s,X="vertical"===w?"top":"left",O=jt(c,"top")||jt(e,"top"),H=O?O.scrollTop:void 0;if(T!==c&&(C=null,E=zt(c)[X],Y=!1),function(t,o,n){var i=t===e&&k||zt(t),r=o===e&&k||zt(o),a="vertical"===n?i.left:i.top,l="vertical"===n?i.right:i.bottom,s="vertical"===n?i.width:i.height,c="vertical"===n?r.left:r.top,d="vertical"===n?r.right:r.bottom,h="vertical"===n?r.width:r.height;return a===c||l===d||a+s/2===c+h/2}(e,c,w)&&N||P||O||d.invertSwap||"insert"===C||"swap"===C?("swap"!==C&&(I=d.invertSwap||P),M=function(t,o,n,i,r,a,l){var s=zt(o),c="vertical"===n?t.clientY:t.clientX,d="vertical"===n?s.height:s.width,h="vertical"===n?s.top:s.left,u="vertical"===n?s.bottom:s.right,f=zt(e),p=!1;if(!a)if(l&&x<d*i)if(!Y&&(1===S?c>h+d*r/2:c<u-d*r/2)&&(Y=!0),Y)p=!0;else{"vertical"===n?f.top:f.left,"vertical"===n?f.bottom:f.right;if(1===S?c<h+x:c>u-x)return-1*S}else if(c>h+d*(1-i)/2&&c<u-d*(1-i)/2)return Yt(o);if((p=p||a)&&(c<h+d*r/2||c>u-d*r/2))return c>h+d/2?1:-1;return 0}(t,c,w,d.swapThreshold,null==d.invertedSwapThreshold?d.swapThreshold:d.invertedSwapThreshold,I,T===c),C="swap"):(M=Yt(c),C="insert"),0===M)return j(!1);k=null,T=c,S=M,i=zt(c);var R=c.nextElementSibling,W=!1,z=Mt(r,s,e,n,c,i,t,W=1===M);if(!1!==z)return 1!==z&&-1!==z||(W=1===z),et=!0,F(Pt,30),m?p._hideClone():p._showClone(this),W&&!R?s.appendChild(e):c.parentNode.insertBefore(e,W?R:c),O&&dt(O,0,H-O.scrollTop),o=e.parentNode,void 0===E||I||(x=nt(E-zt(c)[X])),q(),j(!0)}if(s.contains(e))return j(!1)}return!1}function j(o){return o&&(m?p._hideClone():p._showClone(y),p&&(St(e,g?g.options.ghostClass:p.options.ghostClass,!1),St(e,d.ghostClass,!0)),g!==y&&y!==yt.active?g=y:y===yt.active&&(g=null),n&&y._animate(n,e),c&&i&&y._animate(i,c)),(c===e&&!e.animated||c===s&&!c.animated)&&(T=null),d.dragoverBubble||t.rootEl||c===L||(y._handleAutoScroll(t),e.parentNode[B]._computeIsAligned(t),!o&&bt(t)),!d.dragoverBubble&&t.stopPropagation&&t.stopPropagation(),!0}function q(){kt(y,r,"change",c,s,r,h,Ot(e),f,Ot(e,d.draggable),t)}},_animate:function(t,o){var n=this.options.animation;if(n){var i=zt(o);if(o===e&&(k=i),1===t.nodeType&&(t=zt(t)),t.left+t.width/2!==i.left+i.width/2||t.top+t.height/2!==i.top+i.height/2){var r=xt(this.el),a=r&&r.a,l=r&&r.d;Ct(o,"transition","none"),Ct(o,"transform","translate3d("+(t.left-i.left)/(a||1)+"px,"+(t.top-i.top)/(l||1)+"px,0)"),this._repaint(o),Ct(o,"transition","transform "+n+"ms"+(this.options.easing?" "+this.options.easing:"")),Ct(o,"transform","translate3d(0,0,0)")}"number"==typeof o.animated&&clearTimeout(o.animated),o.animated=F(function(){Ct(o,"transition",""),Ct(o,"transform",""),o.animated=!1},n)}},_repaint:function(t){return t.offsetWidth},_offMoveEvents:function(){Tt(L,"touchmove",this._onTouchMove),Tt(L,"pointermove",this._onTouchMove),Tt(L,"dragover",bt),Tt(L,"mousemove",bt),Tt(L,"touchmove",bt)},_offUpEvents:function(){var t=this.el.ownerDocument;Tt(t,"mouseup",this._onDrop),Tt(t,"touchend",this._onDrop),Tt(t,"pointerup",this._onDrop),Tt(t,"touchcancel",this._onDrop),Tt(L,"selectstart",this)},_onDrop:function(t){var l=this.el,s=this.options;P=!1,N=!1,I=!1,Y=!1,clearInterval(this._loopId),clearInterval(m),ut(),clearTimeout(mt),mt=void 0,clearTimeout(this._dragStartTimer),Ft(this._cloneId),Ft(this._dragStartId),Tt(L,"mousemove",this._onTouchMove),this.nativeDraggable&&(Tt(L,"drop",this),Tt(l,"dragstart",this._onDragStart),Tt(L,"dragover",this._handleAutoScroll),Tt(L,"dragover",pt)),K&&Ct(L.body,"user-select",""),this._offMoveEvents(),this._offUpEvents(),t&&(D&&(t.cancelable&&t.preventDefault(),!s.dropBubble&&t.stopPropagation()),n&&n.parentNode&&n.parentNode.removeChild(n),(r===o||g&&"clone"!==g.lastPutMode)&&i&&i.parentNode&&i.parentNode.removeChild(i),e&&(this.nativeDraggable&&Tt(e,"dragend",this),Nt(e),e.style["will-change"]="",St(e,g?g.options.ghostClass:this.options.ghostClass,!1),St(e,this.options.chosenClass,!1),kt(this,r,"unchoose",e,o,r,h,null,f,null,t),r!==o?(u=Ot(e),p=Ot(e,s.draggable),u>=0&&(kt(null,o,"add",e,o,r,h,u,f,p,t),kt(this,r,"remove",e,o,r,h,u,f,p,t),kt(null,o,"sort",e,o,r,h,u,f,p,t),kt(this,r,"sort",e,o,r,h,u,f,p,t)),g&&g.save()):e.nextSibling!==a&&(u=Ot(e),p=Ot(e,s.draggable),u>=0&&(kt(this,r,"update",e,o,r,h,u,f,p,t),kt(this,r,"sort",e,o,r,h,u,f,p,t))),yt.active&&(null!=u&&-1!==u||(u=h,p=f),kt(this,r,"end",e,o,r,h,u,f,p,t),this.save()))),this._nulling()},_nulling:function(){r=e=o=n=a=i=l=s=c=M.length=m=b=y=w=_=D=u=h=T=S=k=g=v=yt.active=null,at.forEach(function(t){t.checked=!0}),at.length=0},handleEvent:function(t){switch(t.type){case"drop":case"dragend":this._onDrop(t);break;case"dragenter":case"dragover":e&&(this._onDragOver(t),function(t){t.dataTransfer&&(t.dataTransfer.dropEffect="move");t.cancelable&&t.preventDefault()}(t));break;case"selectstart":t.preventDefault()}},toArray:function(){for(var t,e=[],o=this.el.children,n=0,i=o.length,r=this.options;n<i;n++)wt(t=o[n],r.draggable,this.el,!1)&&e.push(t.getAttribute(r.dataIdAttr)||It(t));return e},sort:function(t){var e={},o=this.el;this.toArray().forEach(function(t,n){var i=o.children[n];wt(i,this.options.draggable,o,!1)&&(e[t]=i)},this),t.forEach(function(t){e[t]&&(o.removeChild(e[t]),o.appendChild(e[t]))})},save:function(){var t=this.options.store;t&&t.set&&t.set(this)},closest:function(t,e){return wt(t,e||this.options.draggable,this.el,!1)},option:function(t,e){var o=this.options;if(void 0===e)return o[t];o[t]=e,"group"===t&&ft(o)},destroy:function(){var t=this.el;t[B]=null,Tt(t,"mousedown",this._onTapStart),Tt(t,"touchstart",this._onTapStart),Tt(t,"pointerdown",this._onTapStart),this.nativeDraggable&&(Tt(t,"dragover",this),Tt(t,"dragenter",this)),Array.prototype.forEach.call(t.querySelectorAll("[draggable]"),function(t){t.removeAttribute("draggable")}),this._onDrop(),X.splice(X.indexOf(this.el),1),this.el=t=null},_hideClone:function(){i.cloneHidden||(Ct(i,"display","none"),i.cloneHidden=!0,i.parentNode&&this.options.removeCloneOnHide&&i.parentNode.removeChild(i))},_showClone:function(t){"clone"===t.lastPutMode?i.cloneHidden&&(r.contains(e)&&!this.options.group.revertClone?r.insertBefore(i,e):a?r.insertBefore(i,a):r.appendChild(i),this.options.group.revertClone&&this._animate(e,i),Ct(i,"display",""),i.cloneHidden=!1):this._hideClone()}},Dt(L,"touchmove",function(t){(yt.active||P)&&t.cancelable&&t.preventDefault()}),yt.utils={on:Dt,off:Tt,css:Ct,find:Et,is:function(t,e){return!!wt(t,e,t,!1)},extend:Rt,throttle:Bt,closest:wt,toggleClass:St,clone:Lt,index:Ot,nextTick:Wt,cancelNextTick:Ft,detectDirection:lt,getChild:At},yt.create=function(t,e){return new yt(t,e)},yt.version="1.9.0",t.attach("itg.Sortable",yt)}),t("skylark-sortable/main",["./Sortable"],function(t){return t}),t("skylark-sortable",["skylark-sortable/main"],function(t){return t})}(o),!i){var l=n("skylark-langx/skylark");r?module.exports=l:e.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-sortable.js.map