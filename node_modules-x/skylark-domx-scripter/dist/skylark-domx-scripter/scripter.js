/**
 * skylark-domx-scripter - The skylark scripter library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx","skylark-domx-noder","skylark-domx-finder"],function(e,t,r,a){var l=document.getElementsByTagName("head")[0],n={},o={},d=0,i=/^$|^module$|\/(?:java|ecma)script/i;function s(){return s}var c={type:!0,src:!0,nonce:!0,noModule:!0};function u(e,t,r){var a,l,n=(r=r||document).createElement("script");if(n.text=e,t)for(a in c)(l=t[a]||t.getAttribute&&t.getAttribute(a))&&n.setAttribute(a,l);return r.head.appendChild(n).parentNode.removeChild(n),this}return t.mixin(s,{loadJavaScript:function(e,t,r){var a=n[e];if(a||(a=n[e]={state:0,loadedCallbacks:[],errorCallbacks:[]}),a.loadedCallbacks.push(t),a.errorCallbacks.push(r),1===a.state)a.node.onload();else if(-1===a.state)a.node.onerror();else{var i=a.node=document.createElement("script"),s=a.id=d++;i.type="text/javascript",i.async=!1,i.defer=!1,startTime=(new Date).getTime(),l.appendChild(i),i.onload=function(){a.state=1;for(var e=a.loadedCallbacks,t=e.length;t--;)e[t]();a.loadedCallbacks=[],a.errorCallbacks=[]},i.onerror=function(){a.state=-1;for(var e=a.errorCallbacks,t=e.length;t--;)e[t]();a.loadedCallbacks=[],a.errorCallbacks=[]},i.src=e,o[s]=i}return a.id},deleteJavaScript:function(e){var t=o[e];if(t){var a=t.src;r.remove(t),delete o[e],delete n[a]}},evaluate:u,html:function(e,t){var a=r.html(e,t);if(void 0!==t){for(var l=e.querySelectorAll("script"),n=0;n<l.length;n++){var o=l[n];i.test(o.type||"")&&u(o.textContent,o)}return this}return a}}),e.attach("domx.scripter",s)});
//# sourceMappingURL=sourcemaps/scripter.js.map
