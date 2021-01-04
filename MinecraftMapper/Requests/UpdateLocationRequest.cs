using System;

namespace MinecraftMapper.Requests
{
    public class UpdateLocationRequest
    {
        public string Name { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
        public string Notes { get; set; }
        public Guid LocationTypeId { get; set; }
    }
}