using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Abstraction.UnitOfWork
{
    public interface IUnitOfWork
    {
        public Task<int> SaveChangesAsync();
    }
}
