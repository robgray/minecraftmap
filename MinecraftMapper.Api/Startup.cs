using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MinecraftMapper.Api.Plumbing.Auth;
using MinecraftMapper.Api.Plumbing.Automapper;
using MinecraftMapper.Api.Plumbing.Cors;
using MinecraftMapper.Api.Plumbing.Mediator;
using MinecraftMapper.Api.Plumbing.Swagger;
using MinecraftMapper.Api.Plumbing.UserContext;
using MinecraftMapper.Api.Plumbing.Validation;
using MinecraftMapper.Domain.MapGeneration;
using MinecraftMapper.Domain.Plumbing.DataContext;
using MinecraftMapper.Domain.Plumbing.Mediator;

namespace MinecraftMapper.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddLogging();
            
            services.AddCustomCors(Configuration);
            
            services.AddControllers(options =>
                {
                    options.Filters.Add<MediatorExceptionFilter>();
                })
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore)
                .AddCustomValidation();
            

            services.AddScoped<IMapNumberGenerator, MapNumberGenerator>();
            
            services.AddCustomSwagger();
            
            services.AddCustomAuth(Configuration);
            
            services.AddCustomUserContext();
            services.AddCustomAutoMapper();
            services.AddCustomMediator();
            
            services.UseMapperContext(Configuration);
        }
        
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.ConfigureCustomSwagger();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();

            app.UseAuthorization();
            app.ConfigureCustomAuth();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}