/**
 * skylark-domx-transforms - The skylark transform library for dom api extension.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
(function(factory,globals) {
  var define = globals.define,
      require = globals.require,
      isAmd = (typeof define === 'function' && define.amd),
      isCmd = (!isAmd && typeof exports !== 'undefined');

  if (!isAmd && !define) {
    var map = {};
    function absolute(relative, base) {
        if (relative[0]!==".") {
          return relative;
        }
        var stack = base.split("/"),
            parts = relative.split("/");
        stack.pop(); 
        for (var i=0; i<parts.length; i++) {
            if (parts[i] == ".")
                continue;
            if (parts[i] == "..")
                stack.pop();
            else
                stack.push(parts[i]);
        }
        return stack.join("/");
    }
    define = globals.define = function(id, deps, factory) {
        if (typeof factory == 'function') {
            map[id] = {
                factory: factory,
                deps: deps.map(function(dep){
                  return absolute(dep,id);
                }),
                resolved: false,
                exports: null
            };
            require(id);
        } else {
            map[id] = {
                factory : null,
                resolved : true,
                exports : factory
            };
        }
    };
    require = globals.require = function(id) {
        if (!map.hasOwnProperty(id)) {
            throw new Error('Module ' + id + ' has not been defined');
        }
        var module = map[id];
        if (!module.resolved) {
            var args = [];

            module.deps.forEach(function(dep){
                args.push(require(dep));
            })

            module.exports = module.factory.apply(globals, args) || null;
            module.resolved = true;
        }
        return module.exports;
    };
  }
  
  if (!define) {
     throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");
  }

  factory(define,require);

  if (!isAmd) {
    var skylarkjs = require("skylark-langx-ns");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-transforms/transforms',[
    "skylark-langx/skylark",
    "skylark-langx/langx",
    "skylark-domx-browser",
    "skylark-domx-data",
    "skylark-domx-styler"
], function(skylark,langx,browser,datax,styler) {
  var css3Transform = browser.normalizeCssProperty("transform");

  function getMatrix(radian, x, y) {
    var Cos = Math.cos(radian), Sin = Math.sin(radian);
    return {
      M11: Cos * x, 
      M12: -Sin * y,
      M21: Sin * x, 
      M22: Cos * y
    };
  }

  function getZoom(scale, zoom) {
      return scale > 0 && scale > -zoom ? zoom :
        scale < 0 && scale < zoom ? -zoom : 0;
  }

  function change(el,d) {
      var matrix = getMatrix(d.radian, d.y, d.x);
      styler.css(el,css3Transform, "matrix("
        + matrix.M11.toFixed(16) + "," + matrix.M21.toFixed(16) + ","
        + matrix.M12.toFixed(16) + "," + matrix.M22.toFixed(16) + ", 0, 0)"
      );      
  }

  function transformData(el,d) {
    if (d) {
      datax.data(el,"transform",d);
    } else {
      d = datax.data(el,"transform") || {};
      d.radian = d.radian || 0;
      d.x = d.x || 1;
      d.y = d.y || 1;
      d.zoom = d.zoom || 1;
      return d;     
    }
  }

  var calcs = {
    //Vertical flip
    vertical : function (d) {
        d.radian = Math.PI - d.radian; 
        d.y *= -1;
    },

   //Horizontal flip
    horizontal : function (d) {
        d.radian = Math.PI - d.radian; 
        d.x *= -1;
    },

    //Rotate according to angle
    rotate : function (d,degress) {
        d.radian = degress * Math.PI / 180;; 
    },

    //Turn left 90 degrees
    left : function (d) {
        d.radian -= Math.PI / 2; 
    },

    //Turn right 90 degrees
    right : function (d) {
        d.radian += Math.PI / 2; 
    },
 
    //zoom
    scale: function (d,zoom) {
        var hZoom = getZoom(d.y, zoom), vZoom = getZoom(d.x, zoom);
        if (hZoom && vZoom) {
          d.y += hZoom; 
          d.x += vZoom;
        }
    }, 

    //zoom in
    zoomin: function (d) { 
      calcs.scale(d,0.1); 
    },
    
    //zoom out
    zoomout: function (d) { 
      calcs.scale(d,-0.1); 
    }

  };
  
  
  function _createApiMethod(calcFunc) {
    return function() {
      var args = langx.makeArray(arguments),
        el = args.shift(),
          d = transformData(el);
        args.unshift(d);
        calcFunc.apply(this,args)
        change(el,d);
        transformData(el,d);
    }
  }
  

  function matrix(el) {
    var appliedTransforms = '';
    do {
      var transform = styler.css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */
    } while (el = el.parentNode);

    if (window.DOMMatrix) {
      return new DOMMatrix(appliedTransforms);
    } else if (window.WebKitCSSMatrix) {
      return new WebKitCSSMatrix(appliedTransforms);
    } else if (window.CSSMatrix) {
      return new CSSMatrix(appliedTransforms);
    }
  }
   
  function transforms() {
    return transforms;
  }

  ["vertical","horizontal","rotate","left","right","scale","zoom","zoomin","zoomout"].forEach(function(name){
    transforms[name] = _createApiMethod(calcs[name]);
  });

  langx.mixin(transforms, {
    reset : function(el) {
      var d = {
        x : 1,
        y : 1,
        radian : 0,
      }
      change(el,d);
      transformData(el,d);
    },
    matrix
  });


  return skylark.attach("domx.transforms", transforms);
});

define('skylark-domx-transforms/main',[
	"./transforms"
],function(transforms){
	return transforms;
});
define('skylark-domx-transforms', ['skylark-domx-transforms/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-transforms.js.map
