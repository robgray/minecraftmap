using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;
using MinecraftMapper.Entities;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Mediator.Queries.Realms
{
    public class GetRealmByIdQuery : IQuery<Realm>
    {
        public Guid RealmId { get; set; }
    }

    public class GetRealmByIdQueryHandler : BaseRealmsQuery, IQueryHandler<GetRealmByIdQuery, Realm>
    {
        private IMapNumberGenerator _mapNumberGenerator;

        public GetRealmByIdQueryHandler(MapperContext context, IMapNumberGenerator mapNumberGenerator) : base(context)
        {
            _mapNumberGenerator = mapNumberGenerator;
        }
        
        public async Task<Realm> Handle(GetRealmByIdQuery request, CancellationToken cancellationToken)
        {
            var realm = await Realms
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == request.RealmId, cancellationToken);

            if (realm == null)
                throw new EntityNotFoundException($"Realm with Id {request.RealmId} was not found");
            
            // Overwrite all, for now.
            SetMapNumber(realm);
            return realm;
        }
        private void SetMapNumber(Realm realm)
        {
            foreach (var location in realm.Locations)
            {
                location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);
            }
        }
    }
    
    
}