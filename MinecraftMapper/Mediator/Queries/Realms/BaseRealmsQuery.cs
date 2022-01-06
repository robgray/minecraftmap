using System.Linq;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Mediator.Queries.Realms
{
    public abstract class BaseRealmsQuery
    {
        private MapperContext _context;
        
        protected BaseRealmsQuery(MapperContext context)
        {
            _context = context;
        }

        protected IQueryable<Realm> Realms => _context.Realms.Include(r => r.Locations).ThenInclude(l => l.Type).AsNoTracking();
    }
}