namespace MinecraftMapper.Domain.MapGeneration
{
    public class MapBoundingBox 
    {
        public MapBoundingBox(int topLeftX, int topLeftY, int bottomRightX, int bottomRightY) 
        {
            TopLeft = new MapCoordinate(topLeftX, topLeftY);
            BottomRight = new MapCoordinate(bottomRightX, bottomRightY);
        }
        public MapCoordinate TopLeft { get; set; }
        public MapCoordinate BottomRight { get; set; }

        public MapCoordinate TopRight => new MapCoordinate(BottomRight.X, TopLeft.Y);
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