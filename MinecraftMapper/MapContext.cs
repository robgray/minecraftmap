using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Entities;

namespace MinecraftMapper
{
    public class MapContext : DbContext
    {
        public MapContext(DbContextOptions options)  : base(options) { }
        
        public DbSet<Map> Maps { get; set; }
        public DbSet<LocationType> LocationTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Location>()
                .OwnsOne(l => l.Coordinate);

            modelBuilder.Entity<Map>()
                .OwnsOne(m => m.RespawnLocation);
            
            base.OnModelCreating(modelBuilder);
        }
    }
}