using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrator.Migrations
{
    public partial class AddSeedAndGameEditionToRealm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Edition",
                table: "Realms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "Seed",
                table: "Realms",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Edition",
                table: "Realms");

            migrationBuilder.DropColumn(
                name: "Seed",
                table: "Realms");
        }
    }
}
