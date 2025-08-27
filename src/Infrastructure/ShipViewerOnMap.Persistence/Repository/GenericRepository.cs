using Microsoft.EntityFrameworkCore;
using ShipViewerOnMap.Application.Abstraction.Repository;
using ShipViewerOnMap.Application.Dtos.Common;
using ShipViewerOnMap.Application.Wrappers;
using ShipViewerOnMap.Persistence.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Persistence.Repository
{
    public class GenericRepository<T, TGetAllDto, TGetByIdDto> : IGenericRepository<T, TGetAllDto, TGetByIdDto>
        where T : class
        where TGetAllDto : class
        where TGetByIdDto : BaseDto
    {
        public ShipViewerOnMapDbContext _context { get; set; }

        public GenericRepository(ShipViewerOnMapDbContext context)
        {
            _context = context;
        }

        public async Task InsertAsync(List<T> values)
        {
            await _context.Set<T>().AddRangeAsync(values);
        }

        public async Task<int> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync();
        }

        public async Task<List<TGetAllDto>> GetAllAsync(Expression<Func<T, TGetAllDto>> exp)
        {
            return await _context.Set<T>().Select(exp).ToListAsync();
        }

        public async Task<TGetByIdDto> GetByIdAsync(Guid id, Expression<Func<T, TGetByIdDto>> exp)
        {
            return await _context.Set<T>().Select(exp).FirstOrDefaultAsync(s => s.Id == id);
        }
    }
}
