using System;
using MinecraftMapper.Entities;

namespace MinecraftMapper.MapGeneration
{
    public class MapNumberGenerator : IMapNumberGenerator
    {
        // TODO: We'll need to configure the map size (2048) and the offset.
        // These are currently found in Square.
        public int GetMapNumberFromCoordinate(Coordinate coordinate) =>
            Square.CreateFromCoordinate(new MapCoordinate(coordinate.X, coordinate.Y)).Number;

    }
}