using System.ComponentModel.DataAnnotations;

namespace MinecraftMapper.Features.Realms.Models
{
    public class CoordinateModel
    {
        [Required]
        public int X { get; set; }
        [Required]
        public int Z { get; set; }
        [Required]
        public int Y { get; set; }
    }
}