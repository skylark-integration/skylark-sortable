/**
 * skylark-langx-numerics - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./numerics","./Transform","./MatrixTransform"],function(n,t,r,i,s){var a=t.inherit({klassName:"TranslateTransform",value:{get:function(){return r.scaleAt(this.x,this.y)}},x:{get:function(){return this._.x}},y:{get:function(){return this._.y}},clone:function(){},transform:function(n){},transformBounds:function(n){},init:function(n,t){var r=this._;r.x=n||0,r.y=t||0}});return n.TranslateTransform=a});
//# sourceMappingURL=sourcemaps/TranslateTransform.js.map
