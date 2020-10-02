/**
 * skylark-langx-emitter - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,r){var t=r.define,require=r.require,n="function"==typeof t&&t.amd,o=!n&&"undefined"!=typeof exports;if(!n&&!t){var i={};t=r.define=function(e,r,t){"function"==typeof t?(i[e]={factory:t,deps:r.map(function(r){return function(e,r){if("."!==e[0])return e;var t=r.split("/"),n=e.split("/");t.pop();for(var o=0;o<n.length;o++)"."!=n[o]&&(".."==n[o]?t.pop():t.push(n[o]));return t.join("/")}(r,e)}),resolved:!1,exports:null},require(e)):i[e]={factory:null,resolved:!0,exports:t}},require=r.require=function(e){if(!i.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=i[e];if(!module.resolved){var t=[];module.deps.forEach(function(e){t.push(require(e))}),module.exports=module.factory.apply(r,t)||null,module.resolved=!0}return module.exports}}if(!t)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-langx-emitter/Emitter",["skylark-langx-events/Emitter"],function(e){return e}),e("skylark-langx-emitter/Evented",["./Emitter"],function(e){return e}),e("skylark-langx-emitter/main",["./Emitter","./Evented"],function(e){return e}),e("skylark-langx-emitter",["skylark-langx-emitter/main"],function(e){return e})}(t),!n){var l=require("skylark-langx-ns");o?module.exports=l:r.skylarkjs=l}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-langx-emitter.js.map
