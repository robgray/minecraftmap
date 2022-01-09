using System;

namespace MinecraftMapper.Requests
{
    public class UpdateLocationRequest : IHasThings
    {
        public string Name { get; set; }
        public string Notes { get; set; }
        public Guid LocationTypeId { get; set; }
        
        public bool HasPortal { get; set; }
        public bool HasEnderChest { get; set; }
        public bool HasEnchantmentTable { get; set; }
        public bool HasBed { get; set; }
        public bool HasAnvil { get; set; }
        public bool HasFurnace { get; set; }
    }
}