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
		var color = document.getElementById("Color").checked;
		
		timeNow = new Date().getTime();
		
		if(color)
		compileShaders("color-vs","color-fs");
		else
		compileShaders("standart-vs","standart-fs");
		
        requestAnimFrame(tick);
        scene.render();
        scene.update();
		lastTime = timeNow;
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