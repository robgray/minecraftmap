using System;
using AutoMapper;
using JetBrains.Annotations;
using MinecraftMapper.Entities;
using MinecraftMapper.Mediator.Commands.Realms;
using MinecraftMapper.Mediator.Queries.Realms;
using MinecraftMapper.Requests;

namespace MinecraftMapper.Features.Realms.Models
{
    [UsedImplicitly]
    public class RealmsMappingProfile : Profile
    {
        public RealmsMappingProfile()
        {
            CreateMap<Realm, RealmModel>();
            CreateMap<Realm, RealmOnlyModel>();
            CreateMap<Location, LocationModel>();
            CreateMap<Coordinate, CoordinateModel>();

            CreateMap<NewRealmRequest, AddRealmCommand>();
            CreateMap<Guid, DeleteRealmCommand>()
                .ForMember(r => r.RealmId, x => x.MapFrom(g => g));
            
            CreateMap<NewLocationRequest, AddLocationCommand>();
            CreateMap<Guid, AddLocationCommand>()
                .ForMember(l => l.RealmId, x => x.MapFrom(g => g));

            CreateMap<Guid, GetRealmByIdQuery>()
                .ForMember(r => r.RealmId, x => x.MapFrom(g => g));

            CreateMap<LocationIdentifierParams, DeleteLocationCommand>();

            CreateMap<UpdateLocationRequest, UpdateLocationCommand>();
            CreateMap<LocationIdentifierParams, UpdateLocationCommand>();
        }
    }
}