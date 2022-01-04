using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Controllers.Models;
using MinecraftMapper.Features.Shared;
using MinecraftMapper.Mediator.Queries;
using MinecraftMapper.Mediator.Queries.LocationTypes;

namespace MinecraftMapper.Features.LocationTypes
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class LocationTypesController : BaseController
    {
        public LocationTypesController(IMediator mediator, IMapper mapper) : base(mediator, mapper){ }

        [HttpGet("", Name = "GetLocationTypes")]
        [ProducesResponseType(typeof(LocationTypeModel[]), StatusCodes.Status200OK)]
        public Task<IActionResult> Get() => 
            ExecuteQuery<GetLocationTypesQuery, LocationTypeModel[]>();
    }
}