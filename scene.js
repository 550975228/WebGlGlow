function Scene(sceneOrigin, width, height)
{
	this.Objects = [];

	this.addObject = function addObject(obj)
	{
		this.Objects.push(obj);
	}
	
	this.removeObject = function removeObject()
	{
		delete this.Objects.pop();
	}
	
		this.empytObjectArray = function empytObjectArray()
	{
		for (var i=0; i < this.Objects.length; ++i)
		{
			if(this.Objects[i].Light !=true)
			var lightExists = true;
			
			delete this.Objects[i];
		}
		
		if(lightExists = true)
		{
			var sphere = new Sphere(1);
			scene.addObject(sphere);
		}
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
	
	this.reset = function reset()
	{
		for (var i=0; i < this.Objects.length; ++i)
		{
			this.Objects[i].Rotation = [0,0];
			this.Objects[i].Translate[2] = -5;
		}
	}
	
	this.removeLight = function removeLight()
	{
		for (var i=0; i < this.Objects.length; ++i)
		{
			if(this.Objects[i].Light)
			this.Objects.splice(i);
		}
	}
	
	this.addLight = function addLight()
	{
		for (var i=0; i < this.Objects.length; ++i)
		{
			if(this.Objects[i].Light)
			var lightExists = true;
		}
		
		if (lightExists != true)
		{
			var sphere = new Sphere(1);
			scene.addObject(sphere);
		}
	}

	this.initScene = function initScene()
	{
		var triangle = new Triangle(1,1);
		scene.addObject(triangle);
	
		var square = new Square(1,1);
		scene.addObject(square);
		
		var sphere = new Sphere(1);
		scene.addObject(sphere);

	}
	
}