using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;
using System.IO.Compression;
using System.Text.Json;
using System.Net.Http;
using System.Net.Http.Headers;
using excel_upload_be.Models;
using excel_upload_be.Services;
using System.Text;
namespace excel_upload_be.Controllers;


[ApiController]
[Route("[controller]")] 


public class ProcessFoldersController : ControllerBase
{
    
    private readonly IFolderTreeService _folderTreeService;
    private readonly ExcelUploadContext _DBContext;
    public ProcessFoldersController(IFolderTreeService folderTreeService, ExcelUploadContext dbContext)
    {
        _folderTreeService = folderTreeService;
        _DBContext = dbContext;
    }
    
    [HttpPost(Name = "PostProcessBatchFolders")]
    
    public async Task<IActionResult> ProcessBatchFolders([FromBody] List<string> folderTrees)
    {
        // string publicFolderPath = @"..\..\PublicFolder";
        // FolderNode folderTree;
        
        try
        {
            // var formCollection = await Request.ReadFormAsync();
            // var file = formCollection.Files[0];
            Console.WriteLine(folderTrees[0]);
            return Ok("Got the folderTrees in .NET");

            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

