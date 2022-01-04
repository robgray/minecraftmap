using AutoMapper;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Controllers.Models
{
    public class RealmsMappingProfile : Profile
    {
        public RealmsMappingProfile()
        {
            CreateMap<Realm, RealmModel>();
            
            
        }
    }
}