using System.Threading;
using System.Threading.Tasks;
using MinecraftMapper.Entities;

namespace MinecraftMapper.Mediator.Commands.Realms
{
    public class AddRealmCommand : ICommand<Realm>
    {
        public string Name { get; set; }
    }

    public class AddRealmCommandHandler : ICommandHandler<AddRealmCommand, Realm>
    {
        private MapperContext _context;
        
        public AddRealmCommandHandler(MapperContext context)
        {
            _context = context;
        }
        
        public async Task<Realm> Handle(AddRealmCommand request, CancellationToken cancellationToken)
        {
            if (await _context.Realms.AnyAsync(r => r.Name == request.Name))
            {
                throw new ($"Realm called '{request.Name}' already exists.  Name must be unique.");
            }
            
            var realm = new Realm()
            {
                Name = newRealm.Name
            };

            await _context.Realms.AddAsync(realm);
            await _context.SaveChangesAsync();
            
            return Created(Url.RouteUrl("Realm", new { realmId = realm.Id}), realm);
        }
    }
}