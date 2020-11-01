define([
    "skylark-langx/langx",
    "skylark-domx-noder",
    "skylark-domx-data",
    "skylark-domx-finder",
    "skylark-domx-geom",
    "skylark-domx-eventer",
    "skylark-domx-styler",
    "skylark-domx-plugins"
], function(langx, noder, datax, finder, geom, eventer, styler, plugins) {
    var Droppable = plugins.Plugin.inherit({
        klassName: "Droppable",
        
        pluginName : "intg.sortable.droppable",

        options : {
        },

        _construct: function(elm, options) {
            this.overrided(elm,options);

            if (this.nativeDraggable) {
                eventer.on(el, 'dragover', this);
                eventer.on(el, 'dragenter', this);
            }
        
        }
    });


    return Droppable;

});