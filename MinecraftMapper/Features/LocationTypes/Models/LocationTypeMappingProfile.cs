using AutoMapper;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Controllers.Models
{
    public class LocationTypeMappingProfile : Profile
    {
        public LocationTypeMappingProfile()
        {
            CreateMap<LocationType, LocationTypeModel>();
        }
    }
}