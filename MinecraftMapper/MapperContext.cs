using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;

namespace MinecraftMapper
{
    public class MapperContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Realm> Realms { get; set; }
        public DbSet<LocationType> LocationTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .OwnsOne(l => l.Coordinate);

            modelBuilder.Entity<Realm>()
                .OwnsOne(m => m.RespawnLocation);
            
            base.OnModelCreating(modelBuilder);
        }
    }
}