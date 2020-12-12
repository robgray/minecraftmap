using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MinecraftMapper.Entities
{
    public class Map : EntityBase
    {
        private ICollection<Location> _locations;

        public Map()
        {
            _locations = new List<Location>();
        }
        
        [Required]
        [MaxLength(200)]
        public string Name { get; set; }
        
        public Coordinate RespawnLocation { get; set; }

        public IEnumerable<Location> Locations => _locations;

        public void Add(Location location)
        {
            if (location.Id == Guid.Empty)
            {
                location.Map = this;
                location.MapId = this.Id;

                _locations.Add(location);
                return;
            }
            
            if (location.MapId != this.Id)
            {
                throw new Exception("Cannot add to a location for another map");
            }
            
            if (_locations.All(l => l.Id != location.Id))
            {
                _locations.Add(location);
            }
        }

        public void Remove(Location location)
        {
            if (_locations.All(l => l.Id != location.Id)) return;
            _locations.Remove(location);
                
            location.Map = null;
            location.MapId = Guid.Empty;
        }
    }
}