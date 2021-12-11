using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using MinecraftMapper.Domain.Plumbing.Logging;
using Serilog;

namespace MinecraftMapper.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.Development.json", optional: true)
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();
            
            Log.Logger = new LoggerConfiguration()
                .ApplyLoggerConfiguration(configuration, typeof(Startup))
                .CreateLogger();
            
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                })
                .UseSerilog()
                .Build()
                .Run();
        }
    }
}