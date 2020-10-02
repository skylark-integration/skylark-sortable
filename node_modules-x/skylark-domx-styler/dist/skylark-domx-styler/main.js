/**
 * skylark-domx-styler - The skylark style library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./styler","skylark-domx-velm","skylark-domx-query"],function(s,r,a){r.delegate(["addClass","className","css","hasClass","hide","isInvisible","removeClass","show","toggleClass"],s);return["position","left","top","right","bottom","width","height","border","borderLeft","borderTop","borderRight","borderBottom","borderColor","display","overflow","margin","marginLeft","marginTop","marginRight","marginBottom","padding","paddingLeft","paddingTop","paddingRight","paddingBottom","color","background","backgroundColor","opacity","fontSize","fontWeight","textAlign","textDecoration","textTransform","cursor","zIndex"].forEach(function(s){var a=s;r.VisualElement.prototype[a]=function(r){return this.css(s,r),this}}),a.fn.style=a.wraps.wrapper_name_value(s.css,s),a.fn.css=a.wraps.wrapper_name_value(s.css,s),a.fn.hasClass=a.wraps.wrapper_some_chk(s.hasClass,s),a.fn.addClass=a.wraps.wrapper_every_act_firstArgFunc(s.addClass,s,s.className),a.fn.removeClass=a.wraps.wrapper_every_act_firstArgFunc(s.removeClass,s,s.className),a.fn.toggleClass=a.wraps.wrapper_every_act_firstArgFunc(s.toggleClass,s,s.className),a.fn.replaceClass=function(s,r){return this.removeClass(r),this.addClass(s),this},a.fn.replaceClass=function(s,r){return this.removeClass(r),this.addClass(s),this},s});
//# sourceMappingURL=sourcemaps/main.js.map
