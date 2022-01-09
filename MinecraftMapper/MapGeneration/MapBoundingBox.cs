using System.ComponentModel.DataAnnotations;

namespace MinecraftMapper.MapGeneration
{
    public class MapBoundingBox 
    {
        public MapBoundingBox(int topLeftX, int topLeftY, int bottomRightX, int bottomRightY) 
        {
            TopLeft = new MapCoordinate(topLeftX, topLeftY);
            BottomRight = new MapCoordinate(bottomRightX, bottomRightY);
        }
        [Required]
        public MapCoordinate TopLeft { get; set; }
        [Required]
        public MapCoordinate BottomRight { get; set; }

        [Required]
        public MapCoordinate TopRight => new MapCoordinate(BottomRight.X, TopLeft.Y);
        
        [Required]
        public MapCoordinate BottomLeft => new MapCoordinate(TopRight.X, BottomRight.Y);
	
        public bool ContainsCoordinate(MapCoordinate coordinate)
        {
            // In this coordinate system Y gets larger the further down (South) you go.
            return coordinate.X >= TopLeft.X 
                   && coordinate.X <= BottomRight.X 
                   && coordinate.Y >= TopLeft.Y 
                   && coordinate.Y <= BottomRight.Y;
        }

        public override string ToString() => $"{TopLeft},{BottomRight}";
    }
}