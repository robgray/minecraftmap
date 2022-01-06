using System;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Entities;
using MinecraftMapper.Features.Realms.Models;
using MinecraftMapper.Features.Shared;
using MinecraftMapper.Mediator.Commands.Realms;
using MinecraftMapper.Mediator.Queries.Realms;
using MinecraftMapper.Requests;

namespace MinecraftMapper.Features.Realms
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class RealmController : BaseController
    {
        public RealmController(IMediator mediator, IMapper mapper) : base(mediator, mapper) { }
        
        [HttpGet(Name = "GetRealms")]
        [ProducesResponseType(typeof(RealmModel[]), StatusCodes.Status200OK)]
        public Task<IActionResult> Get() =>
            ExecuteQuery<GetAllRealmsQuery, RealmModel[]>();


        [HttpPost(Name = "AddRealm")]
        [ProducesResponseType(typeof(RealmModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Post([FromBody] NewRealmRequest newRealm)
        {
            var realm = await ExecuteMediatorRequest<AddRealmCommand, RealmModel>(newRealm);
            return Created(Url.RouteUrl("GetRealm", new { realmId = realm.Id }), realm);
        }

        [HttpGet("{realmId}", Name = "GetRealm")]
        [ProducesResponseType(typeof(RealmModel), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<IActionResult> Get([FromRoute] Guid realmId) =>
            ExecuteQuery<GetRealmByIdQuery, RealmModel>(realmId);

        [HttpDelete("{realmId}", Name = "DeleteRealm")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<IActionResult> Delete([FromRoute] Guid realmId) =>
            ExecuteCommand<DeleteRealmCommand>(realmId);

        [HttpPost("{realmId}/location", Name="AddLocation")]
        [ProducesResponseType(typeof(RealmModel), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PostLocation([FromRoute]Guid realmId, [FromBody] NewLocationRequest newLocationRequest)
        {
            var  realm = await ExecuteMediatorRequest<AddLocationCommand, RealmModel>(realmId, newLocationRequest);
            return Created(Url.RouteUrl("GetRealm", new {realmId}), realm);
        }

        [HttpDelete("{realmId}/location/{locationId}", Name = "DeleteLocation")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<IActionResult> DeleteLocation([FromRoute] Guid realmId, [FromRoute] Guid locationId) =>
            ExecuteCommand<DeleteLocationCommand>(new LocationIdentifierParams { RealmId = realmId, LocationId = locationId});


        [HttpPut("{realmId}/location/{locationId}", Name = "UpdateLocation")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<IActionResult> UpdateLocation(
            [FromRoute] Guid realmId,
            [FromRoute] Guid locationId,
            [FromBody] UpdateLocationRequest updateLocation) =>
            ExecuteCommand<UpdateLocationCommand>(new LocationIdentifierParams { RealmId = realmId, LocationId = locationId}, updateLocation);
    }
    
    public class LocationIdentifierParams
    {
        public Guid RealmId { get; set; }
        public Guid LocationId { get; set; }
    }
}