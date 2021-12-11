using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace MinecraftMapper.Api.Services
{
    public interface IUserContext
    {
        string ExternalId { get; }
        string FirstName { get; }
        string LastName { get; }
        string Email { get; }
    }
    
    public class UserContext : IUserContext
    {
        private const string ClaimBase = "https://minecraftmapper.net/";
        
        public UserContext(IHttpContextAccessor httpContextAccessor)
        {
            var userClaims = httpContextAccessor.HttpContext?.User.Claims.ToArray();

            if (userClaims == null) throw new InvalidOperationException("User is not authenticated so we can't access their info");

            ExternalId = userClaims.Single(uc => uc.Type == JwtRegisteredClaimNames.Sub).Value;
            FirstName = userClaims.Single(uc => uc.Type == $"{ClaimBase}given_name").Value;
            LastName = userClaims.Single(uc => uc.Type == $"{ClaimBase}family_name").Value;
            Email = userClaims.Single(uc => uc.Type == $"{ClaimBase}email").Value;
        }

        public string ExternalId { get; }
        public string FirstName { get; }
        public string LastName { get; }
        public string Email { get; }
    }
}