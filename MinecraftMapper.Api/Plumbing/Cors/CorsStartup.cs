using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MinecraftMapper.Api.Plumbing.Cors
{
    public static class CorsStartup
    {
        public static void AddCustomCors(this IServiceCollection services, IConfiguration configuration)
        {
            var allowedOrigins = configuration["AllowedHosts"];
            services.AddCors(options => options.AddDefaultPolicy(builder => builder.WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod()));
        }

        public static void ConfigureCustomCors(this IApplicationBuilder app)
        {
            app.UseCors();
        }
    }
}