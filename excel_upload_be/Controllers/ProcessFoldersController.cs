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
    
    private readonly IFolderTreeService _processFolderService;
    public ProcessFoldersController(IProcessFoldersService processFoldersService)
    {
        _processFolderService = processFoldersService;
    }
    
    [HttpPost("PostProcessBatchFolders")]
    
    public async Task<IActionResult> ProcessBatchFolders([FromBody] List<string> folderTrees)
    {
        string publicFolderPath = @"..\..\PublicFolder";
        FolderNode folderTree;
        
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
    [HttpPost("PostProcessDevFolders")]
    
    public async Task<IActionResult> ProcessDevFolders([FromBody] List<string> devFolders)
    {
        string publicFolderPath = @"..\..\PublicFolder";
        // FolderNode folderTree;
        
        try
        {
            // var formCollection = await Request.ReadFormAsync();
            // var file = formCollection.Files[0];
            Console.WriteLine($"Received devFolders: {devFolders}");
            return Ok("Got the devFolders in .NET");

            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

