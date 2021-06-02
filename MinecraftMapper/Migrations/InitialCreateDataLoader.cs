using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public static class InitialCreateDataLoader
    {
        public static void LoadInitialData(this MigrationBuilder builder)
        {
            builder.InsertLocationType(Guid.NewGuid(), "red", "Base");
            builder.InsertLocationType(Guid.NewGuid(), "blue", "Bed");
            builder.InsertLocationType(Guid.NewGuid(), "black", "City");
            builder.InsertLocationType(Guid.NewGuid(), "orange", "Cave Opening");
            builder.InsertLocationType(Guid.NewGuid(), "grey", "Pillager Base");
            builder.InsertLocationType(Guid.NewGuid(), "blue", "Point of Interest");
            builder.InsertLocationType(Guid.NewGuid(), "purple", "Portal");
            builder.InsertLocationType(Guid.NewGuid(), "green", "Town");
        }
    }
}