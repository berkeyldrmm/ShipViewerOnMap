using ShipViewerOnMap.Application.Dtos.Ship;
using ShipViewerOnMap.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Abstraction.Repository.Ship
{
    public interface IShipRepository : IGenericRepository<ShipViewerOnMap.Domain.Entities.Ship, GetAllShipsDto, GetShipByIdDto>
    {
        public Task CleanDatasAsync();
        public Task<List<string>> GetRiskyShipPair(Guid id1, Guid id2);
    }
}
