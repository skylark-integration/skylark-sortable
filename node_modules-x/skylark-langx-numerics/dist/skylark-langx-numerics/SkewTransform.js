/**
 * skylark-langx-numerics - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./numerics","./Transform","./MatrixTransform"],function(n,t,r){var e=t.inherit({klassName:"SkewTransform",value:{get:function(){return r.scaleAt(this.skewX,this.skewY)}},skewX:{get:function(){return this._.skewX}},skewY:{get:function(){return this._.skewY}},clone:function(){},transform:function(n){},transformBounds:function(n){},_construct:function(n,t){var r=this._={};r.skewX=n||0,r.skewY=t||0}});return n.SkewTransform=e});
//# sourceMappingURL=sourcemaps/SkewTransform.js.map
