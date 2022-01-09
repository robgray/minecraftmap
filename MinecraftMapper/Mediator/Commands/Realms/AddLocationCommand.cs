using System;
using System.Linq;
using System.Security.Policy;
using System.Threading;
using System.Threading.Tasks;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;
using MinecraftMapper.Entities;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    public class AddLocationCommand : ICommand<Realm>
    {
        public Guid RealmId { get; set; }
        
        public string Name { get; set; }
        public int X { get; set; }
        public int Z { get; set; }
        public int Y { get; set; }
        public Guid LocationTypeId { get; set; }
        
        public bool HasPortal { get; set; }
        public bool HasEnderChest { get; set; }
        public bool HasEnchantmentTable { get; set; }
        public bool HasBed { get; set; }
        public bool HasAnvil { get; set; }
        public bool HasFurnace { get; set; }
        public string Notes { get; set; }
    }

    [UsedImplicitly]
    public class AddLocationCommandHandler : ICommandHandler<AddLocationCommand, Realm>
    {
        private readonly IMapNumberGenerator _mapNumberGenerator;
        private readonly MapperContext _context;
        
        public AddLocationCommandHandler(MapperContext context, IMapNumberGenerator mapNumberGenerator)
        {
            _context = context;
            _mapNumberGenerator = mapNumberGenerator;
        }
        
        protected IQueryable<Realm> Realms => _context.Realms.Include(r => r.Locations).ThenInclude(l => l.Type).AsNoTracking();
        
        public async Task<Realm> Handle(AddLocationCommand request, CancellationToken cancellationToken)
        {
            var realm = await Realms.FirstOrDefaultAsync(r => r.Id == request.RealmId, cancellationToken);
            
            if (realm == null) throw new EntityNotFoundException($"Could not find Realm with Id {request.RealmId}");
                
            var coordinate = new Coordinate
            {
                X = request.X,
                Z = request.Z,
                Y = request.Y
            };

            var location = new Location
            {
                MapNumber = -1,
                Name = request.Name,
                Coordinate = coordinate,
                TypeId = request.LocationTypeId,
                HasAnvil = request.HasAnvil,
                HasBed = request.HasBed,
                HasPortal = request.HasPortal,
                HasEnchantmentTable = request.HasEnchantmentTable,
                HasFurnace = request.HasFurnace,
                HasEnderChest = request.HasEnderChest,
                Notes = request.Notes
            };
            realm.Add(location);
            await _context.SaveChangesAsync();

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