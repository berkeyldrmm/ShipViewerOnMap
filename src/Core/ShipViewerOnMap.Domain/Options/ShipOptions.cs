using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Domain.Options
{
    public class ShipOptions
    {
        public List<string> ShipTypes { get; set; }
        public List<string> Statuses { get; set; }
        public string FilePath { get; set; }
        public int ShipCountToAdd { get; set; }
        public int MaxSpeed { get; set; }
        public int MinLength { get; set; }
        public int MaxLength { get; set; }
    }
}
