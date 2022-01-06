using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Features.Maps.Models
{
    public class MapModel
    {
        public int MapNumber { get; set; }
        public int RingNumber { get; set; }
        public MapBoundingBox Bounds { get; set; }
        
    }
}