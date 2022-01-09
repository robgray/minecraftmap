using System;
using System.ComponentModel.DataAnnotations;
using MinecraftMapper.Features.LocationTypes.Models;

namespace MinecraftMapper.Features.Realms.Models
{
    public class RealmModel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public LocationModel[] Locations { get; set; }
        [Required]
        public LocationTypeModel Type { get; set; }
        
    }
}