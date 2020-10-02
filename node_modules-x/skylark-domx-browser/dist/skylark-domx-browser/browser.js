/**
 * skylark-domx-browser - The skylark browser library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/skylark","skylark-langx/langx"],function(e,n){"use strict";var t,r,i=n.hoster.browser,o={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"},s=null,l="",a="",c={},u={},m=/^(Webkit|webkit|O|Moz|moz|ms)(.*)$/,w=window.document,d=w.createElement("div"),k=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.matchesSelector,x=d.requestFullscreen||d.webkitRequestFullscreen||d.mozRequestFullScreen||d.msRequestFullscreen,F=(w.exitFullscreen||w.webkitCancelFullScreen||w.mozCancelFullScreen||w.msExitFullscreen,d.style);for(var z in F){var S=z.match(r||m);if(S){r||(t=S[1],r=new RegExp("^("+t+")(.*)$"),t,l="-"+t.toLowerCase()+"-",a=t.toLowerCase()),c[n.lowerFirst(S[2])]=z;var b=n.dasherize(S[2]);u[b]=l+b,o[z]&&(s=o[z])}}return s||void 0!==F.transition&&(s=o.transition),n.mixin(i,{css3PropPrefix:l,isIE:!!/msie/i.exec(window.navigator.userAgent),normalizeStyleProperty:function(e){return c[e]||e},normalizeCssProperty:function(e){return u[e]||e},normalizeCssEvent:function(e){return a?a+e:e.toLowerCase()},matchesSelector:k,requestFullScreen:x,exitFullscreen:x,location:function(){return window.location},support:{}}),s&&(i.support.transition={end:s}),d=null,e.attach("domx.browser",i)});
//# sourceMappingURL=sourcemaps/browser.js.map
