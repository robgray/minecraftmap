using System;
using MinecraftMapper.MapGeneration;
using Xunit;

namespace MinecraftMapper.Tests
{
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
        public void MapNumberIsCorrectForMinecraftCoordinate(int mapNumber, int xCoord, int yCoord)
        {
            var square = Square.CreateFromCoordinate(new MapCoordinate(xCoord, yCoord));
            
            Assert.Equal(mapNumber, square.Number);
        }

        [Theory]
        [InlineData(1, 2114, 87)]
        [InlineData(9, 47, -500)]
        public void MapNumberContainsMinecraftCoordinate(int mapNumber, int xCoord, int yCoord)
        {
            var square = Square.CreateFromNumber(mapNumber);
            Assert.True(square.Contains(new MapCoordinate(xCoord, yCoord)));
        }

        [Theory]
        [InlineData(9, -1, 1)]
        public void SquareNumberIsCorrectForSquareCoords(int squareNumber, int xCoord, int yCoord)
        {
            var square = new Square(xCoord, yCoord);
            Assert.Equal(squareNumber, square.Number);
        }
    }
}