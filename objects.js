

// helper function to create a vertex buffer out of the provided array
function createVertexBuffer(dataArray, itemSize)
{
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataArray), gl.STATIC_DRAW);
    vertexBuffer.itemSize = itemSize;
    vertexBuffer.numItems = dataArray.length / itemSize;

    return vertexBuffer;
}

// helper function to create a index buffer out of the provided array
function createIndexBuffer(indicesArray)
{
    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicesArray), gl.STATIC_DRAW);
    indexBuffer.itemSize = 1;
    indexBuffer.numItems = indicesArray.length;

    return indexBuffer;
}

function createTextureCoordBuffer (dataArray, itemSize)
{
	var textureCoordsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordsBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(dataArray), gl.STATIC_DRAW);
    textureCoordsBuffer.itemSize = itemSize;
    textureCoordsBuffer.numItems = dataArray.length / itemSize;

return textureCoordsBuffer;
}


function clamp(val, min, max)
{
    return Math.min(Math.max(val, min), max);
}

// functions used by all objects

// returns the world-view matrix for this object
function object_GetTransform()
{
	//var cameraMatrix = new Matrix4();
    var transformMatrix = new Matrix4();
    //cameraMatrix.translate(camera.Position.clone().negate());
	transformMatrix.compose(this.Position, this.Rotation, this.Scale);
    
	//transformMatrix.multiply(cameraMatrix, transformMatrix);
	
    return transformMatrix;
}

// renders an object that has only vertex-data (without index buffer)
function object_RenderVBOnly()
{
	shaderManager.activateShader(this.shader);
	//gl.useProgram(this.shader);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPosBuffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.VertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);

    if (this.VertexColorBuffer !== undefined)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
	
	/*if (this.TextureCoordBuffer !== undefined)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
		gl.vertexAttribPointer(this.shader.textureCoordAttribute, this.TextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.Texture);
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		
		gl.uniform1i(this.shader.samplerUniform, 0);
		
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPosBuffer);

	}*/

    var mat = this.getTransform();
    setMatrixUniforms(mat,this.shader);

    gl.drawArrays(this.PrimitiveType, 0, this.VertexPosBuffer.numItems);
}

