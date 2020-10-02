/**
 * skylark-domx-scripter - The skylark scripter library for dom api extension.
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
    var skylarkjs = require("skylark-langx/skylark");

    if (isCmd) {
      module.exports = skylarkjs;
    } else {
      globals.skylarkjs  = skylarkjs;
    }
  }

})(function(define,require) {

define('skylark-domx-scripter/scripter',[
    "skylark-langx/skylark",
    "skylark-langx/langx",
    "skylark-domx-noder",
    "skylark-domx-finder"
], function(skylark, langx, noder, finder) {

    var head = document.getElementsByTagName('head')[0],
        scriptsByUrl = {},
        scriptElementsById = {},
        count = 0;

    var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );

    function scripter() {
        return scripter;
    }


    var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
    };

    function evaluate(code,node, doc ) {
        doc = doc || document;

        var i, val,
            script = doc.createElement("script");

        script.text = code;
        if ( node ) {
            for ( i in preservedScriptAttributes ) {

                // Support: Firefox 64+, Edge 18+
                // Some browsers don't support the "nonce" property on scripts.
                // On the other hand, just using `getAttribute` is not enough as
                // the `nonce` attribute is reset to an empty string whenever it
                // becomes browsing-context connected.
                // See https://github.com/whatwg/html/issues/2369
                // See https://html.spec.whatwg.org/#nonce-attributes
                // The `node.getAttribute` check was added for the sake of
                // `jQuery.globalEval` so that it can fake a nonce-containing node
                // via an object.
                val = node[ i ] || node.getAttribute && node.getAttribute( i );
                if ( val ) {
                    script.setAttribute( i, val );
                }
            }
        }
        doc.head.appendChild( script ).parentNode.removeChild( script );

        return this;
    }

    langx.mixin(scripter, {
        /*
         * Load a script from a url into the document.
         * @param {} url
         * @param {} loadedCallback
         * @param {} errorCallback
         */
        loadJavaScript: function(url, loadedCallback, errorCallback) {
            var script = scriptsByUrl[url];
            if (!script) {
                script = scriptsByUrl[url] = {
                    state: 0, //0:unload,1:loaded,-1:loaderror
                    loadedCallbacks: [],
                    errorCallbacks: []
                }
            }

            script.loadedCallbacks.push(loadedCallback);
            script.errorCallbacks.push(errorCallback);

            if (script.state === 1) {
                script.node.onload();
            } else if (script.state === -1) {
                script.node.onerror();
            } else {
                var node = script.node = document.createElement("script"),
                    id = script.id = (count++);

                node.type = "text/javascript";
                node.async = false;
                node.defer = false;
                startTime = new Date().getTime();
                head.appendChild(node);

                node.onload = function() {
                        script.state = 1;

                        var callbacks = script.loadedCallbacks,
                            i = callbacks.length;

                        while (i--) {
                            callbacks[i]();
                        }
                        script.loadedCallbacks = [];
                        script.errorCallbacks = [];
                    },
                    node.onerror = function() {
                        script.state = -1;
                        var callbacks = script.errorCallbacks,
                            i = callbacks.length;

                        while (i--) {
                            callbacks[i]();
                        }
                        script.loadedCallbacks = [];
                        script.errorCallbacks = [];
                    };
                node.src = url;

                scriptElementsById[id] = node;
            }
            return script.id;
        },
        /*
         * Remove the specified script from the document.
         * @param {Number} id
         */
        deleteJavaScript: function(id) {
            var node = scriptElementsById[id];
            if (node) {
                var url = node.src;
                noder.remove(node);
                delete scriptElementsById[id];
                delete scriptsByUrl[url];
            }
        },

        evaluate : evaluate,

        html : function(node,value) {

            var result = noder.html(node,value);

            if (value !== undefined) {
                var scripts = node.querySelectorAll('script');

                for (var i =0; i<scripts.length; i++) {
                    var node1 = scripts[i];
                    if (rscriptType.test( node1.type || "" ) ) {
                      evaluate(node1.textContent,node1);
                    }
                }       
                return this;         
            } else {
                return result;
            }



        }
    });

    return skylark.attach("domx.scripter", scripter);
});
define('skylark-domx-scripter/main',[
	"./scripter",
	"skylark-domx-query"
],function(scripter,$){

    $.fn.html = $.wraps.wrapper_value(scripter.html, scripter, scripter.html);

	return scripter;
});
define('skylark-domx-scripter', ['skylark-domx-scripter/main'], function (main) { return main; });


},this);
//# sourceMappingURL=sourcemaps/skylark-domx-scripter.js.map
