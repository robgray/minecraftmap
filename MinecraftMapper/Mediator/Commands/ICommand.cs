using MediatR;

namespace MinecraftMapper.Mediator.Commands
{
    public interface ICommand : IRequest { }

    public interface ICommand<out TResponse> : IRequest<TResponse> { }

    public interface ICommandHandler<in TCommand> : IRequestHandler<TCommand> where TCommand : IRequest<Unit> { }

    public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, TResponse> where TCommand : IRequest<TResponse> { }
}
