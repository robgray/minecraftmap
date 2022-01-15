using System;
using System.Reflection;
using Microsoft.Extensions.Configuration;
using MinecraftMapper.Extensions;
using Serilog;
using Serilog.Core;
using Serilog.Events;

namespace MinecraftMapper.Plumbing.Logging
{
    public static class LoggingStartup
    {   
        public static ILogger BuildLoggerFromConfiguration(this LoggerConfiguration loggerConfiguration, IConfiguration configuration, Type startupType = null)
        {
            var environment = configuration.GetValue<string>("Environment") ?? Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var seqServerUrl = configuration.GetValue<string>("Seq:Url") ?? "";
            var seqServerApiKey = configuration.GetValue<string>("Seq:ApiKey") ?? "";
            var isSeqConfigured = !string.IsNullOrEmpty(seqServerUrl);

            var instrumentationKey = configuration.GetValue<string>("APPINSIGHTS_INSTRUMENTATIONKEY") ?? "";
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

            var levelSwitch = new LoggingLevelSwitch { MinimumLevel = LogEventLevel.Information };

            loggerConfiguration
                .MinimumLevel.ControlledBy(levelSwitch)
                .Enrich.FromLogContext()
                .Enrich.WithMachineName()
                .Enrich.WithOperationId()
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
            

            var logger = loggerConfiguration.CreateLogger();
            
            logger.Information("startupType?.BaseType?.Name = {StartupType}", startupType?.BaseType?.BaseType?.Name);
            logger.Information("environment = {Environment}", environment);
            logger.Information("isSeqConfigured = {IsSeqConfigured}", isSeqConfigured);
            logger.Information("seqUrl = {SeqServerUrl}", seqServerUrl);
            logger.Information("seqApiKey = {SeqServerApiKey}", seqServerApiKey);
            logger.Information("isAppInsightsConfigured = {IsAppInsightsConfigured}", isAppInsightsConfigured);
            logger.Information("instrumentationKey = {InstrumentationKey}", instrumentationKey);
            logger.Information("isConsoleConfigured = {IsConsoleConfigured}", isConsoleConfigured);
            logger.Information("applicationName = {ApplicationName}", assemblyName);
            logger.Information("applicationVersion = {ApplicationVersion}", assemblyVersion);
        
            return logger;
        }
    }
}