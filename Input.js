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

    lastMousePos.x = newX
    lastMousePos.y = newY;
	
	//console.log(lastMousePos.x);
}  