﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MinecraftMapper;

namespace MinecraftMapper.Migrations
{
    [DbContext(typeof(MapperContext))]
    [Migration("20201212024259_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("MinecraftMapper.Entities.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("MapId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("TypeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("MapId");

                    b.HasIndex("TypeId");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("MinecraftMapper.Entities.LocationType", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("IconClass")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LocationTypes");
                });

            modelBuilder.Entity("MinecraftMapper.Entities.Map", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Maps");
                });

            modelBuilder.Entity("MinecraftMapper.Entities.Location", b =>
                {
                    b.HasOne("MinecraftMapper.Entities.Map", "Map")
                        .WithMany("Locations")
                        .HasForeignKey("MapId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MinecraftMapper.Entities.LocationType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("MinecraftMapper.Entities.Coordinate", "Coordinate", b1 =>
                        {
                            b1.Property<Guid>("LocationId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("X")
                                .HasColumnType("int");

                            b1.Property<int>("Y")
                                .HasColumnType("int");

                            b1.Property<int>("Z")
                                .HasColumnType("int");

                            b1.HasKey("LocationId");

                            b1.ToTable("Location");

                            b1.WithOwner()
                                .HasForeignKey("LocationId");
                        });

                    b.Navigation("Coordinate");

                    b.Navigation("Map");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("MinecraftMapper.Entities.Map", b =>
                {
                    b.Navigation("Locations");
                });
#pragma warning restore 612, 618
        }
    }
}
