using System;

namespace MinecraftMapper.Controllers.Models
{
    public class RealmModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public LocationModel[] Locations { get; set; }
        public LocationTypeModel Type { get; set; }
        
    }
}