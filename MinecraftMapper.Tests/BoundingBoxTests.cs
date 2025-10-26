using MinecraftMapper.MapGeneration;
using Xunit;

namespace MinecraftMapper.Tests
{
    using Shouldly;

    public class BoundingBoxTests
    {
        [Theory]
        [InlineData(-500, -400, -1000, -1000, 2000, 1500)]
        [InlineData(-1000, -1000, -1000, -1000, 2000, 1500)]
        public void CoordinatesInBoundingBox(int xCoord, int yCoord, int xTopLeft, int yTopLeft, int xBottomRight, int yBottomRight)
        {
            var box = new MapBoundingBox(xTopLeft, yTopLeft, xBottomRight, yBottomRight);
            var coord = new MapCoordinate(xCoord, yCoord);

            box.ContainsCoordinate(coord).ShouldBeTrue();
        }

        [Theory]
        [InlineData(100, -20, 0, 0, 300, 100)]
        [InlineData(-1500, -400, -1000, -1000, 2000, 1500)]
        public void CoordinatesNotInBoundingBox(int xCoord, int yCoord, int xTopLeft, int yTopLeft, int xBottomRight, int yBottomRight)
        {
            var box = new MapBoundingBox(xTopLeft, yTopLeft, xBottomRight, yBottomRight);
            var coord = new MapCoordinate(xCoord, yCoord);

            box.ContainsCoordinate(coord).ShouldBeFalse();
        }
    }
}