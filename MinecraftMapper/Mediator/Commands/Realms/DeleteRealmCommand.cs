using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    public class DeleteRealmCommand : ICommand
    {
        public Guid RealmId { get; set; }
    }

    public class DeleteRealmCommandHandler : ICommandHandler<DeleteRealmCommand>
    {
        private MapperContext _context;
        public DeleteRealmCommandHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task Handle(DeleteRealmCommand request, CancellationToken cancellationToken)
        {
            var realm = await _context.Realms.FirstOrDefaultAsync(r => r.Id == request.RealmId, cancellationToken);
            if (realm == null)
                throw new EntityNotFoundException($"Could not find Realm with Id {request.RealmId}");

            foreach (var location in realm.Locations)
            {
                realm.Remove(location);
                _context.Remove(location);
            }

            _context.Realms.Remove(realm);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}