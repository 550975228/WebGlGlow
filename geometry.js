function SquareGeometry()
{
    this.vertices = [];

    this.create = function create(width, height)
         {
             var size = { x: width, y: height };

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
             var size = { x: width, y: height };

             this.vertices = [
                  size.x,  -size.y,  0.0,
                 -size.x, -size.y,  0.0,
				0, size.y,  0.0
				  
                 ];

         }
	
}
