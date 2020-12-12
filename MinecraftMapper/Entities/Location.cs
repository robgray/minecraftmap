using System;

namespace MinecraftMapper.Entities
{
    public class Location : EntityBase
    {
        public string Name { get; set; }
        public Coordinate Coordinate { get; set; }
        
        public LocationType Type { get; set; }
        public Guid TypeId { get; set; }
        
        public string Notes { get; set; }
        
        public Guid MapId { get; set; }
        public Map Map { get; set; }
    }
}