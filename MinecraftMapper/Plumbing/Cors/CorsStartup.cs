using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MinecraftMapper.Plumbing.Cors
{
    public static class CorsStartup
    {
        public static void AddCustomCors(this IServiceCollection services)
        {
            services.AddCors(options => options.AddPolicy("ConfiguredCors", builder => 
                builder.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));
        }

        public static void ConfigureCustomCors(this IApplicationBuilder app)
        {
            app.UseCors("ConfiguredCors");
        }
    }
}