define( [
    "skylark-langx-klass",
    "./numerics",
    "./Vector2"
], function(klass,numerics,Vector2){
	// reference easeljs/numerics/Matrix2D  and dojox/gfx/matrix
	
	var DEG_TO_RAD = Math.PI/180;
	var _degToRadCache = {};
	var degToRad = function(degree){
		return _degToRadCache[degree] || (_degToRadCache[degree] = (Math.PI * degree / 180));
	};
	var radToDeg = function(radian){ return radian / Math.PI * 180; };
	

	//Represents a 3 x 3 affine transformation matrix used for transformation in 2-D space.
	//|----------|
	//|m11|m21|dx| 
	//|----------|
	//|m12|m22|dy|
	//|----------|
	//|  0|  0| 1|
	//|----------|
	
    var TransformMatrix =  klass({
        "klassName": "TransformMatrix",

		"_multiplyPoint"	: 	function(p){
			// summary:
			//		applies the matrix to a point
			// p: Point
			//		a point
			// returns: Point
			var _ = this._,
				x = p.x * _.m11 + p.y * _.m21  + _.dx,
			    y = p.x * _.m12 +  p.y * _.m22 + _.dy;

			return new Vector2(x,y); // Point
		},

       "m11": {
       		//Position (0, 0) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.m11;
            }
        },

       "m12": {
       		//Position (0, 1) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.m12;
            }
        },

       "m21": {
       		//Position (1, 0) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.m21;
            }
        },

       "m22": {
       		//Position (1, 1) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.m22;
            }
        },

       "dx": {
       		// Position (2, 1) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.dx;
            }
        },

       "dy": {
       		// Position (2, 1) in a 3x3 affine transformation matrix.
            get : function() {
                return this._.dy;
            }
        },

       "alpha": {
       		// Property representing the alpha that will be applied to a display object. This is not part of matrix
       		// operations, but is used for operations like getConcatenatedMatrix to provide concatenated alpha values.
            get : function() {
                return this._.alpha;
            }
        },

       "shadow": {
       		// Property representing the shadow that will be applied to a display object. This is not part of matrix
       		// operations, but is used for operations like getConcatenatedMatrix to provide concatenated shadow values..
            get : function() {
                return this._.shadow;
            }
        },

       "compositeOperation": {
			/**
			 * Property representing the compositeOperation that will be applied to a display object. This is not part of
			 * matrix operations, but is used for operations like getConcatenatedMatrix to provide concatenated
			 * compositeOperation values. You can find a list of valid composite operations at:
			 * <a href="https://developer.mozilla.org/en/Canvas_tutorial/Compositing">https://developer.mozilla.org/en/Canvas_tutorial/Compositing</a>
			 * @property compositeOperation
			 * @type String
			 **/
            get : function() {
                return this._.compositeOperation;
            }
        },

        //Converts the specified point with TransformMatrix and returns the result.
		multiplyPoint: /*Vector2*/function(/*Vector2 */ p){
			// summary:
			//		applies the matrix to a point
			return this._multiplyPoint(p); // Vector2
		},
				/**
				 * 指定した矩形を TransformMatrix で変換し、その結果を返します。
				 */
		multiplyRectangle: /*Rect*/function(/*Rect*/ rect){
			// summary:
			//		Applies the matrix to a rectangle.
			// returns: Rect
			if(this.isIdentity())
				return rect.clone(); // Rect
			var p0 = this.multiplyPoint(rect.leftTop),
				p1 = this.multiplyPoint(rect.leftBottom),
				p2 = this.multiplyPoint(rect.right),
				p3 = this.multiplyPoint(rect.rightBottom),
				minx = Math.min(p0.x, p1.x, p2.x, p3.x),
				miny = Math.min(p0.y, p1.y, p2.y, p3.y),
				maxx = Math.max(p0.x, p1.x, p2.x, p3.x),
				maxy = Math.max(p0.y, p1.y, p2.y, p3.y);
			return new Rect(minx,miny,maxx-minx,maxy-miny);  // Rect
		},
		/**
		 * Concatenates the specified matrix properties with this matrix. All parameters are required.
		 * @method prepend
		 * @param {Number} m11
		 * @param {Number} m12
		 * @param {Number} m21
		 * @param {Number} m22
		 * @param {Number} dx
		 * @param {Number} dy
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		prepend : function(m11, m12, m21, m22, dx, dy) {
			var tx1 = this.dx;
			if (m11 != 1 || m12 != 0 || m21 != 0 || m22 != 1) {
				var a1 = this.m11;
				var c1 = this.m21;
				this.m11  = a1*m11+this.m12*m21;
				this.m12  = a1*m12+this.m12*m22;
				this.m21  = c1*m11+this.m22*m21;
				this.m22  = c1*m12+this.m22*m22;
			}
			this.dx = tx1*m11+this.dy*m21+dx;
			this.dy = tx1*m12+this.dy*m22+dy;
			return this;
		},

		/**
		 * Appends the specified matrix properties with this matrix. All parameters are required.
		 * 指定した Matrixをこの Matrixに追加します。
		 * @method append
		 * @param {Number} m11
		 * @param {Number} m12
		 * @param {Number} m21
		 * @param {Number} m22
		 * @param {Number} dx
		 * @param {Number} dy
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		append : function(m11, m12, m21, m22, dx, dy) {
			var a1 = this.m11;
			var b1 = this.m12;
			var c1 = this.m21;
			var d1 = this.m22;

			this.m11  = m11*a1+m12*c1;
			this.m12  = m11*b1+m12*d1;
			this.m21  = m21*a1+m22*c1;
			this.m22  = m21*b1+m22*d1;
			this.dx = dx*a1+dy*c1+this.dx;
			this.dy = dx*b1+dy*d1+this.dy;
			return this;
		},

		/**
		 * Prepends the specified matrix with this matrix.
		 * @method prependMatrix
		 * @param {TransformMatrix} matrix
		 **/
		prependMatrix : function(matrix) {
			this.prepend(matrix.m11, matrix.m12, matrix.m21, matrix.m22, matrix.dx, matrix.dy);
			this.prependProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
			return this;
		},

		/**
		 * Appends the specified matrix with this matrix.
		 * 指定した Matrixをこの Matrixに追加します。
		 * @method appendMatrix
		 * @param {TransformMatrix} matrix
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		appendMatrix : function(matrix) {
			this.append(matrix.m11, matrix.m12, matrix.m21, matrix.m22, matrix.dx, matrix.dy);
			this.appendProperties(matrix.alpha, matrix.shadow,  matrix.compositeOperation);
			return this;
		},

		/**
		 * Generates matrix properties from the specified display object transform properties, and prepends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new TransformMatrix();
		 * mtx.prependTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method prependTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		prependTransform : function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
			if (rotation%360) {
				var r = rotation*DEG_TO_RAD;
				var cos = Math.cos(r);
				var sin = Math.sin(r);
			} else {
				cos = 1;
				sin = 0;
			}

			if (regX || regY) {
				// append the registration offset:
				this.dx -= regX; this.dy -= regY;
			}
			if (skewX || skewY) {
				// TODO: can this be combined into a single prepend operation?
				skewX *= DEG_TO_RAD;
				skewY *= DEG_TO_RAD;
				this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
				this.prepend(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
			} else {
				this.prepend(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
			}
			return this;
		},

		/**
		 * Generates matrix properties from the specified display object transform properties, and appends them with this matrix.
		 * For example, you can use this to generate a matrix from a display object: var mtx = new TransformMatrix();
		 * mtx.appendTransform(o.x, o.y, o.scaleX, o.scaleY, o.rotation);
		 * @method appendTransform
		 * @param {Number} x
		 * @param {Number} y
		 * @param {Number} scaleX
		 * @param {Number} scaleY
		 * @param {Number} rotation
		 * @param {Number} skewX
		 * @param {Number} skewY
		 * @param {Number} regX Optional.
		 * @param {Number} regY Optional.
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		appendTransform : function(x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
			if (rotation%360) {
				var r = rotation*DEG_TO_RAD;
				var cos = Math.cos(r);
				var sin = Math.sin(r);
			} else {
				cos = 1;
				sin = 0;
			}

			if (skewX || skewY) {
				// TODO: can this be combined into a single append?
				skewX *= DEG_TO_RAD;
				skewY *= DEG_TO_RAD;
				this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), x, y);
				this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, 0, 0);
			} else {
				this.append(cos*scaleX, sin*scaleX, -sin*scaleY, cos*scaleY, x, y);
			}

			if (regX || regY) {
				// prepend the registration offset:
				this.dx -= regX*this.m11+regY*this.m21; 
				this.dy -= regX*this.m12+regY*this.m22;
			}
			return this;
		},

		/**
		 * Applies a rotation transformation to the matrix.
		 * @method rotate
		 * @param {Number} angle The angle in degrees.
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		rotate : function(angle) {
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);

			var a1 = this.m11;
			var c1 = this.m21;
			var tx1 = this.dx;

			this.m11 = a1*cos-this.m12*sin;
			this.m12 = a1*sin+this.m12*cos;
			this.m21 = c1*cos-this.m22*sin;
			this.m22 = c1*sin+this.m22*cos;
			this.dx = tx1*cos-this.dy*sin;
			this.dy = tx1*sin+this.dy*cos;
			return this;
		},

		/**
		 * Applies a skew transformation to the matrix.
		 * @method skew
		 * @param {Number} skewX The amount to skew horizontally in degrees.
		 * @param {Number} skewY The amount to skew vertically in degrees.
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		*/
		skew : function(skewX, skewY) {
			skewX = skewX*DEG_TO_RAD;
			skewY = skewY*DEG_TO_RAD;
			this.append(Math.cos(skewY), Math.sin(skewY), -Math.sin(skewX), Math.cos(skewX), 0, 0);
			return this;
		},

		/**
		 * Applies a scale transformation to the matrix.
		 * @method scale
		 * @param {Number} x
		 * @param {Number} y
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		scale : function(x, y) {
			this.m11 *= x;
			this.m22 *= y;
			this.dx *= x;
			this.dy *= y;
			return this;
		},

		/**
		 * Translates the matrix on the x and y axes.
		 * @method translate
		 * @param {Number} x
		 * @param {Number} y
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		translate : function(x, y) {
			this.dx += x;
			this.dy += y;
			return this;
		},

		/**
		 * Sets the properties of the matrix to those of an identity matrix (one that applies a null transformation).
		 * @method identity
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		identity : function() {
			this.alpha = this.m11 = this.m22 = 1;
			this.m12 = this.m21 = this.dx = this.dy = 0;
			this.shadow = this.compositeOperation = null;
			return this;
		},

		/**
		 * Inverts the matrix, causing it to perform the opposite transformation.
		 * @method invert
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		 **/
		invert : function() {
			var a1 = this.m11;
			var b1 = this.m12;
			var c1 = this.m21;
			var d1 = this.m22;
			var tx1 = this.dx;
			var n = a1*d1-b1*c1;

			this.m11 = d1/n;
			this.m12 = -b1/n;
			this.m21 = -c1/n;
			this.m22 = a1/n;
			this.dx = (c1*this.dy-d1*tx1)/n;
			this.dy = -(a1*this.dy-b1*tx1)/n;
			return this;
		},

		/**
		 * Returns true if the matrix is an identity matrix.
		 * @method isIdentity
		 * @return {Boolean}
		 **/
		isIdentity : function() {
			return this.dx == 0 && this.dy == 0 && this.m11 == 1 && this.m12 == 0 && this.m21 == 0 && this.m22 == 1;
		},

		/**
		 * Decomposes the matrix into transform properties (x, y, scaleX, scaleY, and rotation). Note that this these values
		 * may not match the transform properties you used to generate the matrix, though they will produce the same visual
		 * results.
		 * @method decompose
		 * @param {Object} target The object to apply the transform properties to. If null, then a new object will be returned.
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		*/
		decompose : function(target) {
			// TODO: it would be nice to be able to solve for whether the matrix can be decomposed into only scale/rotation
			// even when scale is negative
			if (target == null) { target = {}; }
			target.x = this.dx;
			target.y = this.dy;
			target.scaleX = Math.sqrt(this.m11 * this.m11 + this.m12 * this.m12);
			target.scaleY = Math.sqrt(this.m21 * this.m21 + this.m22 * this.m22);

			var skewX = Math.atan2(-this.m21, this.m22);
			var skewY = Math.atan2(this.m12, this.m11);

			if (skewX == skewY) {
				target.rotation = skewY/DEG_TO_RAD;
				if (this.m11 < 0 && this.m22 >= 0) {
					target.rotation += (target.rotation <= 0) ? 180 : -180;
				}
				target.skewX = target.skewY = 0;
			} else {
				target.skewX = skewX/DEG_TO_RAD;
				target.skewY = skewY/DEG_TO_RAD;
			}
			return target;
		},

		/**
		 * Reinitializes all matrix properties to those specified.
		 * @method appendProperties
		 * @param {Number} m11
		 * @param {Number} m12
		 * @param {Number} m21
		 * @param {Number} m22
		 * @param {Number} dx
		 * @param {Number} dy
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		*/
		reinitialize : function(m11,m12,m21,m22,dx,dy,alpha,shadow,compositeOperation) {
			this._initialize(m11,m12,m21,m22,dx,dy);
			this.alpha = alpha || 1;
			this.shadow = shadow;
			this.compositeOperation = compositeOperation;
			return this;
		},

		/**
		 * Appends the specified visual properties to the current matrix.
		 * @method appendProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		*/
		appendProperties : function(alpha, shadow, compositeOperation) {
			this.alpha *= alpha;
			this.shadow = shadow || this.shadow;
			this.compositeOperation = compositeOperation || this.compositeOperation;
			return this;
		},

		/**
		 * Prepends the specified visual properties to the current matrix.
		 * @method prependProperties
		 * @param {Number} alpha desired alpha value
		 * @param {Shadow} shadow desired shadow value
		 * @param {String} compositeOperation desired composite operation value
		 * @return {TransformMatrix} This matrix. Useful for chaining method calls.
		*/
		prependProperties : function(alpha, shadow, compositeOperation) {
			this.alpha *= alpha;
			this.shadow = this.shadow || shadow;
			this.compositeOperation = this.compositeOperation || compositeOperation;
			return this;
		},

		/**
		 *Multiply TransformMatrix by another TransformMatrix.
		 */
		multiply: function(matrix){
			// summary:
			//		combines matrices by multiplying them sequentially in the given order
			// matrix: TransformMatrix
			//		a 2D matrix-like object,
			//		all subsequent arguments are matrix-like objects too

			// combine matrices
			var m11 = this.m11,m12 = this.m12,m21 = this.m21,m22=this.m22,dx=this.dx,dy=this.dy;
			var r = matrix;
			this.m11 = m11 * r.m11 + m21 * r.m12;
			this.m12 = m12 * r.m11 + m22 * r.m12;
			this.m21 = m11 * r.m21 + m21 * r.m22;
			this.m22 = m12 * r.m21 + m22 * r.m22;
			this.dx =  m11 * r.dx + m21 * r.dy + dx;
			this.dy =  m12 * r.dx + m22 * r.dy + dy;
			return this // TransformMatrix
		},

		/**
		 * Returns a clone of the TransformMatrix instance.
		 * @method clone
		 * @return {TransformMatrix} a clone of the TransformMatrix instance.
		 **/
		clone : function() {

			var _ = this._,
				mtx = new TransformMatrix(_.m11, _.m12, _.m21, _.m22, _.dx, _.dy);
			mtx.shadow = this.shadow;
			mtx.alpha = this.alpha;
			mtx.compositeOperation = this.compositeOperation;
			return mtx;
		},

		/**
		 * Returns a string representation of this object.
		 * @method toString
		 * @return {String} a string representation of the instance.
		 **/
		toString : function() {
			var _ = this._;
			return "[TransformMatrix (m11="+_.m11+" m12="+_.m12+" m21="+_.m21+" m22="+_.m22+" dx="+_.dx+" dy="+_.dy+")]";
		},
		
		"_construct" : function(m11, m12, m21, m22, dx, dy) {
			var _ = this._ = {};
			_.m11 = m11 || 1;
			_.m12 = m12 || 0;
			_.m21 = m21 || 0;
			_.m22 = m22 || 1;
			_.dx = dx || 0;
			_.dy = dy || 0;
		}

	});
	
	Object.assign(TransformMatrix,{
		translate: function(a, b){
			// summary:
			//		forms a translation matrix
			// description:
			//		The resulting matrix is used to translate (move) points by specified offsets.
			// a: Number
			//		an x coordinate value
			// b: Number
			//		a y coordinate value
			// returns: TransformMatrix
			//|----------| |-----------|
			//|m11|m21|dx| |  1|   0| a|
			//|----------| |-----------|
			//|m12|m22|dy| |  0|   1| b|
			//|----------| |-----------|
			//|  0|  0| 1| |  0|   0| 1|
			//|----------| |-----------|

			return new TransformMatrix(1,0,0,1,a,b); // TransformMatrix
		},
		scale: function(a, b){
			// summary:
			//		forms a scaling matrix
			// description:
			//		The resulting matrix is used to scale (magnify) points by specified offsets.
			// a: Number
			//		a scaling factor used for the x coordinate
			// b: Number?
			//		a scaling factor used for the y coordinate
			// returns: TransformMatrix
			//|----------| |-----------|
			//|m11|m21|dx| |  a|   0| 0|
			//|----------| |-----------|
			//|m12|m22|dy| |  0|   b| 0|
			//|----------| |-----------|
			//|  0|  0| 1| |  0|   0| 1|
			//|----------| |-----------|
			return new TransformMatrix(a,0,0,b?b:a,0,0); // TransformMatrix
		},
		rotate: function(angle){
			// summary:
			//		forms a rotating matrix
			// description:
			//		The resulting matrix is used to rotate points
			//		around the origin of coordinates (0, 0) by specified angle.
			// angle: Number
			//		an angle of rotation in radians (>0 for CW)
			// returns: TransformMatrix
			//|----------| |-----------|
			//|m11|m21|dx| |cos|-sin| 0|
			//|----------| |-----------|
			//|m12|m22|dy| |sin| cos| 0|
			//|----------| |-----------|
			//|  0|  0| 1| |  0|   0| 1|
			//|----------| |-----------|
			var cos = Math.cos(angle);
			var sin = Math.sin(angle);
			return new TransformMatrix(cos,sin,-sin,cos,0,0); // TransformMatrix
		},
		rotateg: function(degree){
			// summary:
			//		forms a rotating matrix
			// description:
			//		The resulting matrix is used to rotate points
			//		around the origin of coordinates (0, 0) by specified degree.
			//		Seerotate() for comparison.
			// degree: Number
			//		an angle of rotation in degrees (>0 for CW)
			// returns: TransformMatrix
			return this.rotate(degToRad(degree)); // TransformMatrix
		},
		skewX: function(angle) {
			//TODO : will be modified
			// summary:
			//		forms an x skewing matrix
			// description:
			//		The resulting matrix is used to skew points in the x dimension
			//		around the origin of coordinates (0, 0) by specified angle.
			// angle: Number
			//		a skewing angle in radians
			// returns: TransformMatrix
			//|----------| |-----------|
			//|m11|m21|dx| |  1| tan| 0|
			//|----------| |-----------|
			//|m12|m22|dy| |  0|   1| 0|
			//|----------| |-----------|
			//|  0|  0| 1| |  0|   0| 1|
			//|----------| |-----------|
			var tan = Math.tan(angle);
			return new TransformMatrix(1,0,tan,1); // TransformMatrix
		},
		skewXg: function(degree){
			//TODO : will be modified
			// summary:
			//		forms an x skewing matrix
			// description:
			//		The resulting matrix is used to skew points in the x dimension
			//		around the origin of coordinates (0, 0) by specified degree.
			//		See dojox/gfx/matrix.skewX() for comparison.
			// degree: Number
			//		a skewing angle in degrees
			// returns: TransformMatrix
			return this.skewX(degToRad(degree)); // dojox/gfx/matrix.TransformMatrix
		},
		skewY: function(angle){
			//TODO : will be modified
			// summary:
			//		forms a y skewing matrix
			// description:
			//		The resulting matrix is used to skew points in the y dimension
			//		around the origin of coordinates (0, 0) by specified angle.
			// angle: Number
			//		a skewing angle in radians
			// returns: TransformMatrix
			//|----------| |-----------|
			//|m11|m21|dx| |  1|   0| 0|
			//|----------| |-----------|
			//|m12|m22|dy| |tan|   1| 0|
			//|----------| |-----------|
			//|  0|  0| 1| |  0|   0| 1|
			//|----------| |-----------|
			var tan = Math.tan(angle);

			return new TransformMatrix(1,tan,0,1); // TransformMatrix
		},
		skewYg: function(degree){
			//TODO : will be modified
			// summary:
			//		forms a y skewing matrix
			// description:
			//		The resulting matrix is used to skew points in the y dimension
			//		around the origin of coordinates (0, 0) by specified degree.
			//		See skewY() for comparison.
			// degree: Number
			//		a skewing angle in degrees
			// returns: TransformMatrix
			return this.skewY(degToRad(degree)); // TransformMatrix
		},
		reflect: function(a, b){
			// summary:
			//		forms a reflection matrix
			// description:
			//		The resulting matrix is used to reflect points around a vector,
			//		which goes through the origin.
			// a: dojox/gfx.Point|Number
			//		a point-like object, which specifies a vector of reflection, or an X value
			// b: Number?
			//		a Y value
			// returns: TransformMatrix
			if(arguments.length == 1){
				b = a.y;
				a = a.x;
			}
			// make a unit vector
			var a2 = a * a, b2 = b * b, n2 = a2 + b2, 
				xx=2 * a2 / n2 - 1, 
				xy = 2 * a * b / n2,
				yx = xy,
				yy = 2 * b2 / n2 - 1;
			return new TransformMatrix(xx,yx,xy, yy); // TransformMatrix
		},
		project: function(a, b){
			// summary:
			//		forms an orthogonal projection matrix
			// description:
			//		The resulting matrix is used to project points orthogonally on a vector,
			//		which goes through the origin.
			// a:   Number
			//		an x coordinate value
			// b: Number?
			//		a y coordinate value
			// returns: TransformMatrix

			// make a unit vector
			var a2 = a * a, b2 = b * b, n2 = a2 + b2, 
				xx = a2 / n2,
				xy = a * b / n2
				yx = xy,
				yy = b2 / n2;
			return new TransformMatrix(xx,yx,xy,yy); // TransformMatrix
		},

		// common operations

		// high level operations

		_sandwich: function(matrix, x, y){
			// summary:
			//		applies a matrix at a central point
			// matrix: TransformMatrix
			//		a 2D matrix-like object, which is applied at a central point
			// x: Number
			//		an x component of the central point
			// y: Number
			//		a y component of the central point
			return this.translate(x, y).multiply(matrix)
			                           .multiply(this.translate(-x, -y)); // TransformMatrix
		},
		scaleAt: function(a, b, c, d){
			// summary:
			//		scales a picture using a specified point as a center of scaling
			// description:
			//		Compare with scale().
			// a: Number
			//		a scaling factor used for the x coordinate, or a uniform scaling factor used for both coordinates
			// b: Number?
			//		a scaling factor used for the y coordinate
			// c: Number|Point
			//		an x component of a central point, or a central point
			// d: Number
			//		a y component of a central point
			// returns: TransformMatrix
			switch(arguments.length){
				case 4:
					// a and b are scale factor components, c and d are components of a point
					return this._sandwich(this.scale(a, b), c, d); // TransformMatrix
				case 3:
					if(typeof c == "number"){
						return this._sandwich(this.scale(a), b, c); // TransformMatrix
					}
					return this._sandwich(this.scale(a, b), c.x, c.y); // TransformMatrix
			}
			return this._sandwich(this.scale(a), b.x, b.y); // TransformMatrix
		},
		rotateAt: function(angle, a, b){
			// summary:
			//		rotates a picture using a specified point as a center of rotation
			// description:
			//		Compare with rotate().
			// angle: Number
			//		an angle of rotation in radians (>0 for CW)
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.rotate(angle), a, b); // TransformMatrix
			}
			return this._sandwich(this.rotate(angle), a.x, a.y); // TransformMatrix
		},
		rotategAt: function(degree, a, b){
			// summary:
			//		rotates a picture using a specified point as a center of rotation
			// description:
			//		Compare with rotateg().
			// degree: Number
			//		an angle of rotation in degrees (>0 for CW)
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.rotateg(degree), a, b); // TransformMatrix
			}
			return this._sandwich(this.rotateg(degree), a.x, a.y); // TransformMatrix
		},
		skewXAt: function(angle, a, b){
			// summary:
			//		skews a picture along the x axis using a specified point as a center of skewing
			// description:
			//		Compare with skewX().
			// angle: Number
			//		a skewing angle in radians
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.skewX(angle), a, b); // TransformMatrix
			}
			return this._sandwich(this.skewX(angle), a.x, a.y); // TransformMatrix
		},
		skewXgAt: function(degree, a, b){
			// summary:
			//		skews a picture along the x axis using a specified point as a center of skewing
			// description:
			//		Compare with skewXg().
			// degree: Number
			//		a skewing angle in degrees
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.skewXg(degree), a, b); // TransformMatrix
			}
			return this._sandwich(this.skewXg(degree), a.x, a.y); // TransformMatrix
		},
		skewYAt: function(angle, a, b){
			// summary:
			//		skews a picture along the y axis using a specified point as a center of skewing
			// description:
			//		Compare with skewY().
			// angle: Number
			//		a skewing angle in radians
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.skewY(angle), a, b); // TransformMatrix
			}
			return this._sandwich(this.skewY(angle), a.x, a.y); // TransformMatrix
		},
		skewYgAt: function(/* Number */ degree, /* Number||Point */ a, /* Number? */ b){
			// summary:
			//		skews a picture along the y axis using a specified point as a center of skewing
			// description:
			//		Compare with skewYg().
			// degree: Number
			//		a skewing angle in degrees
			// a: Number|dojox/gfx.Point
			//		an x component of a central point, or a central point
			// b: Number?
			//		a y component of a central point
			// returns: TransformMatrix
			if(arguments.length > 2){
				return this._sandwich(this.skewYg(degree), a, b); // TransformMatrix
			}
			return this._sandwich(this.skewYg(degree), a.x, a.y); // TransformMatrix
		}
	
	
	});

	return numerics.TransformMatrix = TransformMatrix;
});
