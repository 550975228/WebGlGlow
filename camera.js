

// create a camera with perspective projection
function Camera(fov, width, height, nearPlane, farPlane)
{
    this.PerspectiveMatrix = new Matrix4();
    this.PerspectiveMatrix.makePerspective(fov, width / height, nearPlane, farPlane);

    this.Position = new Vector3();

    this.update = function Update(deltaTime)
         {
         }
}
