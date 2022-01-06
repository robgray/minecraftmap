using AutoMapper;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Features.LocationTypes.Models
{
    public class LocationTypeMappingProfile : Profile
    {
        public LocationTypeMappingProfile()
        {
            CreateMap<LocationType, LocationTypeModel>();
        }
    }
}