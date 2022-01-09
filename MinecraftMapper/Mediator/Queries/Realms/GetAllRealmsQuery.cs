using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Mediator.Queries.Realms
{
    public class GetAllRealmsQuery : IQuery<Realm[]> { }

    public class GetAllRealmsQueryHandler : IQueryHandler<GetAllRealmsQuery, Realm[]>
    {
        private readonly MapperContext _context;
        
        public GetAllRealmsQueryHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<Realm[]> Handle(GetAllRealmsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Realms
                .ToArrayAsync(cancellationToken);
        }
    }
}