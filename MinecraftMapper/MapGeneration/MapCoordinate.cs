﻿namespace MinecraftMapper.MapGeneration
{
    public class MapCoordinate 
    {
        public MapCoordinate(int x, int y) 
        {
            X = x;
            Y = y;
        }
        public int X { get; set; }
        public int Y { get; set; }

        public override string ToString() => $"({X},{Y})";
    }
}