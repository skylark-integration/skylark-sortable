/**
 * skylark-domx-eventer - The skylark eventer library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","./eventer","skylark-domx-velm","skylark-domx-query"],function(e,r,a,n){var t=["off","on","one","trigger"];return e.each(r.NativeEvents,function(e){t.push(e)}),a.delegate(t,r),e.each(t,function(e,a){n.fn[a]=n.wraps.wrapper_every_act(r[a],r)}),n.ready=r.ready,r});
//# sourceMappingURL=sourcemaps/main.js.map
