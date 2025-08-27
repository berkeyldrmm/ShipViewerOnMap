using ShipViewerOnMap.Application.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Dtos.Ship
{
    public sealed class GetShipByIdDto : BaseDto
    {
        public string ShipName { get; set; }
        public string ShipType { get; set; }
        public string Status { get; set; }
        public string MMSI { get; set; }
        public string IMO { get; set; }
    }
}
