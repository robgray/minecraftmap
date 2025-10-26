using System;
using MinecraftMapper.MapGeneration;
using Xunit;

namespace MinecraftMapper.Tests
{
    using Shouldly;

    public class SquareTests
    {
        [Theory]
        [InlineData(4, 5114, 87)]
        [InlineData(1, 4000, 1000)]
        [InlineData(6, 3000, 3000)]
        [InlineData(2, 3000, -1000)]
        [InlineData(23, -1000, 1540)]
        [InlineData(24, -1000, -1540)]
        [InlineData(56, 9000, -6700)]
        [InlineData(37, 9000, 6900)]
        [InlineData(8, Square.OffsetX - 1, Square.OffsetY)]
        [InlineData(2, Square.OffsetX, Square.OffsetY - 1)]
        [InlineData(1, Square.OffsetX, Square.OffsetY)]
        [InlineData(4, Square.OffsetX + Square.SideLength, Square.OffsetY  + 1)]
        [InlineData(9, 47, -500)]
        [InlineData(27, 1332, -5489)]
        [InlineData(29, 5649, -5508)]
        public void MapNumberIsCorrectForMinecraftCoordinate(int mapNumber, int xCoord, int yCoord)
        {
            var square = Square.CreateFromCoordinate(new MapCoordinate(xCoord, yCoord));
            
            square.Number.ShouldBe(mapNumber);
        }

        [Theory]
        [InlineData(1, 2114, 87)]
        [InlineData(9, 47, -500)]
        public void MapNumberContainsMinecraftCoordinate(int mapNumber, int xCoord, int yCoord)
        {
            var square = Square.CreateFromNumber(mapNumber);
            square.Contains(new MapCoordinate(xCoord, yCoord)).ShouldBeTrue();
        }

        [Theory]
        [InlineData(9, -1, 1)]
        public void SquareNumberIsCorrectForSquareCoords(int squareNumber, int xCoord, int yCoord)
        {
            var square = new Square(xCoord, yCoord);
            square.Number.ShouldBe(squareNumber);
        }
    }
}