using ShipViewerOnMap.Application.Dtos.Ship;
using ShipViewerOnMap.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Mappings.Ship
{
    public static class ShipMapper
    {
        public static Expression<Func<ShipViewerOnMap.Domain.Entities.Ship, GetAllShipsDto>> GetAllShipsExpression()
        {
            return ship => new GetAllShipsDto
            {
                Id = ship.Id,
                ShipType = ship.ShipType,
                Heading = ship.Heading,
                Speed = ship.Speed,
                Length = ship.Length,
                Beam = ship.Beam,
                Lon = ship.Lon,
                Lat = ship.Lat,
                HeadingChange = ship.HeadingChange
            };
        }

        public static Expression<Func<ShipViewerOnMap.Domain.Entities.Ship, GetShipByIdDto>> GetShipByIdExpression()
        {
            return ship => new GetShipByIdDto
            {
                Id = ship.Id,
                ShipName = ship.ShipName,
                ShipType = ship.ShipType,
                Status = ship.Status,
                MMSI = ship.MMSI,
                IMO = ship.IMO
            };
        }
    }
}
