using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShipViewerOnMap.Application.Abstraction.Services.Ship;

namespace ShipViewerOnMap.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShipController : ControllerBase
    {
        private readonly IShipService _shipService;

        public ShipController(IShipService shipService)
        {
            _shipService = shipService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _shipService.GetAllAsync());
        }

        [HttpPost("Create")]
        public async Task<IActionResult> Create(int count)
        {
            var response = await _shipService.CreateAsync(count);
            return StatusCode(StatusCodes.Status201Created, response);
        }

        [HttpPost("Clean")]
        public async Task<IActionResult> Clean()
        {
            var response = await _shipService.CleanDatasAsync();
            return StatusCode(StatusCodes.Status204NoContent, response);
        }

        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            return Ok(await _shipService.GetShipByIdAsync(id));
        }

        [HttpGet("GetRiskyShipPair")]
        public async Task<IActionResult> GetRiskyShipPair(Guid id1,  Guid id2)
        {
            return Ok(await _shipService.GetRiskyShipPair(id1, id2));
        }
    }
}
