var gl;

    function initGL(canvas) 
	{
        try 
		{
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } 
		catch (e) {}
        if (!gl) 
		{
            alert("Could not initialise WebGL, sorry :-(");
        }
    }
	
	function degToRad(degrees) 
	{
        return degrees * Math.PI / 180;
    }
	
	var timeNow = new Date().getTime();
	
    function tick() 
	{
		timeNow = new Date().getTime();
		checkBoxes();
        requestAnimFrame(tick);
        scene.render();
        scene.update();
		lastTime = timeNow;
    }
	
	var real3DOn = false;
	
	function checkBoxes()
	{
	
		var color = document.getElementById("Color").checked;
		var real3D = document.getElementById("Real3D").checked;
		
		if(color)
		compileShaders("color-vs","color-fs");
		else
		compileShaders("standart-vs","standart-fs");
		
		
		if (real3D ==true && real3DOn == false )
		{
			console.log("3dON");
			real3DOn = true;
			activate3D();
		}
		else if( real3D ==false && real3DOn == true)
		{	
			console.log("3dOFF");
			real3DOn = false;
			deactivate3D();
		}
			
	}

	function activate3D()
	{
		scene.removeObject();
		scene.removeObject();
			
		var pyramid = new Pyramid(1,1,1);
		scene.addObject(pyramid);
			
		var cube = new Cube(1,1,1);
		scene.addObject(cube);
	}
	
	function deactivate3D()
	{
		scene.removeObject();
		scene.removeObject();
			
		var triangle = new Triangle(1,1);
		scene.addObject(triangle);
	
		var square = new Square(1,1);
		scene.addObject(square);

	}
	
	  function webGLStart() 
	{
		var color = document.getElementById("Color").checked;
		
        var canvas = document.getElementById("canvas");
        initGL(canvas);
		if(color)
		compileShaders("color-vs","color-fs");
		else
		compileShaders("standart-vs","standart-fs");
		
		
		initScene();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
    }