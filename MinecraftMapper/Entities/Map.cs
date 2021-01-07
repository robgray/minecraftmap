using System;

namespace MinecraftMapper.Entities
{
    public class Map : EntityBase
    {
        public int MapNumber { get; private set; }
        public Coordinate SouthWestBound { get; set; }
        public Coordinate NorthEastBound { get; set; }
        
        public Guid? NorthMapId { get; private set; }
        public Map NorthMap { get; private set; }
        
        public Guid? SouthMapId { get; private set; }
        public Map SouthMap { get; private set; }
        
        public Guid? EastMapId { get; private set; }
        public Map EastMap { get; private set; }
        
        public Guid? WestMapId { get; private set; }
        public Map WestMap { get; private set; }

        public Map ExpandMapWest()
        {
            if (WestMap == null) return WestMap;
            var westMap = new Map()
            {
                Id = Guid.NewGuid()
            };

            WestMapId = westMap.Id;
            WestMap = westMap;

            return WestMap;
        }

        public Map ExpandMapEast()
        {
            if (EastMap == null) return EastMap;
            var eastMap = new Map()
            {
                Id = Guid.NewGuid()
            };

            EastMapId = eastMap.Id;
            EastMap = eastMap;

            return EastMap;
        }

        public Map ExpandMapNorth()
        {
            if (NorthMap == null) return NorthMap;
            var northMap = new Map()
            {
                Id = Guid.NewGuid()
            };

            NorthMapId = northMap.Id;
            NorthMap = northMap;

            return NorthMap;
        }
        
        public Map ExpandMapSouth()
        {
            if (SouthMap == null) return SouthMap;
            var southMap = new Map()
            {
                Id = Guid.NewGuid()
            };

            SouthMapId = southMap.Id;
            SouthMap = southMap;

            return SouthMap;
        }
    }
}