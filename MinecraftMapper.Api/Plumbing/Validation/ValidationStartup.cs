using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using MinecraftMapper.Domain.Entities;

namespace MinecraftMapper.Api.Plumbing.Validation
{
    public static class ValidationStartup
    {
        public static void AddCustomValidation(this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Realm>());
        }
    }
}