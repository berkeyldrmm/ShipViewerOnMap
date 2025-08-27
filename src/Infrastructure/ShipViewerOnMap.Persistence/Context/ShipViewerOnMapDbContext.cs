using Microsoft.EntityFrameworkCore;
using ShipViewerOnMap.Domain.Entities;

namespace ShipViewerOnMap.Persistence.Context
{
    public class ShipViewerOnMapDbContext : DbContext
    {
        public DbSet<Ship> Ships { get; set; }
        public ShipViewerOnMapDbContext(DbContextOptions options) : base(options)
        {
            
        }
    }
}
