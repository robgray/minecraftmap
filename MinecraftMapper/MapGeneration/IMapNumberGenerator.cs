using MinecraftMapper.Entities;

namespace MinecraftMapper.MapGeneration
{
    public interface IMapNumberGenerator
    {
        int GetMapNumberFromCoordinate(Coordinate coordinate);
    }
}