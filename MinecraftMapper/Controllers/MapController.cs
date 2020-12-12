using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;
using MinecraftMapper.Requests;

namespace MinecraftMapper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : ControllerBase
    {
        private MapContext _context;
        public MapController(MapContext context)
        {
            _context = context;
        }

        protected IQueryable<Map> Maps => _context.Maps.Include(m => m.Locations).ThenInclude(l => l.Type);

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var map = await _context.Maps.Select(m => new {m.Id, m.Name}).ToListAsync();
            return Ok(map);
        }

        [HttpPost]
        public async Task<IActionResult> Post(NewMapRequest newMap)
        {
            if (await _context.Maps.AnyAsync(m => m.Name == newMap.Name))
            {
                return BadRequest($"Map called '{newMap.Name}' already exists.  Name must be unique.");
            }
            
            var map = new Map()
            {
                Name = newMap.Name
            };

            await _context.Maps.AddAsync(map);
            await _context.SaveChangesAsync();
            
            return Created(Url.RouteUrl("Map", new { mapId = map.Id}), map);
        }

        [HttpGet("{mapId}", Name="Map")]
        public async Task<IActionResult> Get(Guid mapId)
        {
            var map = await Maps
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.Id == mapId);
            if (map == null)
                return NotFound();

            return Ok(map);
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(Guid mapId)
        {
            var map = await Maps.FirstOrDefaultAsync(m => m.Id == mapId);
            if (map == null)
                return NotFound();

            foreach (var location in map.Locations)
            {
                map.Remove(location);
                _context.Remove(location);
            }

            _context.Maps.Remove(map);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{mapId}/location")]
        public async Task<IActionResult> PostLocation(Guid mapId, [FromBody] NewLocationRequest newLocation)
        {
            var map = await Maps
                .Include(m => m.Locations)
                .ThenInclude(l => l.Type)
                .FirstOrDefaultAsync(m => m.Id == mapId);
            
            if (map == null)
                return NotFound();

            var location = new Location()
            {
                Name = newLocation.Name,
                Coordinate = new Coordinate()
                {
                    X = newLocation.X,
                    Z = newLocation.Z,
                    Y = newLocation.Y,
                },
                TypeId = newLocation.LocationTypeId
            };
            map.Add(location);
            await _context.SaveChangesAsync();

            return Created(Url.RouteUrl("Map", new {mapId}), map);
        }
        
        [HttpDelete("{mapId}/location/{locationId}")]
        public async Task<IActionResult> DeleteLocation(Guid mapId, Guid locationId)
        {
            var map = await Maps
                .Include(l => l.Locations)
                .FirstOrDefaultAsync(m => m.Id == mapId);
            if (map == null)
                return NotFound($"Map with Id={mapId} not found");

            var location = map.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location != null)
            {
                map.Remove(location);
                _context.Remove(location);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }
    }
}