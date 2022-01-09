using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Exceptions;
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
            if (await _context.Realms.AnyAsync(r => r.Name == request.Name, cancellationToken))
            {
                throw new EntityAlreadyExistsException($"Realm called '{request.Name}' already exists.  Name must be unique.");
            }
            
            var realm = new Realm()
            {
                Name = request.Name
            }; 

            await _context.Realms.AddAsync(realm, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return realm;
        }
    }
}