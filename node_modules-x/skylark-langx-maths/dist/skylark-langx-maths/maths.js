/**
 * skylark-langx-maths - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-ns","skylark-langx-types"],function(t,n){for(var r=[],o=0;o<256;o++)r[o]=(o<16?"0":"")+o.toString(16);var a={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,clamp:function(t,n,r){return Math.max(n,Math.min(r,t))},euclideanModulo:function(t,n){return(t%n+n)%n},mapLinear:function(t,n,r,o,a){return o+(t-n)*(a-o)/(r-n)},lerp:function(t,n,r){return(1-r)*t+r*n},smoothstep:function(t,n,r){return t<=n?0:t>=r?1:(t=(t-n)/(r-n))*t*(3-2*t)},smootherstep:function(t,n,r){return t<=n?0:t>=r?1:(t=(t-n)/(r-n))*t*t*(t*(6*t-15)+10)},randInt:function(t,n){return t+Math.floor(Math.random()*(n-t+1))},randFloat:function(t,n){return t+Math.random()*(n-t)},randFloatSpread:function(t){return t*(.5-Math.random())},degToRad:function(t){return t*MathUtils.DEG2RAD},radToDeg:function(t){return t*MathUtils.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},ceilPowerOfTwo:function(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))},floorPowerOfTwo:function(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))},setQuaternionFromProperEuler:function(t,n,r,o,a){var e=Math.cos,u=Math.sin,i=e(r/2),h=u(r/2),c=e((n+o)/2),f=u((n+o)/2),l=e((n-o)/2),s=u((n-o)/2),M=e((o-n)/2),d=u((o-n)/2);"XYX"===a?t.set(i*f,h*l,h*s,i*c):"YZY"===a?t.set(h*s,i*f,h*l,i*c):"ZXZ"===a?t.set(h*l,h*s,i*f,i*c):"XZX"===a?t.set(i*f,h*d,h*M,i*c):"YXY"===a?t.set(h*M,i*f,h*d,i*c):"ZYZ"===a?t.set(h*d,h*M,i*f,i*c):console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order.")}};return t.attach("langx.maths",a)});
//# sourceMappingURL=sourcemaps/maths.js.map
