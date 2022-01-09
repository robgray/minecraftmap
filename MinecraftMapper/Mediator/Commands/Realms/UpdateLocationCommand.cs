using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    [UsedImplicitly]
    public class UpdateLocationCommand : ICommand
    {
        public Guid RealmId { get; set; }
        public Guid LocationId { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public Guid LocationTypeId { get; set; }
        
        public bool HasPortal { get; set; }
        public bool HasEnderChest { get; set; }
        public bool HasEnchantmentTable { get; set; }
        public bool HasBed { get; set; }
        public bool HasAnvil { get; set; }
        public bool HasFurnace { get; set; }
    }
    
    [UsedImplicitly]
    public class UpdateLocationCommandHandler : ICommandHandler<UpdateLocationCommand>
    {
        private readonly IMapNumberGenerator _mapNumberGenerator;
        private readonly MapperContext _context;
        
        public UpdateLocationCommandHandler(MapperContext context, IMapNumberGenerator mapNumberGenerator)
        {
            _context = context;
            _mapNumberGenerator = mapNumberGenerator;
        }
        
        public async Task<Unit> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            var realm = await _context.Realms.Include(r => r.Locations).FirstOrDefaultAsync(x => x.Id == request.RealmId, cancellationToken);
            if (realm == null) throw new EntityNotFoundException($"Realm with Id={request.RealmId} not found");
            
            var location = realm.Locations.FirstOrDefault(l => l.Id == request.LocationId);
            if (location == null) throw new EntityNotFoundException("Location to update could not be found.  Nothing to update");
            
            location.Name = request.Name;
            location.Notes = request.Notes;
            location.HasAnvil = request.HasAnvil;
            location.HasBed = request.HasBed;
            location.HasPortal = request.HasPortal;
            location.HasEnchantmentTable = request.HasEnchantmentTable;
            location.HasFurnace = request.HasFurnace;
            location.HasEnderChest = request.HasEnderChest;
            location.TypeId = request.LocationTypeId;
            
            location.MapNumber = _mapNumberGenerator.GetMapNumberFromCoordinate(location.Coordinate);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}