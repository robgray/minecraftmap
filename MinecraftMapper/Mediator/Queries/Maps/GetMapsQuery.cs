using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MinecraftMapper.Features.Maps.Models;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Mediator.Queries.Maps
{
    public class GetMapsQuery : IQuery<MapModel[]>
    {
        public int MaximumRingNumber { get; set; }
    }
    
    public class GetMapsQueryHandler : IQueryHandler<GetMapsQuery, MapModel[]>
    {
        public Task<MapModel[]> Handle(GetMapsQuery request, CancellationToken cancellationToken)
        {
            var squares = new List<Square>();
            for (var ringNumber = 0; ringNumber < request.MaximumRingNumber; ringNumber++)
            {
                var ring = new Ring(ringNumber);
                squares.AddRange(ring.GetAllSquares());
            }

            var maps = squares.OrderBy(s => s.Number)
                    .Select(s => new MapModel
                    {
                        MapNumber = s.Number,
                        RingNumber = s.Ring.Number,
                        Bounds = new MapBoundingBox(
                            s.BoundingBox.TopLeft.X,
                            s.BoundingBox.TopLeft.Y,
                            s.BoundingBox.BottomRight.X,
                            s.BoundingBox.BottomRight.Y
                        )
                    })
                    .ToArray();

            return Task.FromResult(maps);
        }
    }
}