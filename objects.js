
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

function Triangle(width, height)
{
	this.Geometry = new TriangleGeometry();
	this.Color = [ 1.0, 0.0, 1.0, 1.0 ];
	this.Geometry.create(width, height, this.Color,true);
	this.VertexPositionBuffer = createVertexBuffer(this.Geometry.vertices, 3);
	this.VertexColorBuffer = createVertexBuffer(this.Geometry.colors, 4);
	this.PrimitiveType = gl.TRIANGLES;
	this.render = drawScene;
	this.Translate = [-1.5, 0.0, -7.0];
}

function Square(width, height)
{
	this.Geometry = new SquareGeometry();
	this.Color = [ 0.0, 1.0, 1.0, 1.0 ];
	this.Geometry.create(width, height, this.Color);
	this.VertexPositionBuffer = createVertexBuffer(this.Geometry.vertices, 3);
	this.VertexColorBuffer = createVertexBuffer(this.Geometry.colors, 4);
	this.PrimitiveType = gl.TRIANGLE_STRIP;
	this.render = drawScene;
	this.Translate = [3.0, 0.0, 0.0];
}

var scene;

function initScene() 
{
	scene = new Scene();
	scene.initScene();
}
	
function drawScene() 
{		
	gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	if (this.VertexColorBuffer !== undefined)
    {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VertexColorBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, this.VertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    }
	
	mat4.translate(mvMatrix, this.Translate);
	setMatrixUniforms();
    gl.drawArrays(this.PrimitiveType,0,this.VertexPositionBuffer.numItems);
}
