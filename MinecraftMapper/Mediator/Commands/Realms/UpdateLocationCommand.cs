using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using MinecraftMapper.Domain.Exceptions;
using MinecraftMapper.Entities;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    [UsedImplicitly]
    public class UpdateLocationCommand : ICommand<Realm>
    {
        public Guid RealmId { get; set; }
        public Guid LocationId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Z { get; set; }
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
    public class UpdateLocationCommandHandler : ICommandHandler<UpdateLocationCommand, Realm>
    {
        private readonly IMapNumberGenerator _mapNumberGenerator;
        private readonly MapperContext _context;
        
        public UpdateLocationCommandHandler(MapperContext context, IMapNumberGenerator mapNumberGenerator)
        {
            _context = context;
            _mapNumberGenerator = mapNumberGenerator;
        }
        
        protected IQueryable<Realm> Realms => _context.Realms.Include(r => r.Locations).ThenInclude(l => l.Type);
        
        public async Task<Realm> Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
        {
            var realm = await Realms
                .FirstOrDefaultAsync(x => x.Id == request.RealmId, cancellationToken);
            if (realm == null) throw new EntityNotFoundException($"Realm with Id={request.RealmId} not found");
            
            var location = realm.Locations.FirstOrDefault(l => l.Id == request.LocationId);
            if (location == null) throw new EntityNotFoundException("Location to update could not be found.  Nothing to update");
            
            var coordinate = new Coordinate
            {
                X = request.X,
                Z = request.Z,
                Y = request.Y
            };

            location.Name = request.Name;
            location.Coordinate = coordinate; 
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

            return realm;
        }
    }
}