function SquareGeometry()
{
    this.vertices = [];
    this.colors = [];

    this.create = function create(width, height, color)
         {
             var size = { x: width/2, y: height/2 };

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