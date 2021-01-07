using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public partial class RespawnLocation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Maps_MapId",
                table: "Location");

            migrationBuilder.DropIndex(
                name: "IX_Location_MapId",
                table: "Location");

            migrationBuilder.AddColumn<int>(
                name: "RespawnLocation_X",
                table: "Maps",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RespawnLocation_Y",
                table: "Maps",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RespawnLocation_Z",
                table: "Maps",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "RealmId",
                table: "Location",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Location_RealmId",
                table: "Location",
                column: "RealmId");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Maps_RealmId",
                table: "Location",
                column: "RealmId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Maps_RealmId",
                table: "Location");

            migrationBuilder.DropIndex(
                name: "IX_Location_RealmId",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "RespawnLocation_X",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "RespawnLocation_Y",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "RespawnLocation_Z",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "RealmId",
                table: "Location");

            migrationBuilder.CreateIndex(
                name: "IX_Location_MapId",
                table: "Location",
                column: "MapId");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Maps_MapId",
                table: "Location",
                column: "MapId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
