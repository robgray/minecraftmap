using AutoMapper;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Controllers.Models
{
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
        }
    }
}