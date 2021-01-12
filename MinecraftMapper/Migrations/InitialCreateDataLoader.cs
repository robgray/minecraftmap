using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public static class InitialCreateDataLoader
    {
        public static void LoadInitialData(this MigrationBuilder builder)
        {
            builder.InsertLocationType(Guid.NewGuid(), "", "Base");
            builder.InsertLocationType(Guid.NewGuid(), "", "Bed");
            builder.InsertLocationType(Guid.NewGuid(), "", "City");
            builder.InsertLocationType(Guid.NewGuid(), "", "Cave Opening");
            builder.InsertLocationType(Guid.NewGuid(), "", "Pillager Base");
            builder.InsertLocationType(Guid.NewGuid(), "", "Point of Interest");
            builder.InsertLocationType(Guid.NewGuid(), "", "Portal");
            builder.InsertLocationType(Guid.NewGuid(), "", "Town");
        }
    }
}