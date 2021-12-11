using Microsoft.Extensions.DependencyInjection;
using MinecraftMapper.Domain.Entities;

namespace MinecraftMapper.Api.Plumbing.Automapper
{
    public static class AutomapperStartup
    {
        public static void AddCustomAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(
                typeof(Startup), // API
                typeof(Realm)  // Domain
            );
        }
    }
}