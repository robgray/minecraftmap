using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace MinecraftMapper.Plumbing.Mediator
{
    public static class MediatorStartup
    {
        public static void AddCustomMediator(this IServiceCollection services)
        {
            services.AddMediatR(configuration => configuration.RegisterServicesFromAssemblyContaining<Program>());
            
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));
        }
    }
}