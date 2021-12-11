using MinecraftMapper.Domain.MapGeneration;
using Xunit;

namespace MinecraftMapper.Tests
{
    public class RingTests
    {
        [Theory]
        [InlineData(1, 0, 0)]
        [InlineData(2, 0, 1)]
        [InlineData(3, 1, 1)]
        [InlineData(4, 1, 0)]
        [InlineData(5, 1, -1)]
        [InlineData(6, 0, -1)]
        [InlineData(7, -1, -1)]
        [InlineData(8, -1, 0)]
        [InlineData(9, -1, 1)]
        [InlineData(10, -1, 2)]
        [InlineData(11, 0, 2)]
        [InlineData(12, 1, 2)]
        [InlineData(13, 2, 2)]
        [InlineData(14, 2, 1)]
        [InlineData(15, 2, 0)]
        [InlineData(16, 2, -1)]
        [InlineData(17, 2, -2)]
        [InlineData(18, 1, -2)]
        [InlineData(19, 0, -2)]
        [InlineData(20, -1, -2)]
        [InlineData(21, -2, -2)]
        [InlineData(22, -2, -1)]
        [InlineData(23, -2, 0)]
        [InlineData(24, -2, 1)]
        [InlineData(25, -2, 2)]
        public void SquareNumberIsCorrectFromRing(int number, int x, int y)
        {
            var ring = Ring.GetRingForSquareNumber(number);
            var coords = ring.GetCoordinatesForSquareNumber(number);

            Assert.True(coords.X == x && coords.Y == y);
        }
    }
}