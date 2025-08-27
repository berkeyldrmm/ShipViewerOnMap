using ShipViewerOnMap.Application.Abstraction.UnitOfWork;
using ShipViewerOnMap.Application.Dtos.Common;
using ShipViewerOnMap.Application.Wrappers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Abstraction.Repository
{
    public interface IGenericRepository<T, TGetAllDto, TGetByIdDto> : IUnitOfWork 
        where T : class
        where TGetAllDto : class
        where TGetByIdDto : BaseDto
    {
        public Task<List<TGetAllDto>> GetAllAsync(Expression<Func<T, TGetAllDto>> exp);
        public Task InsertAsync(List<T> values);
        public Task<TGetByIdDto> GetByIdAsync(Guid id, Expression<Func<T, TGetByIdDto>> exp);
    }
}
