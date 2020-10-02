/**
 * skylark-langx-aspect - The skylark JavaScript language exteaspection library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license 
 */
define(["skylark-langx-ns"],function(e){var r,n=0;function t(e){return function(t,a,i,u){var o,v=t[a];v&&v.target==t||(t[a]=o=function(){for(var e=n,t=arguments,a=o.before;a;)t=a.advice.apply(this,t)||t,a=a.next;if(o.around)var i=o.around.advice(this,t);for(var u=o.after;u&&u.id<e;){if(u.receiveArguments){var v=u.advice.apply(this,t);i=v===r?i:v}else i=u.advice.call(this,i,t);u=u.next}return i},v&&(o.around={advice:function(e,r){return v.apply(e,r)}}),o.target=t);var f=function(e,r,t,a){var i,u=e[r],o="around"==r;if(o){var v=t(function(){return u.advice(this,arguments)});i={remove:function(){v&&(v=e=t=null)},advice:function(e,r){return v?v.apply(e,r):u.advice(e,r)}}}else i={remove:function(){if(i.advice){var n=i.previous,a=i.next;a||n?(n?n.next=a:e[r]=a,a&&(a.previous=n)):delete e[r],e=t=i.advice=null}},id:n++,advice:t,receiveArguments:a};if(u&&!o)if("after"==r){for(;u.next&&(u=u.next););u.next=i,i.previous=u}else"before"==r&&(e[r]=i,i.next=u,u.previous=i);else e[r]=i;return i}(o||v,e,i,u);return i=null,f}}return e.attach("langx.aspect",{after:t("after"),around:t("around"),before:t("before")})});
//# sourceMappingURL=sourcemaps/aspect.js.map
