using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.Api.Models;
using MinecraftMapper.Domain.MapGeneration;

namespace MinecraftMapper.Api.Features.Map
{
    [ApiController]
    [Route("api/[controller]")]
    public class MapController : ControllerBase
    {
        [HttpGet("{maximumRingNumber:int}")]
        public ActionResult<IList<MapModel>> Get(int maximumRingNumber)
        {
            var squares = new List<Square>();
            for (var ringNumber = 0; ringNumber < maximumRingNumber; ringNumber++)
            {
                var ring = new Ring(ringNumber);
                squares.AddRange(ring.GetAllSquares());
            }
            
            return Ok(squares.OrderBy(s => s.Number)
                .Select(s => new MapModel
                {
                    MapNumber = s.Number,
                    RingNumber = s.Ring.Number,
                    Bounds = new MapBoundsModel {
                        TopLeft = s.BoundingBox.TopLeft,
                        TopRight = s.BoundingBox.TopRight,
                        BottomRight = s.BoundingBox.BottomRight,
                        BottomLeft = s.BoundingBox.BottomLeft
                    }
                })
                .ToList()
            );
        }
    }
}