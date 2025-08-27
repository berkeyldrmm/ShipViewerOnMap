using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Domain.Entities
{
    public class Ship
    {
        public Guid Id { get; set; }
        public string MMSI { get; set; }
        public string ShipName { get; set; }
        public string IMO { get; set; }
        public string ShipType { get; set; }
        public string Status { get; set; }
        public int Heading { get; set; }
        public double Speed { get; set; }
        public int Length { get; set; }
        public int Beam { get; set; }
        public double Lon { get; set; }
        public double Lat { get; set; }
        public float HeadingChange { get; set; }
    }
}
