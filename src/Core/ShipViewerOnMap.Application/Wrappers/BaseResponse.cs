using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Wrappers
{
    public record BaseResponse(int StatusCode,
        bool Success,
        string Message);
}
