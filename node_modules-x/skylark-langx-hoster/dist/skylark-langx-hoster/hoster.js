/**
 * skylark-langx-hoster - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns"],function(e){var o={isBrowser:!0,isNode:null,global:this,browser:null,node:null};"object"==typeof process&&process.versions&&process.versions.node&&process.versions.v8&&(o.isNode=!0,o.isBrowser=!1),o.global=function(){return"undefined"!=typeof global&&"function"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:this}();var n=null;if(Object.defineProperty(o,"document",function(){if(!n){var e="undefined"==typeof window?require("html-element"):window;n=e.document}return n}),void 0===o.global.CustomEvent&&(o.global.CustomEvent=function(e,o){this.type=e,this.props=o}),Object.defineProperty(o,"document",function(){if(!n){var e="undefined"==typeof window?require("html-element"):window;n=e.document}return n}),o.isBrowser){var r=function(e){e=e.toLowerCase();var o=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:o[1]||"",version:o[2]||"0"}}(navigator.userAgent),i=o.browser={};r.browser&&(i[r.browser]=!0,i.version=r.version),i.chrome?i.webkit=!0:i.webkit&&(i.safari=!0)}return e.attach("langx.hoster",o)});
//# sourceMappingURL=sourcemaps/hoster.js.map
