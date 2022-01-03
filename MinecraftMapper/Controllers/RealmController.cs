using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;
using MinecraftMapper.MapGeneration;
using MinecraftMapper.Requests;

namespace MinecraftMapper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RealmController : ControllerBase
    {
        private MapperContext _context;
        private IMapNumberGenerator _mapNumberGenerator;
        public RealmController(MapperContext context, IMapNumberGenerator mapNumberGenerator)
        {
            _context = context;
            _mapNumberGenerator = mapNumberGenerator;
        }

        protected IQueryable<Realm> Realms => _context.Realms.Include(m => m.Locations).ThenInclude(l => l.Type);

        [HttpGet(Name="GetRealms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            var map = await _context.Realms.Select(m => new {m.Id, m.Name}).ToListAsync();
            return Ok(map);
        }

        [HttpPost(Name="AddRealm")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post(
            [FromBody]NewRealmRequest newRealm
        )
        {
            if (await _context.Realms.AnyAsync(r => r.Name == newRealm.Name))
            {
                return BadRequest($"Realm called '{newRealm.Name}' already exists.  Name must be unique.");
            }
            
            var realm = new Realm()
            {
                Name = newRealm.Name
            };

            await _context.Realms.AddAsync(realm);
            await _context.SaveChangesAsync();
            
            return Created(Url.RouteUrl("Realm", new { realmId = realm.Id}), realm);
        }

        [HttpGet("{realmId}", Name = "GetRealm")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Get(
            [FromRoute] Guid realmId
        )
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

        private void SetMapNumber(Realm realm)
        {
            foreach (var location in realm.Locations)
            {
                location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);
            }
        }

        [HttpDelete("{realmId}", Name = "DeleteRealm")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(
            [FromRoute] Guid realmId
        )
        {
            var realm = await Realms.FirstOrDefaultAsync(r => r.Id == realmId);
            if (realm == null)
                return NotFound();

            foreach (var location in realm.Locations)
            {
                realm.Remove(location);
                _context.Remove(location);
            }

            _context.Realms.Remove(realm);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("{realmId}/location", Name="AddLocation")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostLocation(
            [FromRoute]Guid realmId, 
            [FromBody] NewLocationRequest newLocation
        )
        {
            var realm = await Realms
                .FirstOrDefaultAsync(r => r.Id == realmId);
            
            if (realm == null)
                return NotFound();

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
                TypeId = newLocation.LocationTypeId,
                HasAnvil = newLocation.HasAnvil,
                HasBed = newLocation.HasBed,
                HasPortal = newLocation.HasPortal,
                HasEnchantmentTable = newLocation.HasEnchantmentTable,
                HasFurnace = newLocation.HasFurnace,
                HasEnderChest = newLocation.HasEnderChest,
                Notes = newLocation.Notes
            };
            realm.Add(location);
            await _context.SaveChangesAsync();

            SetMapNumber(realm);

            return Created(Url.RouteUrl("Realm", new {realmId}), realm);
        }
        
        [HttpDelete("{realmId}/location/{locationId}", Name="DeleteLocation")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteLocation(
            [FromRoute]Guid realmId, 
            [FromRoute]Guid locationId
        )
        {
            var realm = await Realms
                .FirstOrDefaultAsync(r => r.Id == realmId);
            if (realm == null)
                return NotFound($"Realm with Id={realmId} not found");

            var location = realm.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location != null)
            {
                realm.Remove(location);
                _context.Remove(location);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }

        [HttpPut("{realmId}/location/{locationId}", Name="UpdateLocation")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateLocation(
            [FromRoute]Guid realmId, 
            [FromRoute]Guid locationId, 
            [FromBody] UpdateLocationRequest updateLocation)
        {
            var realm = await Realms
                .FirstOrDefaultAsync(x => x.Id == realmId);
            if (realm == null)
                return NotFound($"Realm with Id={realmId} not found");
            
            var location = realm.Locations.FirstOrDefault(l => l.Id == locationId);
            if (location == null) return NotFound("Location to update could not be found.  Nothing to update");
            
            location.Name = updateLocation.Name;
            location.Notes = updateLocation.Notes;
            location.HasAnvil = updateLocation.HasAnvil;
            location.HasBed = updateLocation.HasBed;
            location.HasPortal = updateLocation.HasPortal;
            location.HasEnchantmentTable = updateLocation.HasEnchantmentTable;
            location.HasFurnace = updateLocation.HasFurnace;
            location.HasEnderChest = updateLocation.HasEnderChest;
            location.TypeId = updateLocation.LocationTypeId;
            
            location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);

            await _context.SaveChangesAsync();

            location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);
            return Ok(location);
        }
    }
}