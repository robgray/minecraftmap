using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Controllers.Models;

namespace MinecraftMapper.Mediator.Queries.Realms
{
    public class GetAllRealmsQuery : IQuery<RealmModel[]>
    {
        
    }

    public class GetAllRealmsQueryHandler : IQueryHandler<GetAllRealmsQuery, RealmModel[]>
    {
        private readonly MapperContext _context;
        
        public GetAllRealmsQueryHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<RealmModel[]> Handle(GetAllRealmsQuery request, CancellationToken cancellationToken)
        {
            return await _context.Realms
                .Select(m => new RealmModel { Id = m.Id, Name = m.Name })
                .ToArrayAsync(cancellationToken);
        }
    }
}