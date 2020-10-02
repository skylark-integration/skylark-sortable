define([
    "./funcs"
],function(funcs){
    function defer(fn) {
        var ret = {
            stop : null
        },
        id ;
        if (requestAnimationFrame) {
            id = requestAnimationFrame(fn);
            ret.stop = function() {
                return cancelAnimationFrame(id);
            };
        } else {
            id = setTimeoutout(fn);
            ret.stop = function() {
                return clearTimeout(id);
            };
        }
        return ret;
    }

    return funcs.defer = defer;
})