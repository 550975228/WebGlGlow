
function Scene(sceneOrigin, width, height)
{
    this.SceneSize = new Vector3(width, height, 0.0);
    this.SceneOrigin = sceneOrigin;
    this.Camera = null;

    this.Objects = [];

    // updates all objects of the scene
    this.update = function update(deltaTime)
         {
             for (var i=0; i < this.Objects.length; ++i)
             {
                 this.Objects[i].update(deltaTime);
             }
         }

    // returns the center of the scene
    this.getCenter = function getCenter()
         {
             return new Vector3(this.SceneOrigin.x + this.SceneSize.x/2, this.SceneOrigin.y + this.SceneSize.y/2, 0);
         }

    // adds an object to the scene
    this.addObject = function addObject(obj)
         {
             this.Objects.push(obj);
         }


    // renders all objects
    this.render = function render()
         {
             gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
             gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

             for (var i=0; i < this.Objects.length; ++i)
             {
                 this.Objects[i].render();
             }
         }

    // creates a level and populates it with blocks, paddle and ball
    this.createLevel = function createLevel()
        {
             // margin between the blocks and the screen bounds
             var MARGIN = 10;
			 
			 cube = new Block(60,60,60, [1,1,1,1]);
             cube.Position.x = this.SceneOrigin.x + this.SceneSize.x / 2;
             cube.Position.y = this.SceneOrigin.y + 20;
             cube.Position.z = this.SceneOrigin.z;
             scene.addObject(cube);
        }
}