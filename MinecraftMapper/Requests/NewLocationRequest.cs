using System;

namespace MinecraftMapper.Requests
{
    public class NewLocationRequest
    {
        public string Name { get; set; }
        public int X { get; set; }
        public int Z { get; set; }
        public int Y { get; set; }
        public Guid LocationTypeId { get; set; }
    }
}