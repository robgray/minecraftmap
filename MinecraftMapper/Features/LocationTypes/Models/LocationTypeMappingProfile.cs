using AutoMapper;
using JetBrains.Annotations;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Features.LocationTypes.Models
{
    [UsedImplicitly]
    public class LocationTypeMappingProfile : Profile
    {
        public LocationTypeMappingProfile()
        {
            CreateMap<LocationType, LocationTypeModel>();
        }
    }
}