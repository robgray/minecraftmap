using MinecraftMapper.Domain.Entities;

namespace MinecraftMapper.Domain.MapGeneration
{
    public interface IMapNumberGenerator
    {
        int GetMapNumberFromCoordinate(Coordinate coordinate);
    }
}