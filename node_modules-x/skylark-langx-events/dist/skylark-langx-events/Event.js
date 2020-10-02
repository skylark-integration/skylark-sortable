/**
 * skylark-langx-events - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx-objects","skylark-langx-funcs","skylark-langx-klass","skylark-langx-hoster"],function(t,e,a){var n={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};function r(a,r){return!r&&a.isDefaultPrevented||(r||(r=a),t.each(n,function(t,n){var s=r[t];a[t]=function(){return this[n]=e.returnTrue,s&&s.apply(r,arguments)},a[n]=e.returnFalse})),a}class s extends CustomEvent{constructor(e,a){super(e,a),t.safeMixin(this,a),r(this)}}return s.compatible=r,s});
//# sourceMappingURL=sourcemaps/Event.js.map
