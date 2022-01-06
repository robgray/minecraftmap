using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;
using MinecraftMapper.Features.LocationTypes.Models;

namespace MinecraftMapper.Mediator.Queries.LocationTypes
{
    public class GetLocationTypesQuery : IQuery<LocationType[]>
    {
        
    }

    public class GetLocationTypesQueryHandler : IQueryHandler<GetLocationTypesQuery, LocationType[]>
    {
        private readonly MapperContext _context;
        
        public GetLocationTypesQueryHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<LocationType[]> Handle(GetLocationTypesQuery request, CancellationToken cancellationToken)
        {
            return await _context.LocationTypes
                .AsNoTracking()
                .OrderBy(l => l.Name)
                .ToArrayAsync(cancellationToken);
        }
    }
}