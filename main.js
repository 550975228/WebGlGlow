var gl;
var real3DOn = false;
var textureOn = false;
var colorOn = false;
var animateOn = false;
var controlsOn = false;

var xRot = 0;
var xSpeed = 0;

var yRot = 0;
var ySpeed = 0;

var z = -5.0;
var filter = 0;

var currentlyPressedKeys = {};

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

  function handleKeyDown(event) 
  {
    currentlyPressedKeys[event.keyCode] = true;
	
	if (String.fromCharCode(event.keyCode) == "F") {
            filter += 1;
            if (filter == 3) {
                filter = 0;
            }
        }
  }
  
  function handleKeyUp(event) 
  {
    currentlyPressedKeys[event.keyCode] = false;
  }
	function handleKeys() 
	{
		if (currentlyPressedKeys[33]) 
		{
		  // Page Up
		  z -= 0.05;
		}
		if (currentlyPressedKeys[34]) 
		{
		  // Page Down
		  z += 0.05;
		}
		if (currentlyPressedKeys[37]) 
		{
		  // Left cursor key
		  ySpeed -= 1;
		}
		if (currentlyPressedKeys[39]) 
		{
		  // Right cursor key
		  ySpeed += 1;
		}
		if (currentlyPressedKeys[38]) 
		{
		  // Up cursor key
		  xSpeed -= 1;
		}
		if (currentlyPressedKeys[40]) 
		{
		  // Down cursor key
		  xSpeed += 1;
		}
  }
  
    function tick() 
	{	
		checkBoxes();
		
		if (controlsOn)
		handleKeys();
		
		timeNow = new Date().getTime();
        requestAnimFrame(tick);
        scene.render();
        scene.update();
		lastTime = timeNow;
    }
		
	function checkColorBox()
	{
		var colorbox = document.getElementById("Color").checked;
		
		if(colorbox==true && colorOn == false )
		{
			if(textureOn)
			{
				document.getElementById("Texture").checked= false;
			}
			
				document.getElementById("Infobox").value = "Color ON!";
				colorOn = true;
				compileShaders("color-vs","color-fs");
				textureOn = false;
			
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
	
	function checkControlsBox()
	{
		var controlsBox = document.getElementById("Controls").checked;
		
		if(controlsBox==true && controlsOn == false )
		{
			document.getElementById("Infobox").value = "Controls ON!";
			
			xSpeed = 0;
			ySpeed = 0;

			controlsOn = true;
			animateBox = document.getElementById("Animate").checked = false;
		}
		else if(controlsBox==false && controlsOn == true )
		{
			document.getElementById("Infobox").value = "Controls OFF!";
			controlsOn = false;
		}
	}
	
	function checkAnimateBox()
	{
		var animateBox = document.getElementById("Animate").checked;
		
		if(animateBox==true && animateOn == false )
		{
			if (controlsOn == true)
			{
				document.getElementById("Controls").checked = false;
			}
			
				document.getElementById("Infobox").value = "Animation ON!";
				
				xSpeed = 0;
				ySpeed = 50;
				
				if(scene)
				scene.reset();
				
				filter=0;
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
		checkControlsBox();
		
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
		
		document.onkeydown = handleKeyDown;
		document.onkeyup = handleKeyUp;

        tick();
    }