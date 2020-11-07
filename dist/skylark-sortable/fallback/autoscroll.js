/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-langx-hoster/isBrowser","skylark-domx-geom","skylark-domx-styler","skylark-domx-scrolls/scrollingElement"],function(l,o,r,e,t){"use strict";var n,i,c,a,s,f=[],u=!1,v=null,d=o&&o.ie,h=o&&o.edge,g=(o&&o.firefox,o&&o.safari);var w,y=function(l,o){if(!l||!l.getBoundingClientRect)return t();var r=l,n=!1;do{if(r.clientWidth<r.scrollWidth||r.clientHeight<r.scrollHeight){var i=e.css(r);if(r.clientWidth<r.scrollWidth&&("auto"==i.overflowX||"scroll"==i.overflowX)||r.clientHeight<r.scrollHeight&&("auto"==i.overflowY||"scroll"==i.overflowY)){if(!r||!r.getBoundingClientRect||r===document.body)return t();if(n||o)return r;n=!0}}}while(r=r.parentNode);return t()},b=p(function(l,o,c,a,s){if(o.scroll){var d=c?c[s]:window,h=o.scrollSensitivity,g=o.scrollSpeed,w=l.clientX,b=l.clientY,p=t(),x=!1;v!==c&&(m(),n=o.scroll,i=o.scrollFn,!0===n&&(n=y(c,!0),v=n));var k=0,S=n;do{var X,Y,_,I,R,E,H,W,B,M=S,P=r.boundingRect(M),F=P.top,T=P.bottom,A=P.left,C=P.right,L=P.width,N=P.height;if(X=M.scrollWidth,Y=M.scrollHeight,_=e.css(M),W=M.scrollLeft,B=M.scrollTop,M===p?(E=L<X&&("auto"===_.overflowX||"scroll"===_.overflowX||"visible"===_.overflowX),H=N<Y&&("auto"===_.overflowY||"scroll"===_.overflowY||"visible"===_.overflowY)):(E=L<X&&("auto"===_.overflowX||"scroll"===_.overflowX),H=N<Y&&("auto"===_.overflowY||"scroll"===_.overflowY)),I=E&&(Math.abs(C-w)<=h&&W+L<X)-(Math.abs(A-w)<=h&&!!W),R=H&&(Math.abs(T-b)<=h&&B+N<Y)-(Math.abs(F-b)<=h&&!!B),!f[k])for(var O=0;O<=k;O++)f[O]||(f[O]={});f[k].vx==I&&f[k].vy==R&&f[k].el===M||(f[k].el=M,f[k].vx=I,f[k].vy=R,clearInterval(f[k].pid),!M||0==I&&0==R||(x=!0,f[k].pid=setInterval(function(){var o=f[this.layer].vy?f[this.layer].vy*g:0,e=f[this.layer].vx?f[this.layer].vx*g:0;"function"==typeof i&&"continue"!==i.call(d,e,o,l,touchEvt,f[this.layer].el)||r.scrollBy(f[this.layer].el,e,o)}.bind({layer:k}),24))),k++}while(o.bubbleScroll&&S!==p&&(S=y(S,!1)));u=x}},30),m=function(){f.forEach(function(l){clearInterval(l.pid)}),f=[]};function p(o,r){return l.debounce(o,r)}return{autoScrolls:f,_isScrolledPast:function(l,o){for(var e=y(l,!0),n=r.boundingRect(l)[o];e;){var i=r.boundingRect(e)[o];if(!("top"===o||"left"===o?n>=i:n<=i))return e;if(e===t())break;e=y(e,!1)}return!1},_getRelativeScrollOffset:function(l){var o=0,r=0,e=t();if(l)do{var n=transforms.matrix(l),i=n.a,c=n.d;o+=l.scrollLeft*i,r+=l.scrollTop*c}while(l!==e&&(l=l.parentNode));return[o,r]},_autoScroll:b,_clearAutoScrolls:m,_handleAutoScroll:function(l,o,r,e){var n=l.clientX,i=l.clientY,f=document.elementFromPoint(n,i);if(r||h||d||g){w=b(l,o,f,r,e);var v=y(f,!0);!u||c&&n===a&&i===s||(c&&clearInterval(c),c=setInterval(function(){var e=y(document.elementFromPoint(n,i),!0);e!==v&&(v=e,m(),w=b(l,o,v,r))},10),a=n,s=i)}else{if(!o.bubbleScroll||y(f,!0)===t())return void m();w=b(l,o,y(f,!1),!1)}},_throttle:p,_cancelThrottle:function(){w&&w.stop&&(w.stop(),w=void 0)},_nulling:function(){c&&clearInterval(c),c=null,a=null,s=null,this.scrollEl=this.scrollParentEl=this.autoScrolls.length=null}}});
//# sourceMappingURL=../sourcemaps/fallback/autoscroll.js.map
