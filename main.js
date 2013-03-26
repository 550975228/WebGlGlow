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
	
	  function webGLStart() 
	{
        var canvas = document.getElementById("canvas");
        initGL(canvas);
		initShaders();
		initScene();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        scene.render();
    }