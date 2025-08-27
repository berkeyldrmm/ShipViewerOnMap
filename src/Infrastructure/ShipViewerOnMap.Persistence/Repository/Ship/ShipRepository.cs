using Microsoft.EntityFrameworkCore;
using ShipViewerOnMap.Application.Abstraction.Repository.Ship;
using ShipViewerOnMap.Application.Dtos.Ship;
using ShipViewerOnMap.Domain.Entities;
using ShipViewerOnMap.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Persistence.Repository.Ship
{
    public class ShipRepository : GenericRepository<ShipViewerOnMap.Domain.Entities.Ship, GetAllShipsDto, GetShipByIdDto>, IShipRepository
    {
        public ShipRepository(ShipViewerOnMapDbContext context) : base(context)
        {
        }

        public async Task CleanDatasAsync()
        {
            await _context.Set<ShipViewerOnMap.Domain.Entities.Ship>().ExecuteDeleteAsync();
        }

        public async Task<List<string>> GetRiskyShipPair(Guid id1, Guid id2)
        {
            return await _context.Set<ShipViewerOnMap.Domain.Entities.Ship>().Where(s => s.Id == id1 || s.Id == id2).Select(s => s.ShipName).ToListAsync();
        }
    }
}
