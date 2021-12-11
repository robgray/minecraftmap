﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MinecraftMapper.Domain;

namespace MinecraftMapper.Migrator.Migrations
{
    [DbContext(typeof(MapperContext))]
    [Migration("20210109030621_AddLocationOptions")]
    partial class AddLocationOptions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("MinecraftMapper.Api.Entities.Location", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<bool>("HasAnvil")
                        .HasColumnType("bit");

                    b.Property<bool>("HasBed")
                        .HasColumnType("bit");

                    b.Property<bool>("HasEnchantmentTable")
                        .HasColumnType("bit");

                    b.Property<bool>("HasEnderChest")
                        .HasColumnType("bit");

                    b.Property<bool>("HasFurnace")
                        .HasColumnType("bit");

                    b.Property<bool>("HasPortal")
                        .HasColumnType("bit");

                    b.Property<int>("MapNumber")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RealmId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("TypeId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("RealmId");

                    b.HasIndex("TypeId");

                    b.ToTable("Location");
                });

            modelBuilder.Entity("MinecraftMapper.Api.Entities.LocationType", b =>
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

            modelBuilder.Entity("MinecraftMapper.Api.Entities.Realm", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.HasKey("Id");

                    b.ToTable("Realms");
                });

            modelBuilder.Entity("MinecraftMapper.Api.Entities.Location", b =>
                {
                    b.HasOne("MinecraftMapper.Api.Entities.Realm", "Realm")
                        .WithMany("Locations")
                        .HasForeignKey("RealmId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("MinecraftMapper.Api.Entities.LocationType", "Type")
                        .WithMany()
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("MinecraftMapper.Api.Entities.Coordinate", "Coordinate", b1 =>
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

                    b.Navigation("Realm");

                    b.Navigation("Type");
                });

            modelBuilder.Entity("MinecraftMapper.Api.Entities.Realm", b =>
                {
                    b.OwnsOne("MinecraftMapper.Api.Entities.Coordinate", "RespawnLocation", b1 =>
                        {
                            b1.Property<Guid>("RealmId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<int>("X")
                                .HasColumnType("int");

                            b1.Property<int>("Y")
                                .HasColumnType("int");

                            b1.Property<int>("Z")
                                .HasColumnType("int");

                            b1.HasKey("RealmId");

                            b1.ToTable("Realms");

                            b1.WithOwner()
                                .HasForeignKey("RealmId");
                        });

                    b.Navigation("RespawnLocation");
                });

            modelBuilder.Entity("MinecraftMapper.Api.Entities.Realm", b =>
                {
                    b.Navigation("Locations");
                });
#pragma warning restore 612, 618
        }
    }
}
