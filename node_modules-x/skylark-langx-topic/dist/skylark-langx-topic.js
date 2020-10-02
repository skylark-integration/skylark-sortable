/**
 * skylark-langx-topic - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(r,n){var e=n.define,t=n.require,o="function"==typeof e&&e.amd,i=!o&&"undefined"!=typeof exports;if(!o&&!e){var a={};e=n.define=function(r,n,e){"function"==typeof e?(a[r]={factory:e,deps:n.map(function(n){return function(r,n){if("."!==r[0])return r;var e=n.split("/"),t=r.split("/");e.pop();for(var o=0;o<t.length;o++)"."!=t[o]&&(".."==t[o]?e.pop():e.push(t[o]));return e.join("/")}(n,r)}),resolved:!1,exports:null},t(r)):a[r]={factory:null,resolved:!0,exports:e}},t=n.require=function(r){if(!a.hasOwnProperty(r))throw new Error("Module "+r+" has not been defined");var e=a[r];if(!e.resolved){var o=[];e.deps.forEach(function(r){o.push(t(r))}),e.exports=e.factory.apply(n,o)||null,e.resolved=!0}return e.exports}}if(!e)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(r,n){r("skylark-langx-topic/topic",["skylark-langx-ns","skylark-langx-emitter/Evented"],function(r,n){var e=new n;return r.attach("langx.topic",{publish:function(r,n,t){var o=[].slice.call(arguments,1);return e.trigger({type:r,data:o})},subscribe:function(r,n,t){var o=function(r){n.apply(t,r.data)};return e.on(r,o),{remove:function(){e.off(r,o)}}}})}),r("skylark-langx-topic/main",["./topic"],function(r){return r}),r("skylark-langx-topic",["skylark-langx-topic/main"],function(r){return r})}(e),!o){var l=t("skylark-langx/skylark");i?module.exports=l:n.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-topic.js.map
