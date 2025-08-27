using ShipViewerOnMap.Application.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Dtos.Ship
{
    public sealed class GetAllShipsDto: BaseDto
    {
        public string ShipType { get; set; }
        public int Heading { get; set; }
        public double Speed { get; set; }
        public int Length { get; set; }
        public int Beam { get; set; }
        public double Lon { get; set; }
        public double Lat { get; set; }
        public float HeadingChange { get; set; }
    }
}
