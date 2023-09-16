using System;
using System.Collections.Generic;

namespace excel_upload_be.Models;

public partial class DiodeDataFile
{
    public int FileId { get; set; }

    public string? Batch { get; set; }

    public string? Device { get; set; }

    public string? Diode { get; set; }

    public string? FileName { get; set; }
}
