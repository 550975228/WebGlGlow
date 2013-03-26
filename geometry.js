function SquareGeometry()
{
    this.vertices = [];

    this.create = function create(width, height, color)
         {
             var size = { x: width, y: height };

             this.vertices = [
                  size.x,  size.y,  0.0,
                 -size.x,  size.y,  0.0,
                  size.x, -size.y,  0.0,
                 -size.x, -size.y,  0.0
                 ];
				 
			this.colors = []
             for (var i=0; i < 4; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         }
}

function TriangleGeometry()
{
	this.vertices = [];
	
	this.create = function create(width, height, color, rgb)
         {
             var size = { x: width, y: height };

             this.vertices = [
                  size.x,  -size.y,  0.0,
                 -size.x, -size.y,  0.0,
					   0, size.y,  0.0
				  
                 ];
				 
			if (rgb)
			this.colors = [ 1.0, 0.0, 0.0, 1.0,0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,];
			else
			this.colors = []
             for (var i=0; i < 4; i++)
             {
                 this.colors = this.colors.concat(color);
             }
         
         }
	
}
