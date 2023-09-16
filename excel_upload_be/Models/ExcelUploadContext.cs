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
    #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
     }   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DiodeDataFile>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("PK__DiodeDat__6F0F989F01B4B6A3");

            entity.HasIndex(e => new { e.Batch, e.Device, e.Diode, e.FileName }, "UQ_Batch_Device_Diode_FileName").IsUnique();

            entity.Property(e => e.FileId)
                .ValueGeneratedNever()
                .HasColumnName("FileID");
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
