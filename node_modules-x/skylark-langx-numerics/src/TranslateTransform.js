define([
    "./numerics",
    "./Transform",
    "./MatrixTransform"
],function(numerics,Transform,Matrix,Point,Rect) {

    //|1   0   dx|
    //|0   1   dy|
    //|0   0    1|

   var TranslateTransform =  Transform.inherit({
        "klassName": "TranslateTransform",

        "value": {
            get: function() {
                    return Matrix.scaleAt(this.x, this.y);
            }
        },

        "x": {
            get : function() {
                return this._.x;
            }
        },

        "y": {
            get : function() {
                return this._.y;
            }
        },

        clone: /*SkewTransform*/ function() {},

        transform: /*Point*/ function( /*Point*/ point) {},

        transformBounds: /*Rect*/ function( /*Rect*/ rect) {},

        "init": function( /*Number*/ x, /*Number*/ y) {
            var _ = this._;

            _.x = x ? x : 0;
            _.y = y ? y : 0;
        }
    });

    return numerics.TranslateTransform =TranslateTransform;
});	
