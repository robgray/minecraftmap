﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MinecraftMapper.MapGeneration;

namespace MinecraftMapper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class MapController : ControllerBase
    {
        [HttpGet("{maximumRingNumber:int}", Name="GetMaps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Get([FromRoute]int maximumRingNumber)
        {
            var squares = new List<Square>();
            for (var ringNumber = 0; ringNumber < maximumRingNumber; ringNumber++)
            {
                var ring = new Ring(ringNumber);
                squares.AddRange(ring.GetAllSquares());
            }
            
            return Ok(squares.OrderBy(s => s.Number)
                .Select(s => new
                {
                    MapNumber = s.Number,
                    RingNumber = s.Ring.Number,
                    Bounds = new {
                        TopLeft = s.BoundingBox.TopLeft,
                        TopRight = s.BoundingBox.TopRight,
                        BottomRight = s.BoundingBox.BottomRight,
                        BottomLeft = s.BoundingBox.BottomLeft
                    }
                })
                .ToArray());
        }
    }
}