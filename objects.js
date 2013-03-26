
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
	this.Geometry.create(width, height);
	this.VertexPositionBuffer = createVertexBuffer(this.Geometry.vertices, 3);

}

function Square(width, height)
{
	this.Geometry = new SquareGeometry();
	this.Geometry.create(width, height);
	this.VertexPositionBuffer = createVertexBuffer(this.Geometry.vertices, 3);

}

var triangle;
var square;

var squareVertexPositionBuffer;

function initBuffers() 
{
	triangle = new Triangle(1,1);
	square = new Square(1,1);
}
	
function drawScene() 
{
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, [-1.5, 0.0, -7.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, triangle.VertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, triangle.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, triangle.VertexPositionBuffer.numItems);


    mat4.translate(mvMatrix, [3.0, 0.0, 0.0]);
    gl.bindBuffer(gl.ARRAY_BUFFER, square.VertexPositionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, square.VertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    setMatrixUniforms();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, square.VertexPositionBuffer.numItems);
}
