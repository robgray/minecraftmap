using System;
using Microsoft.Extensions.Configuration;
using MinecraftMapper.Domain.Plumbing.Logging;
using Serilog;

namespace MinecraftMapper.Migrator
{
    class Program
    {
        static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("application.json")
                .AddJsonFile("application.Development.json", optional: true)
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();
            
            Log.Logger = new LoggerConfiguration()
                .ApplyLoggerConfiguration(configuration, typeof(Program))
                .CreateLogger();
        }
    }
}