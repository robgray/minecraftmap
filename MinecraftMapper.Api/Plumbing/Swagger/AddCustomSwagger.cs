using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using NSwag;

namespace MinecraftMapper.Api.Plumbing.Swagger
{
    public static class SwaggerStartup
    {
        public static void AddCustomSwagger(this IServiceCollection services)
        {
            services.AddSwaggerDocument();
        }

        public static void ConfigureCustomSwagger(this IApplicationBuilder app)
        {
            app.UseOpenApi();
            app.UseSwaggerUi3();
        }
    }
}