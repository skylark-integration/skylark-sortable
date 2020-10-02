/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-types","skylark-langx-objects","skylark-langx-arrays","skylark-langx-klass","./events","./Event"],function(n,i,t,s,e,r){Array.prototype.slice;var l=t.compact,o=(n.isDefined,n.isPlainObject,n.isFunction,n.isBoolean),a=n.isString,h=n.isEmptyObject,f=(i.mixin,i.safeMixin,s({listenTo:function(i,t,s,e){if(!i)return this;if(o(s)&&(e=s,s=null),n.isPlainObject(t)){var r=t;for(var l in r)this.listenTo(i,l,r[l],e);return this}s||(s="handleEvent"),a(s)&&(s=this[s]),e?i.one(t,s,this):i.on(t,s,this);for(var h,f=this._listeningTo||(this._listeningTo=[]),u=0;u<f.length;u++)if(f[u].obj==i){h=f[u];break}h||f.push(h={obj:i,events:{}});var v=h.events,c=v[t]=v[t]||[];return-1==c.indexOf(s)&&c.push(s),this},listenToOnce:function(n,i,t){return this.listenTo(n,i,t,1)},unlistenTo:function(n,i,t){var s=this._listeningTo;if(!s)return this;a(t)&&(t=this[t]);for(var e=0;e<s.length;e++){var r=s[e];if(!n||n==r.obj){var o=r.events;for(var f in o)if(!i||i==f){for(var u=o[f],v=0;v<u.length;v++)t&&t!=u[e]||(r.obj.off(f,u[e],this),u[e]=null);u=o[f]=l(u),h(u)&&(o[f]=null)}h(o)&&(s[e]=null)}}return s=this._listeningTo=l(s),h(s)&&(this._listeningTo=null),this}}));return e.Listener=f});
//# sourceMappingURL=sourcemaps/Listener.js.map
