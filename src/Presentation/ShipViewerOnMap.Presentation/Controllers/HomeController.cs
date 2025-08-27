using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ShipViewerOnMap.Application.Abstraction.Services;
using ShipViewerOnMap.Application.Dtos;
using ShipViewerOnMap.Application.Wrappers;
using ShipViewerOnMap.Domain.Entities;
using System.Diagnostics;
using System;
using System.IO;
using System.Linq;

namespace ShipViewerOnMap.Presentation.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        //[HttpGet("SetJson")]
        //public IActionResult SetJson()
        //{
        //    // Read original GeoJSON

        //    var json = System.IO.File.ReadAllText("wwwroot/data/ne_110m_admin_0_countries.json");
        //    var geoData = JObject.Parse(json);

        //    // Create a new GeoJSON object with only required fields
        //    var filteredGeo = new JObject
        //    {
        //        ["type"] = "FeatureCollection",
        //        ["features"] = new JArray(
        //            geoData["features"]
        //            .Select(f => new JObject
        //            {
        //                ["type"] = "Feature",
        //                ["properties"] = new JObject
        //                {
        //                    ["name"] = f["properties"]["NAME"],   // Natural Earth "NAME" field
        //                    ["code"] = f["properties"]["ISO_A2_EH"] // 2-letter country code
        //                },
        //                ["geometry"] = f["geometry"]            // Keep geometry as is
        //            })
        //        )
        //    };

        //    // Save filtered GeoJSON
        //    System.IO.File.WriteAllText("wwwroot/data/countries.json", JsonConvert.SerializeObject(filteredGeo, Formatting.Indented));

        //    return Ok();
        //}
    }
}
