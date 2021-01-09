using System;
using MinecraftMapper.Entities;

namespace MinecraftMapper.MapGeneration
{
    public class MapNumberGenerator : IMapNumberGenerator
    {
        public const int MapSize = 2048;
        public int GetMapNumberFromCoordinate(Coordinate coordinate)
        {
            return 99;
        }
    }
}