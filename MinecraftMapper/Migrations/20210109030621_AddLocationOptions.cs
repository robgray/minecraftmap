using Microsoft.EntityFrameworkCore.Migrations;

namespace MinecraftMapper.Migrations
{
    public partial class AddLocationOptions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasAnvil",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasBed",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasEnchantmentTable",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasEnderChest",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasFurnace",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasPortal",
                table: "Location",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasAnvil",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "HasBed",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "HasEnchantmentTable",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "HasEnderChest",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "HasFurnace",
                table: "Location");

            migrationBuilder.DropColumn(
                name: "HasPortal",
                table: "Location");
        }
    }
}
