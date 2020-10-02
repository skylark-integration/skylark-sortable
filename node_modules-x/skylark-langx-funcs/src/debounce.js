define([
	"./funcs"
],function(funcs){
   
    function debounce(fn, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                fn.apply(context, args);
            };

            function stop() {
                if (timeout) clearTimeout(timeout);
                timeout = void 0;
            }

            stop();
            timeout = setTimeout(later, wait);

            return {
                stop 
            };
        };
    }

    return funcs.debounce = debounce;

})