/**
 * skylark-langx-binary - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns/ns"],function(r){"use strict";return r.attach("langx.binary",{fromBase64:function(r){for(var n,e,t,f,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=r.length/4*3,u=new ArrayBuffer(i),c=new Uint8Array(u),o=0,A=0;o<i;o+=3)n=a.indexOf(r.charAt(A++)),e=a.indexOf(r.charAt(A++)),t=a.indexOf(r.charAt(A++)),f=a.indexOf(r.charAt(A++)),c[o]=n<<2|e>>4,64!==t&&(c[o+1]=(15&e)<<4|t>>2),64!==f&&(c[o+2]=(3&t)<<6|f);return u},fromBinaryString:function(r){for(var n=r.length,e=new ArrayBuffer(n),t=new Uint8Array(e),f=0;f<n;f++)t[f]=r.charCodeAt(f);return e},fromBuffer:function(r){for(var n=new ArrayBuffer(r.length),e=new Uint8Array(n),t=0;t<r.length;t++)e[t]=r[t];return n}})});
//# sourceMappingURL=sourcemaps/binary.js.map
