define([
    "./numerics",
    "./Transform",
    "./MatrixTransform"
], function(numerics, Transform, Matrix) {

   var SkewTransform = Transform.inherit({
        "klassName": "SkewTransform",

        "value": {
            get: function() {
                    return Matrix.scaleAt(this.skewX, this.skewY);
            }
        },

        "skewX": {
            get : function() {
                return this._.skewX;
            }
        },

        "skewY": {
            get : function() {
                return this._.skewY;
            }
        },

        clone: /*SkewTransform*/ function() {},

        transform: /*Point*/ function( /*Point*/ point) {},

        transformBounds: /*Rect*/ function( /*Rect*/ rect) {},

        "_construct": function( /*Number*/ skewX, /*Number*/ skewY) {
            var _ = this._ = {};

            _.skewX = skewX ? skewX : 0;
            _.skewY = skewY ? skewY : 0;
        }
    });

    return numerics.SkewTransform = SkewTransform;

});
