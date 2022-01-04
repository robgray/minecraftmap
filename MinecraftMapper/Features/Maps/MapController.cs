using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Controllers.Models;
using MinecraftMapper.Features.Shared;
using MinecraftMapper.Mediator.Queries;
using MinecraftMapper.Mediator.Queries.Maps;

namespace MinecraftMapper.Features.Maps
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class MapController : BaseController
    {
        public MapController(IMediator mediator, IMapper mapper) : base(mediator, mapper) { }

        [HttpGet("{maximumRingNumber:int}", Name = "GetMaps")]
        [ProducesResponseType(typeof(MapModel[]), StatusCodes.Status200OK)]
        public Task<IActionResult> Get([FromRoute] int maximumRingNumber) =>
            ExecuteQuery<GetMapsQuery, MapModel[]>(maximumRingNumber);
    }
}