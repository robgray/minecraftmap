using MinecraftMapper.Domain.MapGeneration;

namespace MinecraftMapper.Api.Models
{
    public class MapModel
    {
        public int MapNumber { get; set; }
        public int RingNumber { get; set; }
        public MapBoundsModel Bounds { get; set; } = new();
    }

    public class MapBoundsModel
    {
        public MapCoordinate TopLeft { get; set; }
        public MapCoordinate TopRight { get; set; }
        public MapCoordinate BottomRight { get; set; }
        public MapCoordinate BottomLeft { get; set; }
    }
}