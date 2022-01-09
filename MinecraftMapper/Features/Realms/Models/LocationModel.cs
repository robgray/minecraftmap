using System;
using System.ComponentModel.DataAnnotations;
using MinecraftMapper.Entities;
using MinecraftMapper.Features.LocationTypes.Models;

namespace MinecraftMapper.Features.Realms.Models
{
    public class LocationModel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public int MapNumber { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public CoordinateModel Coordinate { get; set; }
        [Required]
        public string Notes { get; set; }
        [Required]
        public LocationTypeModel Type { get; set; }
        [Required]
        public Guid TypeId { get; set; }
        [Required]
        public Guid RealmId { get; set; }
        [Required]
        public bool HasPortal { get; set; }
        [Required]
        public bool HasEnderChest { get; set; }
        [Required]
        public bool HasEnchantmentTable { get; set; }
        [Required]
        public bool HasBed { get; set; }
        [Required]
        public bool HasAnvil { get; set; }
        [Required]
        public bool HasFurnace { get; set; }
    }
}