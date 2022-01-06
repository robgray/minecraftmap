using System;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Plumbing.Automapper
{
    public static class AutoMapperStartup
    {
        public static void AddCustomAutoMapper(this IServiceCollection services, params Type[] types) =>
            services.AddAutoMapper(types.Concat(new[] { typeof(Realm) }).ToArray());
    }
}