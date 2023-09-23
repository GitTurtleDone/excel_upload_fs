using Microsoft.AspNetCore.Mvc;
using excel_upload_be.Models;
using System.Text.Json;
using excel_upload_be.Services;


namespace excel_upload_be.Controllers;

[ApiController]
[Route("[controller]")]
public class AccessExcelUploadDBController : ControllerBase
{

    private readonly ExcelUploadContext _DBContext;

    public AccessExcelUploadDBController(ExcelUploadContext dbContext)
    {
        this._DBContext = dbContext;
    }

    [HttpGet("GetAllFiles")]
    public IActionResult GetAllFiles()
    {
        var allFiles = this._DBContext.DiodeDataFiles.ToList();
        //Console.Write(jsonFolderTree);
        return Ok(allFiles);
    }

    


    [HttpGet("GetFileByID/{ID}")]
    public IActionResult GetFileByID(int ID)
    {
        var file = this._DBContext.DiodeDataFiles.FirstOrDefault(o=>o.FileId==ID);
        return Ok(file);
    }

    [HttpDelete("RemoveFileByID/{ID}")]
    public IActionResult RemoveFileByID(int ID)
    {
        var file = this._DBContext.DiodeDataFiles.FirstOrDefault(o=>o.FileId==ID);
        if (file != null) {
            this._DBContext.Remove(file);
            this._DBContext.SaveChanges();
            return Ok(true);
        }
        else return Ok(false);
    }

    [HttpPost("Create")]
    public IActionResult Create([FromBody] DiodeDataFile _file)
    {
        var file = this._DBContext.DiodeDataFiles.FirstOrDefault(o=>o.FileId==_file.FileId);
        if (file != null) {
            //file.FileId = _file.FileId;
            file.Batch = _file.Batch;
            file.Device = _file.Device;
            file.Diode = _file.Diode;
            file.FileName = _file.FileName;
            _DBContext.SaveChanges();

            return Ok(true);
        }
        else {
            this._DBContext.DiodeDataFiles.Add(_file);
            this._DBContext.SaveChanges();
        }
        return Ok(true);
    }

    [HttpPost("WriteToDatabase")]
    public async Task<IActionResult> WriteToDatabase([FromBody] string jsonFolderTree)
    {
        try
        {
            // Deserialize JSON string to folder tree object
            FolderNode folderTree = JsonSerializer.Deserialize<FolderNode>(jsonFolderTree);

            // Perform asynchronous database operations
            // Example:
            // await _DBContext.SomeDbSet.AddAsync(someEntity);
            // await _DBContext.SaveChangesAsync();

            // Return a success response
            return Ok("Data written to the database");
        }
        catch (Exception ex)
        {
            // Handle any exceptions (e.g., validation, database errors)
            return BadRequest($"Error: {ex.Message}");
        }
    }
}
