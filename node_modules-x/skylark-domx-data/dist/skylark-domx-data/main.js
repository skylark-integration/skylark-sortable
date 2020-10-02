/**
 * skylark-domx-data - The skylark data library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./data","skylark-domx-velm","skylark-domx-query"],function(r,a,e){return a.delegate(["attr","data","prop","removeAttr","removeData","text","val"],r),e.fn.text=e.wraps.wrapper_value(r.text,r,r.text),e.fn.attr=e.wraps.wrapper_name_value(r.attr,r,r.attr),e.fn.removeAttr=e.wraps.wrapper_every_act(r.removeAttr,r),e.fn.prop=e.wraps.wrapper_name_value(r.prop,r,r.prop),e.fn.removeProp=e.wraps.wrapper_every_act(r.removeProp,r),e.fn.data=e.wraps.wrapper_name_value(r.data,r),e.fn.removeData=e.wraps.wrapper_every_act(r.removeData),e.fn.val=e.wraps.wrapper_value(r.val,r,r.val),r});
//# sourceMappingURL=sourcemaps/main.js.map
