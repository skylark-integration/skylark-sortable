/**
 * skylark-langx-ns - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(n,r){var t=r.define,e=r.require,o="function"==typeof t&&t.amd,a=!o&&"undefined"!=typeof exports;if(!o&&!t){var s={};t=r.define=function(n,r,t){"function"==typeof t?(s[n]={factory:t,deps:r.map(function(r){return function(n,r){if("."!==n[0])return n;var t=r.split("/"),e=n.split("/");t.pop();for(var o=0;o<e.length;o++)"."!=e[o]&&(".."==e[o]?t.pop():t.push(e[o]));return t.join("/")}(r,n)}),resolved:!1,exports:null},e(n)):s[n]={factory:null,resolved:!0,exports:t}},e=r.require=function(n){if(!s.hasOwnProperty(n))throw new Error("Module "+n+" has not been defined");var t=s[n];if(!t.resolved){var o=[];t.deps.forEach(function(n){o.push(e(n))}),t.exports=t.factory.apply(r,o)||null,t.resolved=!0}return t.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(n,r){n("skylark-langx-ns/_attach",[],function(){return function(n,r,t){"string"==typeof r&&(r=r.split("."));for(var e=r.length,o=n,a=0,s=r[a++];a<e;)o=o[s]=o[s]||{},s=r[a++];return o[s]=t}}),n("skylark-langx-ns/ns",["./_attach"],function(n){var r={attach:function(t,e){return n(r,t,e)}};return r}),n("skylark-langx-ns/main",["./ns"],function(n){return n}),n("skylark-langx-ns",["skylark-langx-ns/main"],function(n){return n})}(t),!o){var i=e("skylark-langx/skylark");a?module.exports=i:r.skylarkjs=i}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-ns-all.js.map
