using System;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using MinecraftMapper.Domain.Extensions;
using Serilog;
using Serilog.Core;
using Serilog.Events;

namespace MinecraftMapper.Domain.Plumbing.Logging
{
    public static class LoggingStartup
    {
        public static LoggerConfiguration ApplyLoggerConfiguration(this LoggerConfiguration loggerConfiguration, IConfiguration configuration, Type startupType = null)
        {
            var environment = configuration.GetValue<string>("Environment") ?? Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var seqServerUrl = configuration.GetValue<string>("Seq:Url") ?? "";
            var seqServerApiKey = configuration.GetValue<string>("Seq:ApiKey") ?? "";
            var isSeqConfigured = !string.IsNullOrEmpty(seqServerUrl);

            var instrumentationKey = configuration.GetValue<string>("AppInsights:InstrumentationKey") ?? Environment.GetEnvironmentVariable("APPINSIGHTS_INSTRUMENTATIONKEY") ?? "";
            var isAppInsightsConfigured = !string.IsNullOrEmpty(instrumentationKey);

            var isConsoleConfigured = environment == "Development" || configuration.GetValue<bool>("ConsoleLogging") || startupType?.BaseType?.BaseType?.Name == "FunctionsStartup";

            var assembly = startupType?.Assembly ?? Assembly.GetEntryAssembly() ?? throw new NullReferenceException();
            var assemblyName = assembly.GetName().Name;
            var assemblyVersion = assembly.GetName().Version;

            if (configuration is ConfigurationRoot configurationRoot)
            {
                foreach (var configurationProvider in configurationRoot.Providers)
                {
                    Console.WriteLine($"Configuration Provider: {configurationProvider.GetType().Name}");
                }
            }

            Console.WriteLine($"startupType?.BaseType?.Name = {startupType?.BaseType?.BaseType?.Name}");
            Console.WriteLine($"environment = {environment}");
            Console.WriteLine($"isSeqConfigured = {isSeqConfigured}");
            Console.WriteLine($"seqUrl = {seqServerUrl}");
            Console.WriteLine($"seqApiKey = {seqServerApiKey}");
            Console.WriteLine($"isAppInsightsConfigured = {isAppInsightsConfigured}");
            Console.WriteLine($"instrumentationKey = {instrumentationKey}");
            Console.WriteLine($"isConsoleConfigured = {isConsoleConfigured}");
            Console.WriteLine($"assemblyName = {assemblyName}");
            Console.WriteLine($"assemblyVersion = {assemblyVersion}");

            var levelSwitch = new LoggingLevelSwitch { MinimumLevel = LogEventLevel.Information };

            loggerConfiguration
                .MinimumLevel.ControlledBy(levelSwitch)
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .Enrich.WithProperty("ApplicationName", assemblyName)
                .Enrich.WithProperty("ApplicationVersion", assemblyVersion)
                .Enrich.WithProperty("Environment", environment)
                .If(isConsoleConfigured, c => c.WriteTo.Console())
                .If(isSeqConfigured,
                    c => c.WriteTo.Seq(
                        seqServerUrl,
                        apiKey: seqServerApiKey,
                        controlLevelSwitch: levelSwitch)
                );


            return loggerConfiguration;
        }
    }
}