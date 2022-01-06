using MediatR;
using Microsoft.Extensions.DependencyInjection;
using MinecraftMapper.Mediator.Commands;

namespace MinecraftMapper.Plumbing.Mediator
{
    public static class MediatorStartup
    {
        public static void AddCustomMediator(this IServiceCollection services)
        {
            services.AddMediatR(typeof(ICommand));
            
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
        }
    }
}