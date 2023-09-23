using Microsoft.AspNetCore.Mvc;
using excel_upload_be.Models;
using System.Text.Json;
using excel_upload_be.Services;


namespace excel_upload_be.Controllers;

[ApiController]
[Route("[controller]")]
public class WriteFolderTreeToDatabaseController : ControllerBase
{

    private readonly IFolderTreeService _folderTreeService;
    public WriteFolderTreeToDatabaseController(IFolderTreeService folderTreeService)
    {
        _folderTreeService = folderTreeService;
    }
    /*
    [HttpPost("WriteFolderTreeToDatabase")]
    public IActionResult WriteFolderTreeToDatabase([FromBody] FolderNode folderNode)
    {
        
        if (folderNode == null) 
        {
            
            return BadRequest("Invalid folder tree");
        }
        
        _folderTreeService.WriteFolderTreeToDatabase(folderNode);
    }
    */

    [HttpPost("WriteFolderTreeToDatabase")]
    public async Task<IActionResult> WriteFolderTreeToDatabase([FromBody] FolderNode folderNode)
    {
        Console.WriteLine("Went in to WriteFolderTreeToDataBase");
        if (folderNode == null) 
        {
            return BadRequest("Invalid folder tree");
        }
        else
        {
            _folderTreeService.WriteFolderTreeToDatabase(folderNode);
            return Ok("The folder tree written to the database successfully");
        }
    }
}
