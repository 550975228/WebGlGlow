
// generates the geometry for a sphere
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

                     this.vertices.push(new Vector3(radius * x, radius * y, radius * z));

                     this.Normals.push(new Vector3(x,y,z));
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

function SquareGeometry()
{
    this.vertices = [];
    this.colors = [];
	this.textureCoords = [];


    this.create = function create(width, height, color)
         {
             var size = { x: width/2, y: height/2 };

             this.vertices = [
                  size.x,  size.y,  0.0,
                 -size.x,  size.y,  0.0,
                  size.x, -size.y,  0.0,
                 -size.x, -size.y,  0.0
                 ];
				 
			this.textureCoords = [	   
			
				0.0, 0.0,
				1.0, 0.0,
				1.0, 1.0,
				0.0, 1.0
				
				];

             this.colors = []
             for (var i=0; i < 4; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         }
}

function QuadGeometry()
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

    this.create = function create(width, height, depth, color)
         {
             var size = { x: width/2, y: height/2, z: depth/2 };

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
				 -size.x, size.y,  -size.z,
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
			this.textureCoords = [	   
			
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

             this.colors = []
             for (var i=0; i < 24; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         }
}
// generate icosphere geometry ( http://blog.andreaskahler.com/2009/06/creating-icosphere-mesh-in-code.html )
function IcosphereGeometry()
{
    this.vertices = [];
    this.faces = [];

    this.midPointCache = {}

    this.addVertex = function addVertex(pos)
         {
             // normalize the position to make sure its mapped onto the unit sphere
             var idx = this.vertices.length;
             var unitPos = pos.normalize();

             this.vertices.push(unitPos);

             return idx;
         }

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
             for (var i=0; i<this.vertices.length; ++i)
             {
                 verts = verts.concat([this.vertices[i].x, this.vertices[i].y, this.vertices[i].z]);
             }
             return verts;
         }

    this.getMidPoint = function getMidPoint(p1, p2)
         {
             // build the integer key for lookup
             var smallerIdx = p1 < p2 ? p1 : p2;
             var greaterIdx = p1 < p2 ? p2 : p1;
             var key = (smallerIdx << 32) + greaterIdx;

             // check the cache
             if (this.midPointCache[key] !== undefined)
             {
                 return this.midPointCache[key];
             }

             // not in cache, create the new midpoint
             var v1 = this.vertices[p1];
             var v2 = this.vertices[p2];

             var v3 = new Vector3((v1.x + v2.x) * 0.5, (v1.y + v2.y) * 0.5, (v1.z + v2.z) * 0.5);

             var idx = this.addVertex(v3);
             this.midPointCache[key] = idx;

             return idx;
         }

    this.create = function create(recursionLevel)
         {
             var t = (1.0 + Math.sqrt(5.0)) / 2;

             // create 12 icosahedron vertices
             this.addVertex(new Vector3(-1,  t, 0));
             this.addVertex(new Vector3( 1,  t, 0));
             this.addVertex(new Vector3(-1, -t, 0));
             this.addVertex(new Vector3( 1, -t, 0));

             this.addVertex(new Vector3(0, -1,  t));
             this.addVertex(new Vector3(0,  1,  t));
             this.addVertex(new Vector3(0, -1, -t));
             this.addVertex(new Vector3(0,  1, -t));

             this.addVertex(new Vector3( t, 0, -1));
             this.addVertex(new Vector3( t, 0,  1));
             this.addVertex(new Vector3(-t, 0, -1));
             this.addVertex(new Vector3(-t, 0,  1));

             // create 20 icosahedron triangles
             this.faces.push([0, 5, 11]);
             this.faces.push([0, 1, 5]);
             this.faces.push([0, 7, 1]);
             this.faces.push([0, 10, 7]);
             this.faces.push([0, 11, 10]);

             this.faces.push([1, 9, 5]);
             this.faces.push([5, 4, 11]);
             this.faces.push([11, 2, 10]);
             this.faces.push([10, 6, 7]);
             this.faces.push([7, 8, 1]);

             this.faces.push([3, 4, 9]);
             this.faces.push([3, 2, 4]);
             this.faces.push([3, 6, 7]);
             this.faces.push([3, 8, 6]);
             this.faces.push([3, 9, 8]);

             this.faces.push([4, 5, 9]);
             this.faces.push([2, 11, 4]);
             this.faces.push([6, 10, 2]);
             this.faces.push([8, 7, 6]);
             this.faces.push([9, 1, 8]);


             // refine the triangles
             for (var level=0; level<recursionLevel; ++level)
             {
                 var orgFaces = this.faces.slice();

                 for (var i=0; i < orgFaces.length; ++i)
                 {
                     var tri = orgFaces[i];

                     var a = this.getMidPoint(tri[0], tri[1]);
                     var b = this.getMidPoint(tri[1], tri[2]);
                     var c = this.getMidPoint(tri[2], tri[0]);

                     this.faces.push([tri[0], c, a]);
                     this.faces.push([tri[1], a, b]);
                     this.faces.push([tri[2], b, c]);
                     this.faces.push([a, c, b]);
                 }
             }

         }
}
