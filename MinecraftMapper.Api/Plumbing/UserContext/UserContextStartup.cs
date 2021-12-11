using System;
using Microsoft.Extensions.DependencyInjection;
using MinecraftMapper.Api.Services;

namespace MinecraftMapper.Api.Plumbing.UserContext
{
    public static class UserContextStartup
    {
        public static void AddCustomUserContext(this IServiceCollection services)
        {
            services.AddScoped<IUserContext, Services.UserContext>();
            
            services.AddScoped(provider => new Lazy<IUserContext>(provider.GetService<IUserContext>));
        }
    }
}