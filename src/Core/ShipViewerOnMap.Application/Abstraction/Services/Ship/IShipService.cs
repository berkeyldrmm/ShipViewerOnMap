using ShipViewerOnMap.Application.Dtos.Ship;
using ShipViewerOnMap.Application.Wrappers;
using ShipViewerOnMap.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Abstraction.Services.Ship
{
    public interface IShipService
    {
        public Task<DataResponse<List<GetAllShipsDto>>> GetAllAsync();
        public Task<DataResponse<GetShipByIdDto>> GetShipByIdAsync(Guid id);
        public Task<BaseResponse> CreateAsync(int count);
        public Task<BaseResponse> CleanDatasAsync();
        public Task<DataResponse<List<string>>> GetRiskyShipPair(Guid id1, Guid id2);
    }
}
