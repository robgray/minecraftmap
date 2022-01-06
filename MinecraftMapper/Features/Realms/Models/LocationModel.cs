using System;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Features.Realms.Models
{
    public class LocationModel
    {
        public int MapNumber { get; set; }
        public string Name { get; set; }
        public CoordinateModel Coordinate { get; set; }
        public string Notes { get; set; }
        
        public LocationType Type { get; set; }
        public Guid TypeId { get; set; }

        public Guid RealmId { get; set; }
        
        public bool HasPortal { get; set; }
        public bool HasEnderChest { get; set; }
        public bool HasEnchantmentTable { get; set; }
        public bool HasBed { get; set; }
        public bool HasAnvil { get; set; }
        public bool HasFurnace { get; set; }
    }
}