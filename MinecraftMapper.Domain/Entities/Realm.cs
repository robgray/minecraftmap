using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MinecraftMapper.Domain.Entities
{
    public class Realm : EntityBase
    {
        private readonly ICollection<Location> _locations;
        public Realm()
        {
            _locations = new List<Location>();
        }
        
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
        
        public long Seed { get; set; }
        
        public GameEdition Edition { get; set; }
        
        public Coordinate RespawnLocation { get; set; }

        public IEnumerable<Location> Locations => _locations;

        public void AddLocation(Location location)
        {
            if (location.Realm?.Id == Id)
            {
                return;
            }
            
            if (location.Realm != null)
            {
                throw new Exception("Cannot add a location already assigned to a different Realm");
            }

            if (location.Id == null)
            {
                location.Realm = this;
                _locations.Add(location);
                return;
            }
            
            if (_locations.All(l => l.Id != location.Id))
            {
                _locations.Add(location);
            }
        }

        public void RemoveLocation(Location location)
        {
            if (_locations.All(l => l.Id != location.Id)) return;
            _locations.Remove(location);
                
            location.Realm = null;
        }
    }
}