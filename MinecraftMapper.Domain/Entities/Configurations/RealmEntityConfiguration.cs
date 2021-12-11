using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MinecraftMapper.Domain.Entities.Configurations
{
    public class RealmEntityConfiguration : IEntityTypeConfiguration<Realm>
    {
        public void Configure(EntityTypeBuilder<Realm> builder)
        {
            builder.HasKey(r => r.Id);
            builder.OwnsOne(r => r.RespawnLocation);
            builder.OwnsMany(r => r.Locations).OwnsOne(l => l.Coordinate);
        }
    }
}