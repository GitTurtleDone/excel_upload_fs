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

    public virtual DbSet<ComparisonDetail> ComparisonDetails { get; set; }

    public virtual DbSet<DiodeDataFile> DiodeDataFiles { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DANG-THAI-GIANG;Database=ExcelUpload;Trusted_Connection=True;Integrated Security=True;MultipleActiveResultSets=true;TrustServerCertificate=true;encrypt=false");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ComparisonDetail>(entity =>
        {
            entity.HasKey(e => e.CompareId).HasName("PK__Comparis__1B61D658D19858D9");

            entity.Property(e => e.CompareId).HasColumnName("CompareID");
            entity.Property(e => e.CompareAttribute)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.DPath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("dPath");
            entity.Property(e => e.DSheet)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("dSheet");
            entity.Property(e => e.DStartCol).HasColumnName("dStartCol");
            entity.Property(e => e.DStartRow).HasColumnName("dStartRow");
            entity.Property(e => e.DStopCol).HasColumnName("dStopCol");
            entity.Property(e => e.DStopRow).HasColumnName("dStopRow");
            entity.Property(e => e.SPath)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("sPath");
            entity.Property(e => e.SSheet)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("sSheet");
            entity.Property(e => e.SStartCol).HasColumnName("sStartCol");
            entity.Property(e => e.SStartRow).HasColumnName("sStartRow");
            entity.Property(e => e.SStopCol).HasColumnName("sStopCol");
            entity.Property(e => e.SStopRow).HasColumnName("sStopRow");
        });

        modelBuilder.Entity<DiodeDataFile>(entity =>
        {
            entity.HasKey(e => e.FileId).HasName("PK__DiodeDat__6F0F989FAC3E2AFC");

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
