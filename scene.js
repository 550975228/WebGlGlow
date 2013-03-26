function Scene(sceneOrigin, width, height)
{
	this.Objects = [];

	this.addObject = function addObject(obj)
	{
		this.Objects.push(obj);
	}

	this.render = function render()
	{
		gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		
		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		
		mat4.identity(mvMatrix);

		for (var i=0; i < this.Objects.length; ++i)
		{
			this.Objects[i].render();
		}
	}
	
	this.update = function update()
	{
		for (var i=0; i < this.Objects.length; ++i)
		{
			this.Objects[i].update();
		}
	}

	this.initScene = function initScene()
	{
		var triangle = new Triangle(1,1);
		scene.addObject(triangle);
	
		var square = new Square(1,1);
		scene.addObject(square);
	}
	
}