using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public static class MigrationBuilderInsertHelpers
    {
        public static void InsertLocationType(this MigrationBuilder migrationBuilder, Guid id, string iconClass, string name)
        {
            migrationBuilder.InsertData(
                table: "LocationTypes",
                columns: new [] { "Id", "IconClass", "Name"},
                values: new object[] { id, iconClass, name });
        }
    }
}