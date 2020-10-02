/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(n){function i(n){this.callback=n,this.running=!1,this.id=-1}return i.prototype.start=function(){if(!this.running){this.running=!0;var n=this;!function i(){n.callback(),n.running&&(n.id=requestAnimationFrame(i))}()}},i.prototype.stop=function(){this.running=!1,cancelAnimationFrame(this.id)},n.loop=function(n){return new i(n)}});
//# sourceMappingURL=sourcemaps/loop.js.map
