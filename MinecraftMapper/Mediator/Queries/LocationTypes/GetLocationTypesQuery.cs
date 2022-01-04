using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Controllers.Models;

namespace MinecraftMapper.Mediator.Queries.LocationTypes
{
    public class GetLocationTypesQuery : IQuery<LocationTypeModel[]>
    {
        
    }

    public class GetLocationTypesQueryHandler : IQueryHandler<GetLocationTypesQuery, LocationTypeModel[]>
    {
        private MapperContext _context;
        
        public GetLocationTypesQueryHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<LocationTypeModel[]> Handle(GetLocationTypesQuery request, CancellationToken cancellationToken)
        {
            return await _context.LocationTypes
                .AsNoTracking()
                .Select(l => new LocationTypeModel { Id = l.Id, IconClass = l.IconClass, Name = l.Name })
                .OrderBy(l => l.Name)
                .ToArrayAsync(cancellationToken);
        }
    }
}