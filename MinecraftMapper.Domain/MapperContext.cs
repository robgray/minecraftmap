using Microsoft.EntityFrameworkCore;
using MinecraftMapper.Domain.Entities;
using MinecraftMapper.Domain.Entities.Configurations;

namespace MinecraftMapper.Domain
{
    public class MapperContext : DbContext
    {
        public MapperContext(DbContextOptions options)  : base(options) { }
        
        public DbSet<Realm> Realms { get; set; }
        public DbSet<LocationType> LocationTypes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new RealmEntityConfiguration());
            
            base.OnModelCreating(modelBuilder);
        }
    }
}