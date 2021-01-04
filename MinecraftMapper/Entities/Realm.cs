using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace MinecraftMapper.Entities
{
    /// <summary>
    /// Represents a Minecraft Realm, which is composed of individual Maps
    /// (e.g. Maps a player generates at a cartography table)
    /// and of individual Locations.
    /// </summary>
    public class Realm : EntityBase
    {
        private ICollection<Location> _locations;
        private ICollection<Map> _maps;
        public Realm()
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
                location.Realm = this;
                location.MapId = this.Id;

                _locations.Add(location);
                return;
            }
            
            if (location.MapId != this.Id)
            {
                throw new Exception("Cannot add to a location for another Realm");
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
                
            location.Realm = null;
            location.MapId = Guid.Empty;
        }
    }
}