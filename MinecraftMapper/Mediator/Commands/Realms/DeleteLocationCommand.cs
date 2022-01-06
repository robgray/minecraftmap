using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    public class DeleteLocationCommand : ICommand
    {
        public Guid RealmId { get; set; }
        public Guid LocationId { get; set; }
    }

    public class DeleteLocationCommandHandler : ICommandHandler<DeleteLocationCommand>
    {
        private MapperContext _context;
        public DeleteLocationCommandHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<Unit> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            var realm = await _context.Realms.FirstOrDefaultAsync(r => r.Id == request.RealmId, cancellationToken);
            if (realm == null) throw new EntityNotFoundException($"Realm with Id={request.RealmId} not found");

            var location = realm.Locations.FirstOrDefault(l => l.Id == request.LocationId);
            if (location != null)
            {
                realm.Remove(location);
                _context.Remove(location);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return Unit.Value;
        }
    }
}