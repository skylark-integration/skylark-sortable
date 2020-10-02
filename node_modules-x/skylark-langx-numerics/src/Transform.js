define([
	"skylark-langx-klass",	
    "./numerics",
], function(klass,numerics) {

    var Transform =  klass({
        "klassName": "Transform",
		"value": {
			get : function(){
				return this._.value;
			}
		}
	});

	return numerics.Transform =Transform;
});
