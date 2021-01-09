using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace MinecraftMapper.Entities
{
    public class Location : EntityBase
    {
        public int MapNumber { get; set; }
        public string Name { get; set; }
        public Coordinate Coordinate { get; set; }
        public string Notes { get; set; }
        
        public LocationType Type { get; set; }
        public Guid TypeId { get; set; }

        public Guid RealmId { get; set; }
        public Realm Realm { get; set; }
        
        public bool HasPortal { get; set; }
        public bool HasEnderChest { get; set; }
        public bool HasEnchantmentTable { get; set; }
        public bool HasBed { get; set; }
        public bool HasAnvil { get; set; }
        public bool HasFurnace { get; set; }
    }
}