/**
 * skylark-langx-funcs - The skylark JavaScript language extension library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["./funcs"],function(t){Array.prototype.slice;var e={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g},n=/(.)^/,r={"'":"'","\\":"\\","\r":"r","\n":"n","\t":"t","\u2028":"u2028","\u2029":"u2029"},u=/\\|'|\r|\n|\t|\u2028|\u2029/g;function a(t,a,i){var o;i=objects.defaults({},i,e);var c=RegExp([(i.escape||n).source,(i.interpolate||n).source,(i.evaluate||n).source].join("|")+"|$","g"),_=0,l="__p+='";t.replace(c,function(e,n,a,i,o){return l+=t.slice(_,o).replace(u,function(t){return"\\"+r[t]}),n&&(l+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'"),a&&(l+="'+\n((__t=("+a+"))==null?'':__t)+\n'"),i&&(l+="';\n"+i+"\n__p+='"),_=o+e.length,e}),l+="';\n",i.variable||(l="with(obj||{}){\n"+l+"}\n"),l="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+l+"return __p;\n";try{o=new Function(i.variable||"obj","_",l)}catch(t){throw t.source=l,t}if(a)return o(a,this);var s=proxy(function(t){return o.call(this,t,this)},this),p=i.variable||"obj";return s.source="function("+p+"){\n"+l+"}",s}return a.templateSettings=t.templateSettings=e,t.template=a});
//# sourceMappingURL=sourcemaps/template.js.map
