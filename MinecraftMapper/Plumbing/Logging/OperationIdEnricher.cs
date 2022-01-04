using System;
using System.Diagnostics;
using Serilog;
using Serilog.Configuration;
using Serilog.Core;
using Serilog.Events;

namespace MinecraftMapper.Plumbing.Logging
{
    public class OperationIdEnricher : ILogEventEnricher
    {
        public const string OperationId = "Operation Id";
        public const string ParentId = "Parent Id";

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            var activity = Activity.Current;

            if (activity is null) return;
        
            logEvent.AddPropertyIfAbsent(new LogEventProperty(OperationId, new ScalarValue(activity.RootId)));
        }
    }

    public static class EnrichWithOperationId
    {
        public static LoggerConfiguration WithOperationId(this LoggerEnrichmentConfiguration enrichmentConfiguration)
        {
            if (enrichmentConfiguration is null) throw new ArgumentNullException(nameof(enrichmentConfiguration));
        
            return enrichmentConfiguration.With<OperationIdEnricher>();
        }
    }
}