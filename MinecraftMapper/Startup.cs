using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper
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
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins("*")
                        .WithHeaders("Content-Type")
                        .WithMethods("GET", "POST", "PUT", "DELETE");

                });
            });
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddScoped<IMapNumberGenerator, MapNumberGenerator>();
            
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Minecraft Mapper API",
                });
            });
            ConfigureDbContext(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger(); 
                app.UseSwaggerUI(c => c.SwaggerEndpoint("v1/swagger.json", "Minecraft Mapper API v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
        
        protected void ConfigureDbContext(IServiceCollection services)
        {
            services.AddDbContext<MapperContext>(options =>
            {
                options
                    .UseLoggerFactory(LoggerFactory.Create(x => x.AddDebug()))
                    .UseSqlServer(Configuration.GetConnectionString("DefaultConnection"), sqlServerOptionsAction: sqlOptions =>
                    {
                        sqlOptions.MigrationsHistoryTable("__EFMigrationsHistory", "dbo");
                        sqlOptions.EnableRetryOnFailure(maxRetryCount: 5,
                            maxRetryDelay: TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null);
                    });
            });
        }
    }
}