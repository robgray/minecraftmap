using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MinecraftMapper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LocationTypesController : ControllerBase
    {
        private MapperContext _context;
        public LocationTypesController(MapperContext context)
        {
            _context = context;
        }
        
        [HttpGet("", Name="GetLocationTypes")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.LocationTypes.AsNoTracking().Select(l => new { l.Id, l.IconClass, l.Name}).OrderBy(l => l.Name).ToListAsync());
        }
    }
}