// renders an object that has vertex and index buffers inplace
function object_RenderIndexed()
{	
	shaderManager.activateShader(this.shader);
	//gl.useProgram(this.shader);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPosBuffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttribute, this.VertexPosBuffer.itemSize, gl.FLOAT, false, 0, 0);

    if (this.VertexColorBuffer !== undefined)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(this.shader.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
	
	if (this.TextureCoordBuffer !== undefined && this.shader.textureCoordAttribute >= 0)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.TextureCoordBuffer);
		gl.vertexAttribPointer(this.shader.textureCoordAttribute, this.TextureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, this.Texture );
		
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		
		gl.uniform1i(this.shader.samplerUniform, 0);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPosBuffer);

	}
	
	if (this.VertexNormalBuffer != undefined && this.shader.vertexNormalAttribute >= 0)
	{
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexNormalBuffer);
		gl.vertexAttribPointer(this.shader.vertexNormalAttribute, this.VertexNormalBuffer.itemSize, gl.FLOAT,false, 0, 0);
	}
	
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
            gl.enable(gl.BLEND);
            gl.disable(gl.DEPTH_TEST);
            gl.uniform1f(this.shader.alphaUniform, parseFloat(0.5));
     
			gl.uniform1i(this.shader.useLightingUniform, true);
            gl.uniform3f(
                this.shader.ambientColorUniform,
                parseFloat(0.2),
                parseFloat(0.2),
                parseFloat(0.2)
            );

            var lightingDirection = [
                parseFloat(-0.25),
                parseFloat(-0.25),
                parseFloat(-1.0)
            ];
            var adjustedLD = vec3.create();
            vec3.normalize(lightingDirection, adjustedLD);
            vec3.scale(adjustedLD, -1);
            gl.uniform3fv(this.shader.lightingDirectionUniform, adjustedLD);

            gl.uniform3f(
                this.shader.directionalColorUniform,
                parseFloat(0.8),
                parseFloat(0.8),
                parseFloat(0.8)
            );
      

    if (this.IndexBuffer !== undefined)
    {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IndexBuffer);
    }
	var normalMatrix = new Matrix4();
	normalMatrix.setRotationFromQuaternion(this.Rotation);
	
    var mat = this.getTransform();
    setMatrixUniforms(mat,this.shader,normalMatrix.getInverse(normalMatrix));
    gl.drawElements(this.PrimitiveType, this.IndexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

// Block
function Block(width, height, depth, color)
{
    this.Position = new Vector3();
    this.Rotation = new Quaternion();
    this.Scale = new Vector3(1,1,1);

    this.Color = [ 1.0, 1.0, 1.0, 1.0 ];
	this.TextureName = ["cubeTexture01.gif"];
	this.Texture = getTexture("cubeTexture01.gif");
	
	this.shader = shaderManager.getShader("shader-fs", "shader-vs");
	
    // create the geometry
    this.Geometry = new QuadGeometry();
    this.Geometry.create(width, height, depth, color);

    // setup the opengl buffers
    this.VertexPosBuffer = createVertexBuffer(this.Geometry.vertices, 3);
    this.VertexColorBuffer = createVertexBuffer(this.Geometry.colors, 4);
	this.IndexBuffer = createIndexBuffer(this.Geometry.faces);
	this.VertexNormalBuffer = createVertexBuffer(this.Geometry.Normals, 3);
	this.TextureCoordBuffer = createTextureCoordBuffer(this.Geometry.textureCoords,2);
    this.PrimitiveType = gl.TRIANGLES;

    this.Health = 1;
	
	this.rot = 0;
    this.getTransform = object_GetTransform;
    this.render = object_RenderIndexed;
	//this.render = function(){};
    this.update = function Block_Update(deltaTime)
         {
			this.rot += 0.1*deltaTime;
			this.Rotation.setFromAxisAngle(new Vector3(0,1,0), degToRad(this.rot));
         };
}

// Ball
function Ball(size, color)
{
    this.Position = new Vector3();
    this.Rotation = new Quaternion();
    this.Scale = new Vector3(1,1,1);

    this.Velocity = new Vector3(0, 1, 0);
    this.Speed = 1.0;
	
	this.shader = shaderManager.getShader("shader-fs", "shader-vs");

    this.Color = color;
	this.TextureName =["Ball.jpg"];
	this.Texture = getTexture("Ball.jpg");

    var sphere = new SphereGeometry();
    sphere.create(30, 30, size);
    this.Geometry = sphere;

    var vertexData = sphere.getVertexData();
    var colors = [];
    for (var i=0; i<sphere.vertices.length; ++i)
    {
        colors = colors.concat(color);
    }

    this.VertexPosBuffer = createVertexBuffer(vertexData, 3);
    this.VertexColorBuffer = createVertexBuffer(colors, 4);
	this.IndexBuffer = createIndexBuffer(this.Geometry.faces);
	this.VertexNormalBuffer = createVertexBuffer(this.Geometry.Normals, 3);
	this.TextureCoordBuffer = createTextureCoordBuffer(this.Geometry.textureCoords,2);
    this.IndexBuffer = createIndexBuffer(sphere.getIndexData());
    this.PrimitiveType = gl.TRIANGLES;


    this.getTransform = object_GetTransform;
    this.render = object_RenderIndexed;
	//this.render = function(){};
    this.update = function UpdateBall(deltaTime)
         {
			
             var posOffset = this.Velocity.clone();
             posOffset.multiplyScalar(this.Speed * deltaTime);
			 
			 lightPos.x = this.Position.x;
			 lightPos.y = this.Position.y;
			 
             this.Position.addSelf(posOffset);
			
			 
			 if (this.Position.y >= gl.viewportHeight || this.Position.y <= 0 ){
			 
				this.Velocity.y *= -1;
			 
			 }
			 
			 if (this.Position.x >= gl.viewportWidth || this.Position.x <= 0 )
			 {
			 
				this.Velocity.x *= -1;
			 
			 }
			 
         }
}


function SceneBounds(origin, size)
{
    this.Position = new Vector3(0,0,0);
    this.Rotation = new Quaternion();
    this.Scale = new Vector3(1,1,1);
	
	this.shader = shaderManager.getShader("shader-fs2", "shader-vs2");
	

    var vertices = [
                origin.x, origin.y, origin.z,
                origin.x + size.x, origin.y, origin.z,

                origin.x + size.x, origin.y, origin.z,
                origin.x + size.x, origin.y + size.y, origin.z,

                origin.x + size.x, origin.y + size.y, origin.z,
                origin.x, origin.y + size.y, origin.z,

                origin.x, origin.y + size.y, origin.z,
                origin.x, origin.y, origin.z,
            ]

    var colors = [
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
                1.0, 0.2, 0.2, 1.0,
            ]

    this.VertexPosBuffer = createVertexBuffer(vertices, 3);
    this.VertexColorBuffer = createVertexBuffer(colors, 4);
    this.PrimitiveType = gl.LINES;

    this.getTransform = object_GetTransform;
    this.render = object_RenderVBOnly;
    this.update = function UpdateGizmo(deltaTime)
         {

         }
}
