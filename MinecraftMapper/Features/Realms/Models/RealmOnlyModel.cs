using System;
using System.ComponentModel.DataAnnotations;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Features.Realms.Models
{
    public class RealmOnlyModel
    {
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public long Seed { get; set; }
        [Required]
        public CoordinateModel RespawnLocation { get; set; }
    }
}