using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ShipViewerOnMap.Application.Abstraction.Repository.Ship;
using ShipViewerOnMap.Application.Abstraction.Services.Ship;
using ShipViewerOnMap.Persistence.Context;
using ShipViewerOnMap.Persistence.Repository.Ship;
using ShipViewerOnMap.Persistence.Services.Ship;

namespace ShipViewerOnMap.Persistence
{
    public static class ServiceRegistration
    {
        public static void RegisterPersistenceServices(this IServiceCollection serviceCollection, string connectionString)
        {
            serviceCollection.AddDbContext<ShipViewerOnMapDbContext>(options => options.UseSqlServer(connectionString));

            serviceCollection.AddScoped<IShipRepository, ShipRepository>();

            serviceCollection.AddScoped<IShipService, ShipService>();
        }
    }
}
