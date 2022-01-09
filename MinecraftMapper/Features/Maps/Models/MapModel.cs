using System.ComponentModel.DataAnnotations;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Features.Maps.Models
{
    public class MapModel
    {
        [Required]
        public int MapNumber { get; set; }
        [Required]
        public int RingNumber { get; set; }
        [Required]
        public MapBoundingBox Bounds { get; set; }
        
    }
}