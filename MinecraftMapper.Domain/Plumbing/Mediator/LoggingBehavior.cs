using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using MediatR;
using Serilog;
using Serilog.Events;

namespace MinecraftMapper.Domain.Plumbing.Mediator
{
     public class LoggingBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
    {
        private const string SuccessMessageTemplate =
            "{HandlerName:l} completed in {TimedOperationElapsed} ({TimedOperationElapsedInMs} ms)";

        private const string FailureMessageTemplate =
            "{HandlerName:l} failed in {TimedOperationElapsed} ({TimedOperationElapsedInMs} ms)";

        private readonly ILogger _logger;
        public LoggingBehavior() => _logger = Log.ForContext(GetType());

        public async Task<TResponse> Handle(TRequest request, CancellationToken cancellationToken, RequestHandlerDelegate<TResponse> next)
        {
            var declaringTypeOrObjectType = request.GetType().DeclaringType ?? request.GetType();
            var handlerName = declaringTypeOrObjectType.FullName;
            var shouldLog = _logger.IsEnabled(LogEventLevel.Information) &&
                            !request.HasAttribute<DoNotLogAttribute>();

            if (!shouldLog) return await next();

            var stopWatch = Stopwatch.StartNew();

            try
            {
                var response = await next();
                stopWatch.Stop();

                _logger
                    .ForContext("Request", request, true)
                    .ForContext("Response", response, true)
                    .Information(
                        SuccessMessageTemplate,
                        handlerName,
                        stopWatch.Elapsed,
                        stopWatch.ElapsedMilliseconds);

                return response;
            }
            catch (Exception exception)
            {
                stopWatch.Stop();

                var logLevel = exception is ValidationException
                    ? LogEventLevel.Warning
                    : LogEventLevel.Error;

                _logger
                    .ForContext("Request", request, true)
                    .Write(logLevel, FailureMessageTemplate, handlerName, stopWatch.Elapsed, stopWatch.ElapsedMilliseconds);

                throw;
            }
        }
    }
}