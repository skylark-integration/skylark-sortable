define([
    "./numerics",
	"./Transform"
],function(numerics,Transform) {

    var MatrixTransform =  Transform.inherit({
        "klassName": "MatrixTransform",

		"value"	:	{
			get : function(){
				return this.matrix.clone();
			}
		},
		
		"matrix" : {
			get : function(){
				return this._.matrix;
			}
		},

		clone : /*ScaleTransform*/function() {
		},
		
		transform : /*Point*/function(/*Point*/point) {
		},
		
		//指定された境界ボックスを変換し、それをちょうど格納できる大きさの軸平行境界ボックスを返します。
		transformBounds : /*Rect*/function(/*Rect*/rect) {
		},		
		"_construct" : function(/*Martix*/matrix) {
            var _ = this._ = {};
			
			_.matrix = matrix;
		}
				
	});

	return numerics.MatrixTransform = MatrixTransform;
	
});	
