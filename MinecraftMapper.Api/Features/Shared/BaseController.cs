using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Api.Extensions;

namespace MinecraftMapper.Api.Features.Shared
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

        protected async Task<TMappedResult> ExecuteQuery<TCommand, TMappedResult>(params object[] models) where TCommand : new()
        {
            return await ExecuteMediatorRequest<TCommand, TMappedResult>(models);
        }

        protected async Task<IActionResult> ExecuteCommand<TCommand>(params object[] models)
        {
            var command = MapperExtensions.Map<TCommand>(Mapper, models);
            await Mediator.Send(command);
            return NoContent();
        }

        protected async Task<TMappedResult> ExecuteCommand<TCommand, TMappedResult>(params object[] models) where TCommand : new()
        {
            return await ExecuteMediatorRequest<TCommand, TMappedResult>(models);
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