using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Extensions;

namespace MinecraftMapper.Features.Shared
{
    public class BaseController : ControllerBase
    {
        protected readonly IMapper Mapper;
        protected readonly IMediator Mediator;

        public BaseController(IMediator mediator, IMapper mapper)
        {
            Mediator = mediator;
            Mapper = mapper;
        }

        protected async Task<IActionResult> ExecuteQuery<TCommand, TMappedResult>(params object[] models) where TCommand : new()
        {
            return Ok(await ExecuteMediatorRequest<TCommand, TMappedResult>(models));
        }

        protected async Task<IActionResult> ExecuteCommand<TCommand>(params object[] models)
        {
            var command = MapperExtensions.Map<TCommand>(Mapper, models);
            await Mediator.Send(command);
            return NoContent();
        }

        protected async Task<IActionResult> ExecuteCommand<TCommand, TMappedResult>(params object[] models) where TCommand : new()
        {
            return Ok(await ExecuteMediatorRequest<TCommand, TMappedResult>(models));
        }

        private async Task<TMappedResult> ExecuteMediatorRequest<TRequest, TMappedResult>(params object[] models) where TRequest : new()
        {
            var command = models != null && models.Any() ? MapperExtensions.Map<TRequest>(Mapper, models) : new TRequest();
            var result = await Mediator.Send(command);
            var mappedResult = MapperExtensions.Map<TMappedResult>(Mapper, result);

            return mappedResult;
        }
    }
}