using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace excel_upload_be.Models;

public partial class ExcelUploadContext : DbContext
{
    public ExcelUploadContext()
    {
    }

    public ExcelUploadContext(DbContextOptions<ExcelUploadContext> options)
        : base(options)
    {
    }

    public virtual DbSet<DiodeDataFile> DiodeDataFiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DiodeDataFile>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("PK__DiodeDat__6F0F989F5643EDAA");

            entity.HasIndex(e => new { e.Batch, e.Device, e.Diode, e.FileName }, "UQ_Batch_Device_Diode_FileName").IsUnique();

            entity.Property(e => e.FileId).HasColumnName("FileID");
            entity.Property(e => e.Batch)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Device)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.Diode)
                .HasMaxLength(5)
                .IsUnicode(false);
            entity.Property(e => e.FileName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("File_Name");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
