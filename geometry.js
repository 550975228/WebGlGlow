function SquareGeometry()
{
    this.vertices = [];

    this.create = function create(width, height, color)
         {
             var size = { x: width, y: height };

             this.vertices = [
                  size.x,  size.y,  0.0,
                 -size.x,  size.y,  0.0,
                  size.x, -size.y,  0.0,
                 -size.x, -size.y,  0.0
                 ];
				 
			this.textureCoords = 
			 [	
				0.0, 1.0,
				1.0, 1.0,
				0.0, 0.0,
				1.0, 0.0
			 ];
				 
			this.colors = []
             for (var i=0; i < 4; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         }
}

function TriangleGeometry()
{
	this.vertices = [];
	this.textureCoords = [];
	
	this.create = function create(width, height, color, rgb)
         {
             var size = { x: width/2, y: height/2 };

             this.vertices = 
			 [
			 
                size.x,  -size.y,  0.0,
                -size.x, -size.y,  0.0,
				0, size.y,  0.0
				  
             ];
			 
			 this.textureCoords = 
			 [
				-1.0, 0.0,
				-1.0, 1.0,
				 0.0, 0.5
			 ];
				
			if (rgb)
			this.colors = [ 1.0, 0.0, 0.0, 1.0,0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,];
			else
			this.colors = []
             for (var i=0; i < 4; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         
         }
	
}

function CubeGeometry()
{
    this.vertices = [];
    this.colors = [];
	this.textureCoords = [];
	this.faces = [];
	
	    this.getIndexData = function getIndexData()
         {
             var indices = [];
             for (var i=0; i<this.faces.length; ++i)
             {
                 indices = indices.concat(this.faces[i]);
             }
             return indices;
         }
		 
		   this.getVertexData = function getVertexData()
         {
             var verts = [];
             for (var i=0; i < this.vertices.length; ++i)
             {
                 var v = this.vertices[i];

                 verts = verts.concat([v.x, v.y, v.z]);
             }
             return verts;
         }

    this.create = function create(width, height, depth)
         {
             var size = { x: width, y: height, z: depth };

             this.vertices = [
			 
                 //Front
				 -size.x, -size.y,  size.z,
                  size.x, -size.y,  size.z,
                  size.x,  size.y,  size.z,
                 -size.x,  size.y,  size.z,
				 //Back
				 -size.x, -size.y,  -size.z,
                 -size.x,  size.y,  -size.z,
                  size.x,  size.y,  -size.z,
                  size.x, -size.y,  -size.z,
				 
				 //Top
				 -size.x, size.y,  -size.z,
				  -size.x, size.y,  size.z,
				  size.x, size.y,   size.z,
				  size.x, size.y,  -size.z,
				  
				  //Bottom
				 -size.x, -size.y,  -size.z,
				  size.x, -size.y,  -size.z,
				  size.x, -size.y,   size.z,
				 -size.x, -size.y,   size.z,
				  
				  //Right
				  size.x, -size.y,  -size.z,
				  size.x,  size.y,  -size.z,
				  size.x,  size.y,   size.z,
				  size.x, -size.y,   size.z,
				  
				  //Left
				 -size.x, -size.y,  -size.z,
				 -size.x, -size.y,   size.z,
				 -size.x,  size.y,   size.z,
				 -size.x,  size.y,  -size.z
				 
                 ];
				 this.faces = [
				 
					 0, 1, 2,      0, 2, 3,    // Front face
					 4, 5, 6,      4, 6, 7,    // Back face
					 8, 9, 10,     8, 10, 11,  // Top face
					 12, 13, 14,   12, 14, 15, // Bottom face
					 16, 17, 18,   16, 18, 19, // Right face
					 20, 21, 22,   20, 22, 23  // Left face		
				 ]
				 
				this.textureCoords = 
				[	   
			
				  0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				
				 // Back face
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,

				  // Top face
				  0.0, 1.0,
				  0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,

				  // Bottom face
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,
				  1.0, 0.0,

				  // Right face
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0,

				  // Left face
				  0.0, 0.0,
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0
				
				];
				
			this.Normals = [
			// Front face
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,
			0.0,  0.0,  1.0,

			// Back face
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,
			0.0,  0.0, -1.0,

			// Top face
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,
			0.0,  1.0,  0.0,

			// Bottom face
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,
			0.0, -1.0,  0.0,

			// Right face
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,
			1.0,  0.0,  0.0,

			// Left face
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0,
			-1.0,  0.0,  0.0,
			];

            var color = [
			[1.0, 0.0, 0.0, 1.0], // Front face
            [1.0, 1.0, 0.0, 1.0], // Back face
            [0.0, 1.0, 0.0, 1.0], // Top face
            [1.0, 0.5, 0.5, 1.0], // Bottom face
            [1.0, 0.0, 1.0, 1.0], // Right face
            [0.0, 0.0, 1.0, 1.0]  // Left face]
			];
			
			for (var i in color) {
            var colorr = color[i];
            for (var j=0; j < 4; j++) {
                this.colors = this.colors.concat(colorr);
            }
        }
         }
}

function PyramidGeometry()
{
    this.vertices = [];
    this.colors = [];
	this.textureCoords = [];
	
	    this.getIndexData = function getIndexData()
         {
             var indices = [];
             for (var i=0; i<this.faces.length; ++i)
             {
                 indices = indices.concat(this.faces[i]);
             }
             return indices;
         }
		 
		   this.getVertexData = function getVertexData()
         {
             var verts = [];
             for (var i=0; i < this.vertices.length; ++i)
             {
                 var v = this.vertices[i];

                 verts = verts.concat([v.x, v.y, v.z]);
             }
             return verts;
         }

    this.create = function create(width, height, depth)
         {
             var size = { x: width/2, y: height/2, z: depth/2 };

             this.vertices = 
			[
			 
                 //Front
					0.0, size.y,  0.0,
                  -size.x, -size.y,  size.z,
                  size.x,  -size.y,  size.z,  
				  
				 // Right face
				 0.0, size.y,  0.0,
                 size.x,  -size.y,  size.z,
                  size.x,  -size.y,  -size.z,
				 
				// Back face
				 0.0, size.y,  0.0,
				  size.x, -size.y,  -size.z,
				  -size.x, -size.y,   -size.z,
				  
				  // Left face
				 0.0, size.y,  0.0,
				  -size.x, -size.y,  -size.z,
				  -size.x, -size.y,   size.z,
				  
				   // Bottom 1
				 -size.x, -size.y,  -size.z,
				  size.x, -size.y,  -size.z,
				  size.x, -size.y,   size.z,
				  
				    // Bottom 2
				 -size.x, -size.y,  -size.z,
				 -size.x, -size.y,   size.z,
				 size.x, -size.y,   size.z
				  
				
				 
            ];
			
			this.textureCoords = 
			[	   
				
				  0.0, 0.0,
				  0.5, 1.0,
				 -0.5, 1.0,
				
				 // Back face
				 0.0, 0.0,
				  0.5, 1.0,
				 -0.5, 1.0,

				  // Top face
				 0.0, 0.0,
				  0.5, 1.0,
				 -0.5, 1.0,

				  // Right face
				  0.0, 0.0,
				  0.5, 1.0,
				 -0.5, 1.0,

				  // Left face
				   0.0, 0.0,
				  0.5, 1.0,
				 -0.5, 1.0,
				 
				  // Bottom face
				  1.0, 0.0,
				  1.0, 1.0,
				  0.0, 1.0,
				  0.0, 0.0
				  
				
				
			];

            this.colors = [
			 // Front face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

            // Right face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,

            // Back face
            1.0, 0.0, 0.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,

            // Left face
            1.0, 0.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
			
			// Bottom 1
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0,
			
			// Bottom 2
            0.0, 0.0, 1.0, 1.0,
            0.0, 1.0, 0.0, 1.0,
            0.0, 0.0, 1.0, 1.0
			
			];
		
        }
}


function SphereGeometry()
{
    this.vertices = [];
    this.Normals = [];
    this.textureCoords = [];

    this.faces = [];

    // returns the face indices
    this.getIndexData = function getIndexData()
         {
             var indices = [];
             for (var i=0; i<this.faces.length; ++i)
             {
                 indices = indices.concat(this.faces[i]);
             }
             return indices;
         }

    // returns the vertex position data
    this.getVertexData = function getVertexData()
         {
             var verts = [];
             for (var i=0; i < this.vertices.length; ++i)
             {
                 var v = this.vertices[i];

                 verts = verts.concat([v.x, v.y, v.z]);
             }
             return verts;
         }

    this.create = function create(latitudeBands, longitudeBands, radius)
         {
             for (var lat=0; lat <= latitudeBands; ++lat)
             {
                 var theta = lat * Math.PI / latitudeBands;
                 var sinTheta = Math.sin(theta);
                 var cosTheta = Math.cos(theta);

                 for (var lon=0; lon <= longitudeBands; ++lon)
                 {
                     var phi = lon * 2.0 * Math.PI / longitudeBands;
                     var sinPhi = Math.sin(phi);
                     var cosPhi = Math.cos(phi);

                     var x = cosPhi * sinTheta;
                     var y = cosTheta;
                     var z = sinPhi * sinTheta;
                     var u = 1.0 - (lon / longitudeBands);
                     var v = 1.0 - (lat / latitudeBands);

                     this.vertices.push(radius * x, radius * y, radius * z);

                     //this.Normals.push(x,y,z);
                     this.textureCoords.push(u);
                     this.textureCoords.push(v);
                 }
             }

             for (lat=0; lat < latitudeBands; ++lat)
             {
                 for (lon=0; lon < longitudeBands; ++lon)
                 {
                     var first = (lat * longitudeBands ) + lon;
                     var second = first + longitudeBands + 1;

                     this.faces.push([first, second, first + 1]);
                     this.faces.push([second, second + 1, first + 1]);
                 }
             }
         }
}




