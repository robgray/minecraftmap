using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain;

namespace MinecraftMapper.Api.Features.LocationType
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationTypesController : ControllerBase
    {
        private readonly MapperContext _context;
        public LocationTypesController(MapperContext context)
        {
            _context = context;
        }
        
        [HttpGet("")]
        [ProducesResponseType(typeof(Domain.Entities.LocationType), StatusCodes.Status200OK)]
        public async Task<ActionResult<Domain.Entities.LocationType>> Get()
        {
            return Ok(await _context.LocationTypes.AsNoTracking()
                .Select(l => new LocationTypeModel
                {
                    Id = l.Id.Value, 
                    IconClass = l.IconClass, 
                    Name = l.Name
                })
                .OrderBy(l => l.Name)
                .ToListAsync()
            );
        }
    }
}