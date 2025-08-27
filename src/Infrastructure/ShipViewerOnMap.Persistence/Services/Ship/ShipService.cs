using Microsoft.Extensions.Options;
using NetTopologySuite.Features;
using NetTopologySuite.Geometries;
using NetTopologySuite.IO;
using ShipViewerOnMap.Application.Abstraction.Repository.Ship;
using ShipViewerOnMap.Application.Abstraction.Services.Ship;
using ShipViewerOnMap.Application.Dtos.Ship;
using ShipViewerOnMap.Application.Mappings.Ship;
using ShipViewerOnMap.Application.Wrappers;
using ShipViewerOnMap.Domain.Entities;
using ShipViewerOnMap.Domain.Options;
using System.Net;

namespace ShipViewerOnMap.Persistence.Services.Ship
{
    public class ShipService : IShipService
    {
        private readonly IShipRepository _repository;
        public ShipOptions _options;

        public ShipService(IShipRepository repository, IOptions<ShipOptions> options)
        {
            _repository = repository;
            _options = options.Value;
        }

        public async Task<BaseResponse> CleanDatasAsync()
        {
            await _repository.CleanDatasAsync();
            return new BaseResponse((int)HttpStatusCode.OK, true, "Ship data cleaned successfully");
        }

        public async Task<BaseResponse> CreateAsync(int count)
        {
            List<string> shipTypes = _options.ShipTypes;
            List<string> statuses = _options.Statuses;

            string geoJson = File.ReadAllText(_options.FilePath);
            var reader = new GeoJsonReader();
            var featureCollection = reader.Read<FeatureCollection>(geoJson);
            var factory = new GeometryFactory();

            var random = new Random();
            var ships = new List<ShipViewerOnMap.Domain.Entities.Ship>();

            while (ships.Count < count)
            {
                double lat = random.NextDouble() * 180 - 90;
                double lon = random.NextDouble() * 360 - 180;
                var shipCount = ships.Count;

                var point = factory.CreatePoint(new Coordinate(lon, lat));

                bool isInOcean = featureCollection.Any(f => f.Geometry.Contains(point));

                if (isInOcean)
                {
                    var ship = new ShipViewerOnMap.Domain.Entities.Ship
                    {
                        MMSI = $"{random.Next(0, 1000000000):D9}",
                        ShipName = $"SHIP_{random.Next(0, 1000000000):D9}",
                        IMO = $"{random.Next(0, 10000000):D7}",
                        Lat = lat,
                        Lon = lon,
                        Heading = random.Next(0, 360),
                        Speed = Math.Round(random.NextDouble() * 20, 2),
                        Status = statuses[random.Next(statuses.Count)],
                        ShipType = shipTypes[random.Next(shipTypes.Count)],
                        Length = random.Next(_options.MinLength, _options.MaxLength)
                    };

                    ship.Beam = random.Next(ship.Length / 8, ship.Length / 5);

                    ships.Add(ship);
                }
            }

            await _repository.InsertAsync(ships);
            _ = await _repository.SaveChangesAsync();

            return new BaseResponse((int)HttpStatusCode.OK, true, "Ships created successfully");
        }

        public async Task<DataResponse<List<GetAllShipsDto>>> GetAllAsync()
        {
            var datas = await _repository.GetAllAsync(ShipMapper.GetAllShipsExpression());
            return new DataResponse<List<GetAllShipsDto>>((int)HttpStatusCode.OK, true, "All ships received successfully.", datas)
            {
                Data = datas
            };
        }

        public async Task<DataResponse<List<string>>> GetRiskyShipPair(Guid id1, Guid id2)
        {
            var data = await _repository.GetRiskyShipPair(id1, id2);
            return new DataResponse<List<string>>((int)HttpStatusCode.OK, true, "Ship pair received successfully.", data);
        }

        public async Task<DataResponse<GetShipByIdDto>> GetShipByIdAsync(Guid id)
        {
            var data = await _repository.GetByIdAsync(id, ShipMapper.GetShipByIdExpression());
            return new DataResponse<GetShipByIdDto>((int)HttpStatusCode.OK, true, "Ship received successfully.", data);
        }
    }
}
