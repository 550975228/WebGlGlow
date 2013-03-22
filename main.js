
var gl;
var shaderProgram;
var scene;
var camera;
var lastTime = 0;
var haloTexture;
var shaderManager=new ShaderManager();
var lightPos = {x: 0, y:0};



  /*
    function getTexture(TextureName) 
	
	{
	var uniqueTexture;
	
    uniqueTexture = gl.createTexture();
	uniqueTexture.image = new Image();
    uniqueTexture.image.onload = function() {
      handleLoadedTexture(uniqueTexture)
    }

    uniqueTexture.image.src = TextureName;
	return uniqueTexture;
  }
*/
  function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.generateMipmap(gl.TEXTURE_2D);
	
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, false ? gl.CLAMP_TO_EDGE : gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, false ? gl.CLAMP_TO_EDGE : gl.REPEAT);
	
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
  
  
function degToRad(degrees)
{
    return degrees * Math.PI / 180;
}

function initGL(canvas)
{
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    }
    catch (e)
    {
    }

    if (!gl)
    {
        alert("Could not initialise WebGL, sorry :-(");
    }
}


function getShader(gl, id)
{
    var shaderScript = document.getElementById(id);
    if (!shaderScript)
    {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k)
    {
        if (k.nodeType == 3)
        {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;

    if (shaderScript.type == "x-shader/x-fragment")
    {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
    else if (shaderScript.type == "x-shader/x-vertex")
    {
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
    else
    {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function compileShaders(vertexShaderName, fragmentShaderName)
{
    var fragmentShader = getShader(gl, fragmentShaderName);
    var vertexShader = getShader(gl, vertexShaderName);

    var shader = gl.createProgram();
    gl.attachShader(shader, vertexShader);
    gl.attachShader(shader, fragmentShader);
    gl.linkProgram(shader);

    if (!gl.getProgramParameter(shader, gl.LINK_STATUS))
    {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shader);
	
	/*for(var i=0;i<5;i++)
	{
		gl.enableVertexAttribArray(i);
	};*/

    shader.vertexPositionAttribute = gl.getAttribLocation(shader, "aVertexPosition");
    //gl.enableVertexAttribArray(shader.vertexPositionAttribute);
	
		console.log("Pos:",shader.vertexPositionAttribute);
	
    shader.vertexColorAttribute = gl.getAttribLocation(shader, "aVertexColor");
    //gl.enableVertexAttribArray(shader.vertexColorAttribute);
	
		console.log("Vex:",shader.vertexColorAttribute);
		
	shader.textureCoordAttribute = gl.getAttribLocation(shader, "aTextureCoord");
    //gl.enableVertexAttribArray(shader.textureCoordAttribute);
	
	
		console.log("Tex:",shader.textureCoordAttribute);

	shader.vertexNormalAttribute = gl.getAttribLocation(shader, "aVertexNormal");
	//gl.enableVertexAttribArray(shader.vertexNormalAttribute);
	
		console.log("Nor:",shader.vertexNormalAttribute);

    shader.pMatrixUniform = gl.getUniformLocation(shader, "uPMatrix");
    shader.mvMatrixUniform = gl.getUniformLocation(shader, "uMVMatrix");
	shader.nMatrixUniform = gl.getUniformLocation(shader, "nVMatrix");
	
	shader.lightPosUniform = gl.getUniformLocation(shader, "uLightPos");

    return shader;
}

function setMatrixUniforms(modelMatrix, shader, normalMatrix)
{
	if (normalMatrix)
	{
		gl.uniformMatrix4fv(shader.nMatrixUniform, false, normalMatrix.elements);
	}
	var cameraMatrix = new Matrix4();
	cameraMatrix.translate(camera.Position.clone().negate());
	cameraMatrix.multiply(camera.PerspectiveMatrix,cameraMatrix);

    gl.uniformMatrix4fv(shader.pMatrixUniform, false, cameraMatrix.elements);
    gl.uniformMatrix4fv(shader.mvMatrixUniform, false, modelMatrix.elements);
	//console.log("lightPosUniform",shader.lightPosUniform);
	if(shader.lightPosUniform&&lastMousePos.x!=0)
	{
		//console.log("smx",lastMousePos.x);
		gl.uniform3fv(shader.lightPosUniform, [lightPos.x, lightPos.y, 30]); 
	};
}

function tick()
{
    requestAnimFrame(tick);

    var deltaTime = 0;
    var timeNow = new Date().getTime();
    if (lastTime != 0)
    {
        deltaTime = timeNow - lastTime;
    }
    lastTime = timeNow;

    scene.update(deltaTime);
    scene.render();
}

var mouseDown = false;
var lastMousePos = { x: 0, y: 0 };

function handleMouseDown(event)
{
    mouseDown = true;
    lastMousePos.x = event.clientX;
    lastMousePos.y = event.clientY;
}

function handleMouseUp(event)
{
    mouseDown = false;
}

function handleMouseMove(event)
{
    if (!mouseDown)
    {
        return;
    }

    var newX = event.clientX;
    var newY = event.clientY;

    var deltaX = newX - lastMousePos.x
    var deltaY = newY - lastMousePos.y

    paddle.Speed = deltaX;
	
	//camera.Position.x += deltaX;

    lastMousePos.x = newX
    lastMousePos.y = newY;
	
	//console.log(lastMousePos.x);
}

function webGLStart()
{
    // get the canvas element from the HTML
    var canvas = document.getElementById("canvas");

    initGL(canvas);
	TextureManager();
	
	
	//manager = new ShaderManager();


    // compile the vertex and pixel shaders
    //shaderProgram = compileShaders("shader-fs", "shader-vs");

    // setup the perspective camera
    camera = new Camera(60, gl.viewportWidth, gl.viewportHeight, 0.1, 10000.0);

    // create the scene
    scene = new Scene(new Vector3(0,0,0), gl.viewportWidth, gl.viewportHeight);
    scene.Camera = camera;
    scene.createLevel(10, 6);

    // set the camera position to the scene center but offset it so that the entire
    // scene is visible
    var sceneCenter = scene.getCenter();
    camera.Position = sceneCenter;
    camera.Position.z += 420;

    // attach mouse callbacks
    canvas.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;
    document.onmousemove = handleMouseMove;

    // set the clear color and enable depth testing
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    tick();
}
