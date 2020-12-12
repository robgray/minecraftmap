using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public static class InitialCreateDataLoader
    {
        public static void LoadInitialData(this MigrationBuilder builder)
        {
            builder.InsertLocationType(Guid.NewGuid(), "", "Town");
            builder.InsertLocationType(Guid.NewGuid(), "", "City");
            builder.InsertLocationType(Guid.NewGuid(), "", "Portal");
            builder.InsertLocationType(Guid.NewGuid(), "", "Base");
            builder.InsertLocationType(Guid.NewGuid(), "", "Shack");
            builder.InsertLocationType(Guid.NewGuid(), "", "Bed-rest");
            builder.InsertLocationType(Guid.NewGuid(), "", "Cave Opening");
            builder.InsertLocationType(Guid.NewGuid(), "", "Portal");
            builder.InsertLocationType(Guid.NewGuid(), "", "Point of Interest");
            builder.InsertLocationType(Guid.NewGuid(), "", "Temple - Ocean");
            builder.InsertLocationType(Guid.NewGuid(), "", "Temple - Jungle");
        }
    }
}