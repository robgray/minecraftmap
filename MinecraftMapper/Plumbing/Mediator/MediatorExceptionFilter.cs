using System;
using System.Linq;
using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Hosting;
using MinecraftMapper.Domain.Exceptions;
using Serilog;

namespace MinecraftMapper.Plumbing.Mediator
{
public class MediatorExceptionFilter : ExceptionFilterAttribute
{
    private readonly IWebHostEnvironment _environment;
    private readonly ILogger _logger;

    public MediatorExceptionFilter(IWebHostEnvironment environment)
    {
        _environment = environment;
        _logger = Log.ForContext<MediatorExceptionFilter>();
    }

    public override void OnException(ExceptionContext context)
    {
        var exception = context.Exception;

        switch (exception)
        {
            case ValidationException ex:
                HandleValidationException(context, ex);
                break;
            case EntityNotFoundException:
                HandleEntityNotFoundException(context, exception);
                break;
        }
    }

    private void HandleEntityNotFoundException(ExceptionContext context, Exception exception)
    {
        _logger.Warning(exception, "A entity not found exception was thrown: {ErrorMessage}", exception.Message);

        context.Result = new NotFoundResult();
    }

    private void HandleValidationException(ExceptionContext context, ValidationException exception)
    {
        var statusCode = (int)HttpStatusCode.BadRequest;
        var includeDebuggingInformation = !_environment.IsProduction();
        var details = includeDebuggingInformation ? exception.ToString() : null;
        var title = exception.Message;

        var errors = exception
            .Errors
            .GroupBy(failure => failure.PropertyName)
            .ToDictionary(failures => failures.Key, failures => failures.Select(failure => failure.ErrorMessage).ToArray());

        var problemDetails = new ValidationProblemDetails(errors)
        {
            Status = statusCode,
            Type = $"https://httpstatuses.com/{statusCode}",
            Title = title,
            Detail = details,
        };

        _logger.Warning(exception, "A validation exception was thrown: {ErrorMessage}", exception.Message);

        context.HttpContext.Response.StatusCode = statusCode;
        context.Result = new JsonResult(problemDetails);
    }
}
}