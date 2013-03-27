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
	var animateOn= false;
	
	function checkColorBox()
	{
		var colorbox = document.getElementById("Color").checked;
		
		if(colorbox==true && colorOn == false )
		{
			if(textureOn)
			{
				
				document.getElementById("Infobox").value = "Uncheck the 'Textures & Color'! ";
				colorbox = document.getElementById("Color").checked= false;
			}
			else
			{
				document.getElementById("Infobox").value = "Color ON!";
				colorOn = true;
				compileShaders("color-vs","color-fs");
				textureOn = false;
			}
		}
		else if(colorbox==false && colorOn == true )
		{
			document.getElementById("Infobox").value = "Color OFF!";
			colorOn = false;
			compileShaders("standart-vs","standart-fs");
			checkTextureBox()
		}
	}
	
	
	function checkTextureBox()
	{
		var textureBox = document.getElementById("Texture").checked;
		
		if(textureBox==true && textureOn == false )
		{
			document.getElementById("Infobox").value = "Textures ON!";
			textureOn = true;
			compileShaders("texture-vs","texture-fs");
			colorOn = false;
			colorbox = document.getElementById("Color").checked= false;
		}
		else if(textureBox==false && textureOn == true )
		{
			document.getElementById("Infobox").value = "Textures OFF!";
			textureOn = false;
			compileShaders("standart-vs","standart-fs");
		}
	}
	
		function checkAnimateBox()
	{
		var animateBox = document.getElementById("Animate").checked;
		
		if(animateBox==true && animateOn == false )
		{
			document.getElementById("Infobox").value = "Animation ON!";
			animateOn = true;
		}
		else if(animateBox==false && animateOn == true )
		{
			document.getElementById("Infobox").value = "Animation OFF!";
			animateOn = false;
		}
	}
	
	function checkBoxes()
	{
	
		var real3D = document.getElementById("Real3D").checked;
		
		checkColorBox();
		checkTextureBox();
		checkAnimateBox();
		
		if (real3D ==true && real3DOn == false )
		{
			document.getElementById("Infobox").value = "3D ON!";
			real3DOn = true;
			activate3D();
		}
		else if( real3D ==false && real3DOn == true)
		{	
			document.getElementById("Infobox").value = "3D OFF!";
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
	
	var textureManager;
	var shaderManager;
	
	  function webGLStart() 
	{
		var colorbox = document.getElementById("Color").checked;
		
		var textureBox = document.getElementById("Texture").checked;
		
        var canvas = document.getElementById("canvas");
        initGL(canvas);
		
		textureManager = new TextureManager();
		shaderManager = new ShaderManager();
		
		checkColorBox();
		checkTextureBox();
		
		initScene();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        tick();
    }