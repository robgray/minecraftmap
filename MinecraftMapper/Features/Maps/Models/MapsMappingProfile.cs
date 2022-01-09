using AutoMapper;
using JetBrains.Annotations;
using MinecraftMapper.MapGeneration;
using MinecraftMapper.Mediator.Queries.Maps;

namespace MinecraftMapper.Features.Maps.Models
{
    [UsedImplicitly]
    public class MapsMappingProfile : Profile
    {
        public MapsMappingProfile()
        {
            CreateMap<Square, MapModel>()
                .ForMember(s => s.Bounds, b => b.MapFrom(s => new MapBoundingBox(
                    s.BoundingBox.TopLeft.X,
                    s.BoundingBox.TopLeft.Y,
                    s.BoundingBox.BottomRight.X,
                    s.BoundingBox.BottomRight.Y))
                );

            CreateMap<int, GetMapsQuery>()
                .ForMember(m => m.MaximumRingNumber, x => x.MapFrom(i => i));
        }
    }
}