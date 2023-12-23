using System;
using System.Collections.Generic;

namespace excel_upload_be.Models;

public partial class ComparisonDetail
{
    public short CompareId { get; set; }

    public string? CompareAttribute { get; set; }

    public string? SPath { get; set; }

    public string? SSheet { get; set; }

    public short? SStartRow { get; set; }

    public short? SStartCol { get; set; }

    public short? SStopRow { get; set; }

    public short? SStopCol { get; set; }

    public string? DPath { get; set; }

    public string? DSheet { get; set; }

    public short? DStartRow { get; set; }

    public short? DStartCol { get; set; }

    public short? DStopRow { get; set; }

    public short? DStopCol { get; set; }
}
