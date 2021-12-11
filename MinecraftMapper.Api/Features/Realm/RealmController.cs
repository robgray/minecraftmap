using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Api.Requests;
using MinecraftMapper.Domain;
using MinecraftMapper.Domain.Entities;
using MinecraftMapper.Domain.MapGeneration;

namespace MinecraftMapper.Api.Features.Realm
{
    [ApiController]
    [Route("api/[controller]")]
    public class RealmController : ControllerBase
    {
        private readonly MapperContext _context;
        private readonly IMapNumberGenerator _mapNumberGenerator;
        public RealmController(MapperContext context, IMapNumberGenerator mapNumberGenerator)
        {
            _context = context;
            _mapNumberGenerator = mapNumberGenerator;
        }

        private IQueryable<Domain.Entities.Realm> Realms => _context.Realms.Include(m => m.Locations).ThenInclude(l => l.Type);
        private IQueryable<Domain.Entities.LocationType> LocationTypes => _context.LocationTypes;

        [HttpGet]
        public async Task<ActionResult<IList<Domain.Entities.Realm>>> Get()
        {
            var map = await _context.Realms.Select(m => new {m.Id, m.Name}).ToListAsync();
            return Ok(map);
        }

        [HttpPost]
        public async Task<IActionResult> Post(NewRealmRequest newRealm)
        {
            if (await _context.Realms.AnyAsync(r => r.Name == newRealm.Name))
            {
                return BadRequest($"Realm called '{newRealm.Name}' already exists.  Name must be unique.");
            }
            
            var realm = new Domain.Entities.Realm()
            {
                Name = newRealm.Name
            };

            await _context.Realms.AddAsync(realm);
            await _context.SaveChangesAsync();
            
            return Created(Url.RouteUrl("Realm", new { realmId = realm.Id}), realm);
        }

        [HttpGet("{realmId}", Name="Realm")]
        public async Task<ActionResult<Domain.Entities.Realm>> Get(Guid realmId)
        {
            var realm = await Realms
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == realmId);
            if (realm == null)
                return NotFound();
            
            // Overwrite all, for now.
            SetMapNumber(realm);
            return Ok(realm);
        }

        private void SetMapNumber(Domain.Entities.Realm realm)
        {
            foreach (var location in realm.Locations)
            {
                location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);
            }
        }

        [HttpDelete("{realmId}")]
        public async Task<IActionResult> Delete(Guid realmId)
        {
            var realm = await Realms.FirstOrDefaultAsync(r => r.Id == realmId);
            if (realm == null)
                return NotFound();

            foreach (var location in realm.Locations)
            {
                realm.RemoveLocation(location);
                _context.Remove(location);
            }

            _context.Realms.Remove(realm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{realmId}/location")]
        public async Task<IActionResult> PostLocation(Guid realmId, [FromBody] NewLocationRequest newLocation)
        {
            var realm = await Realms
                .FirstOrDefaultAsync(r => r.Id == realmId);
            
            if (realm == null)
                return NotFound();

            var locationType = await LocationTypes.FirstOrDefaultAsync(l => l.Id == newLocation.LocationTypeId);
            if (locationType == null)
            {
                return BadRequest(new { Message = "Missing Location Type" });
            }

            var coordinate = new Coordinate
            {
                X = newLocation.X,
                Z = newLocation.Z,
                Y = newLocation.Y
            };

            var location = new Location
            {
                MapNumber = -1,
                Name = newLocation.Name,
                Coordinate = coordinate,
                HasAnvil = newLocation.HasAnvil,
                HasBed = newLocation.HasBed,
                HasPortal = newLocation.HasPortal,
                HasEnchantmentTable = newLocation.HasEnchantmentTable,
                HasFurnace = newLocation.HasFurnace,
                HasEnderChest = newLocation.HasEnderChest,
                Type = locationType,
                Notes = newLocation.Notes
            };
            realm.AddLocation(location);
            await _context.SaveChangesAsync();

            SetMapNumber(realm);

            return Created(Url.RouteUrl("Realm", new {realmId}), realm);
        }
        
        [HttpDelete("{realmId}/location/{locationId}")]
        public async Task<IActionResult> DeleteLocation(Guid realmId, Guid locationId)
        {
            var realm = await Realms
                .FirstOrDefaultAsync(r => r.Id == realmId);
            if (realm == null)
                return NotFound($"Realm with Id={realmId} not found");

            var location = realm.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location != null)
            {
                realm.RemoveLocation(location);
                _context.Remove(location);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpPut("{realmId}/location/{locationId}")]
        public async Task<IActionResult> UpdateLocation(Guid realmId, Guid locationId, UpdateLocationRequest updateLocation)
        {
            var realm = await Realms
                .FirstOrDefaultAsync(x => x.Id == realmId);
            if (realm == null)
                return NotFound($"Realm with Id={realmId} not found");
            
            var location = realm.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location == null) return NotFound("Location to update could not be found.  Nothing to update");
            
            location.Name = updateLocation.Name;
            location.Coordinate.X = updateLocation.X;
            location.Coordinate.Y = updateLocation.Y;
            location.Coordinate.Z = updateLocation.Z;
            location.Notes = updateLocation.Notes;
            location.HasAnvil = updateLocation.HasAnvil;
            location.HasBed = updateLocation.HasBed;
            location.HasPortal = updateLocation.HasPortal;
            location.HasEnchantmentTable = updateLocation.HasEnchantmentTable;
            location.HasFurnace = updateLocation.HasFurnace;
            location.HasEnderChest = updateLocation.HasEnderChest;
            
            //leave until we're confident the coordinate offset is correct.
            //location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);

            await _context.SaveChangesAsync();

            location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);
            return Ok(location);
        }
    }
}