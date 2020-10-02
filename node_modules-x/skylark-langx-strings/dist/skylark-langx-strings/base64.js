/**
 * skylark-langx-strings - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./strings"],function(r){return r.base64={decode:function(r,t){t=null!=t&&t;var e,o,n,h,a,c,i="",C=0;for(r=r.replace(/[^A-Za-z0-9\+\/\=]/g,"");C<r.length;)e=this._keyStr.indexOf(r.charAt(C++))<<2|(h=this._keyStr.indexOf(r.charAt(C++)))>>4,o=(15&h)<<4|(a=this._keyStr.indexOf(r.charAt(C++)))>>2,n=(3&a)<<6|(c=this._keyStr.indexOf(r.charAt(C++))),i+=String.fromCharCode(e),64!=a&&(i+=String.fromCharCode(o)),64!=c&&(i+=String.fromCharCode(n));return t||(i=function(r){for(var t="",e=0,o=c1=c2=0;e<r.length;)(o=r.charCodeAt(e))<128?(t+=String.fromCharCode(o),e++):o>191&&o<224?(c2=r.charCodeAt(e+1),t+=String.fromCharCode((31&o)<<6|63&c2),e+=2):(c2=r.charCodeAt(e+1),c3=r.charCodeAt(e+2),t+=String.fromCharCode((15&o)<<12|(63&c2)<<6|63&c3),e+=3);return t}(i)),i},encode:function(r,t){var e,o,n,h,a,c,i,C="",d=0;for((t=null!=t&&t)||(r=function(r){r=r.replace(/\r\n/g,"\n");for(var t="",e=0;e<r.length;e++){var o=r.charCodeAt(e);o<128?t+=String.fromCharCode(o):o>127&&o<2048?(t+=String.fromCharCode(o>>6|192),t+=String.fromCharCode(63&o|128)):(t+=String.fromCharCode(o>>12|224),t+=String.fromCharCode(o>>6&63|128),t+=String.fromCharCode(63&o|128))}return t}(r));d<r.length;)h=(e=r.charCodeAt(d++))>>2,a=(3&e)<<4|(o=r.charCodeAt(d++))>>4,c=(15&o)<<2|(n=r.charCodeAt(d++))>>6,i=63&n,isNaN(o)?c=i=64:isNaN(n)&&(i=64),C=C+this._keyStr.charAt(h)+this._keyStr.charAt(a)+this._keyStr.charAt(c)+this._keyStr.charAt(i);return C}}});
//# sourceMappingURL=sourcemaps/base64.js.map
