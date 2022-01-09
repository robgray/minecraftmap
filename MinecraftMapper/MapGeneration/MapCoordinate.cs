using System.ComponentModel.DataAnnotations;

namespace MinecraftMapper.MapGeneration
{
    public class MapCoordinate 
    {
        public MapCoordinate(int x, int y) 
        {
            X = x;
            Y = y;
        }
        [Required]
        public int X { get; set; }
        [Required]
        public int Y { get; set; }

        public override string ToString() => $"({X},{Y})";
    }
}