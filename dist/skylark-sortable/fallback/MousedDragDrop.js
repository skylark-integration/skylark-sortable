/**
 * skylark-sortable - A version of sortable.js that ported to running on skylarkjs.
 * @author Hudaokeji, Inc.
 * @version v0.9.0
 * @link https://github.com/skylark-integration/skylark-sortable/
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","skylark-domx-eventer","skylark-domx-styler","skylark-domx-transforms","./ghoster","./autoscroll"],function(t,e,n,o,i,a,l){return t.Emitter.inherit({_construct:function(t){this.dnd=t;var n=e(document);this.listenTo(n,"mousemove",this._onMouseMove.bind(this)),this.listenTo(n,"mouseup",this._onMouseUp.bind(this))},_onMouseUp:function(t){var e=this.dnd;e.putSortable&&e.putSortable._onDrop(t),e.dragging&&e.dragging._onDragEnd(t),a.remove(),this.destroy()},_onMouseMove:function(t,e){var n=this.dnd,l=a.ghostEl,r=n.dragging,s=n.dragEl,d=n.tapEvt;if(d){var c=r.options,h=c.fallbackTolerance,u=c.fallbackOffset,g=t.touches?t.touches[0]:t,_=l&&i.matrix(l),p=l&&_&&_.a,f=l&&_&&_.d,v=a.getRelativeScrollOffset(),m=(g.clientX-d.clientX+u.x)/(p||1)+(v?v[0]-ghostRelativeParentInitialScroll[0]:0)/(p||1),x=(g.clientY-d.clientY+u.y)/(f||1)+(v?v[1]-ghostRelativeParentInitialScroll[1]:0)/(f||1),S=t.touches?"translate3d("+m+"px,"+x+"px,0)":"translate("+m+"px,"+x+"px)";if(!this._dragStarted&&!n.awaitingDragStarted){if(h&&Math.min(Math.abs(g.clientX-r._lastX),Math.abs(g.clientY-r._lastY))<h)return;r._onDragStart(t,!0),a._appendGhost(s,document.body,r.options),this._dragStarted=!0,this._loopId=setInterval(this._emulateDragOver.bind(this),50)}!e&&this._handleAutoScroll(g,!0),this.touchEvt=g,l&&o.css(l,"transform",S),t.preventDefault()}},_emulateDragOver:function(t){var e=this.dnd,n=e.dragEl,o=this.touchEvt;if(o){if(this._lastX===o.clientX&&this._lastY===o.clientY&&!t)return;this._lastX=o.clientX,this._lastY=o.clientY;for(var i=document.elementFromPoint(o.clientX,o.clientY),a=i;i&&i.shadowRoot&&(i=i.shadowRoot.elementFromPoint(o.clientX,o.clientY))!==a;)a=i;if(a)do{if(a[e.expando])if(a[e.expando]._onDragOver({clientX:o.clientX,clientY:o.clientY,target:i,rootEl:a}))break;i=a}while(a=a.parentNode);n.parentNode[e.expando]._computeIsAligned(o)}},_handleAutoScroll:function(t,e){var n=this.dnd;if(n.dragEl&&n.active.options.scroll)return l._handleAutoScroll(t,n.active.options,e,n.expando)},destroy:function(){this.unlistenTo(),this._loopId&&clearInterval(this._loopId),l._nulling(),l._clearAutoScrolls(),l._cancelThrottle(),this._dragStarted=!1}})});
//# sourceMappingURL=../sourcemaps/fallback/MousedDragDrop.js.map
