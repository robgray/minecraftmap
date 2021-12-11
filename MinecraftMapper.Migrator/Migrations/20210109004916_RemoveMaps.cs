using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrator.Migrations
{
    public partial class RemoveMaps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Maps_RealmId",
                table: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Maps",
                table: "Maps");

            migrationBuilder.DropColumn(
                name: "MapId",
                table: "Location");

            migrationBuilder.RenameTable(
                name: "Maps",
                newName: "Realms");

            migrationBuilder.AlterColumn<Guid>(
                name: "RealmId",
                table: "Location",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MapNumber",
                table: "Location",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Realms",
                table: "Realms",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Realms_RealmId",
                table: "Location",
                column: "RealmId",
                principalTable: "Realms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Location_Realms_RealmId",
                table: "Location");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Realms",
                table: "Realms");

            migrationBuilder.DropColumn(
                name: "MapNumber",
                table: "Location");

            migrationBuilder.RenameTable(
                name: "Realms",
                newName: "Maps");

            migrationBuilder.AlterColumn<Guid>(
                name: "RealmId",
                table: "Location",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "MapId",
                table: "Location",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_Maps",
                table: "Maps",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Location_Maps_RealmId",
                table: "Location",
                column: "RealmId",
                principalTable: "Maps",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
