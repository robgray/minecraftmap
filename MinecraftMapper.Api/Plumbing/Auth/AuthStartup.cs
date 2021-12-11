using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MinecraftMapper.Api.Plumbing.Auth
{
    public static class AuthStartup
    {
        public static void AddCustomAuth(this IServiceCollection services, IConfiguration configuration)
        {
            var auth0Options = configuration.GetSection("Auth0").Get<Auth0Options>();
            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.Authority = auth0Options.Domain;
                    options.Audience = auth0Options.Audience;
                    options.MapInboundClaims = false;
                });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy(AuthPolicies.Admin, builder => builder.AddRequirements(new ClaimsAuthorizationRequirement("permissions", new[] { "Admin" })));
                auth.AddPolicy(AuthPolicies.Player, builder => builder.AddRequirements(new ClaimsAuthorizationRequirement("permissions", new[] { "Player" })));
            });
        }

        public static void ConfigureCustomAuth(this IApplicationBuilder app)
        {
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}