function SquareGeometry()
{
    this.vertices = [];

    this.create = function create(width, height)
         {
             var size = { x: width/2, y: height/2 };

             this.vertices = [
                  size.x,  size.y,  0.0,
                 -size.x,  size.y,  0.0,
                  size.x, -size.y,  0.0,
                 -size.x, -size.y,  0.0
                 ];
         }
}

function TriangleGeometry()
{
	this.vertices = [];
	
	this.create = function create(width, height)
         {
             var size = { x: width/2, y: height/2 };

             this.vertices = [
                  size.x,  size.y,  0.0,
                  size.x, -size.y,  0.0,
                 -size.x, -size.y,  0.0
                 ];

         }
	
}
