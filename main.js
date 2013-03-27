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
	
	{	checkBoxes();
		timeNow = new Date().getTime();
        requestAnimFrame(tick);
        scene.render();
        scene.update();
		lastTime = timeNow;
    }
	
	var real3DOn = false;
	var textureOn = false;
	var colorOn = false;
	
	function checkBoxes()
	{
	
		var colorbox = document.getElementById("Color").checked;
		var real3D = document.getElementById("Real3D").checked;
		var textureBox = document.getElementById("Texture").checked;
		
		if(colorbox==true && colorOn == false )
		{
			console.log("Color ON");
			colorOn = true;
			compileShaders("color-vs","color-fs");
		}
		else if(colorbox==false && colorOn == true )
		{
			console.log("Color OFF");
			colorOn = false;
			compileShaders("standart-vs","standart-fs");
		}
		
		if(textureBox == true && textureOn == false )
		{
			console.log("Texture ON");
			textureOn = true;
		}
		else if(textureBox == false && textureOn == true )
		{
			console.log("Texture OFF");
			textureOn = false;
		}
		
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
		var colorbox = document.getElementById("Color").checked;
		
		var textureBox = document.getElementById("Texture").checked;
		
        var canvas = document.getElementById("canvas");
        initGL(canvas);
		
		var textureManager = new TextureManager();
		var shaderManager = new ShaderManager();
		
		if(colorbox==true && colorOn == false )
		{
			console.log("Color ON");
			colorON = true;
			compileShaders("color-vs","color-fs");
		}
		else if(colorbox==false && colorOn == true )
		{
			console.log("Color OFF");
			colorON = false;
			compileShaders("standart-vs","standart-fs");
		}
		
		if(textureBox == true && textureOn == false )
		{
			console.log("Texture ON");
			textureOn = true;
		}
		else if(textureBox == false && textureOn == true )
		{
			console.log("Texture OFF");
			textureOn = false;
		}
		
		initScene();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
    }