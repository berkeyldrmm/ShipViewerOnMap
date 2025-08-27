using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShipViewerOnMap.Application.Wrappers
{
    public sealed record DataResponse<T>(int StatusCode, bool Success, string Message, T Data) : BaseResponse(StatusCode, Success, Message);
}
