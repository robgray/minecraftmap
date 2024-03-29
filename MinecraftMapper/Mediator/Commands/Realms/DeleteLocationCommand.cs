﻿using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    public class DeleteLocationCommand : ICommand<Realm>
    {
        public Guid RealmId { get; set; }
        public Guid LocationId { get; set; }
    }

    public class DeleteLocationCommandHandler : ICommandHandler<DeleteLocationCommand, Realm>
    {
        private readonly MapperContext _context;
        public DeleteLocationCommandHandler(MapperContext context)
        {
            _context = context;
        }
        
        protected IQueryable<Realm> Realms => _context.Realms.Include(r => r.Locations).ThenInclude(l => l.Type);
        
        public async Task<Realm> Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            var realm = await Realms.FirstOrDefaultAsync(r => r.Id == request.RealmId, cancellationToken);
            if (realm == null) throw new EntityNotFoundException($"Realm with Id={request.RealmId} not found");

            var location = realm.Locations.FirstOrDefault(l => l.Id == request.LocationId);
            if (location != null)
            {
                realm.Remove(location);
                _context.Remove(location);
                await _context.SaveChangesAsync(cancellationToken);
            }

            return realm;
        }
    }
}