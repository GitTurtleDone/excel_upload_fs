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
    
    private readonly IProcessBatchFoldersService _processBatchFoldersService;
    private readonly IProcessDevFoldersService _processDevFoldersService;
    private readonly IProcessSBDFoldersService _processSBDFoldersService;
    public ProcessFoldersController(IProcessBatchFoldersService processBatchFoldersService,IProcessDevFoldersService processDevFoldersService,
    IProcessSBDFoldersService processSBDFoldersService)
    {
        _processBatchFoldersService = processBatchFoldersService;
        _processDevFoldersService = processDevFoldersService;
        _processSBDFoldersService = processSBDFoldersService;
    }
    
    // [HttpPost("PostCreateComparisonUploadDetailCSVFile")]
    // public async Task<IActionResult> CreateComparisonUploadDetailCSVFile([FromBody] List<string> comparisonExcelFiles)
    // {

    // }
    
    [HttpPost("PostCompareExcelFiles")]
    
    public async Task<IActionResult> CompareExcelFiles([FromBody] List<string> comparisonExcelFiles)
    {
        string publicFolderPath = @"../../PublicFolder/";//
        // FolderNode folderTree;
        
        try
        {
            // var formCollection = await Request.ReadFormAsync();
            // var file = formCollection.Files[0];
            _processBatchFoldersService.ResetProperties();
            Console.WriteLine(comparisonExcelFiles);
            if (comparisonExcelFiles != null && comparisonExcelFiles.Count > 0) {
                comparisonExcelFiles = comparisonExcelFiles.Select(excelFile =>excelFile  = publicFolderPath + excelFile).ToList(); //publicFolderPath +
                List<List<string>> comparisonUploadDetails = _processBatchFoldersService.createComparisonUploadDetailCSVFile(comparisonExcelFiles);
                //_processBatchFoldersService.ProcessComparisonFolder();
                return Ok(comparisonUploadDetails);
            } else {
                Console.WriteLine("No excel files were selected");
                return Ok("No excel files were selected");}
            //Console.WriteLine(comparisonExcelFiles[0]);
            
            
            

            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpPost("PostProcessDevFolders")]
    
    public async Task<IActionResult> ProcessDevFolders([FromBody] List<string> devFolders)
    {
        string publicFolderPath = @"../../PublicFolder/";
        // FolderNode folderTree;
        
        try
        {
            
            devFolders.ForEach((devFolderPath) => {
                devFolderPath = publicFolderPath + devFolderPath;
                Console.WriteLine($"Received devFolder: {devFolderPath}");
                _processDevFoldersService.ResetProperties();
                _processDevFoldersService.FolderPath = devFolderPath;
                _processDevFoldersService.processDeviceFolder();
                
            });
            
            return Ok("Got the devFolders in .NET");

            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpPost("PostProcessSBDFolders")]
    
    public async Task<IActionResult> ProcessSBDFolders([FromBody] List<string> SBDFolders)
    {
        string publicFolderPath = @"../../PublicFolder/";
        // FolderNode folderTree;
        
        try
        {
            
            SBDFolders.ForEach((SBDFolderPath) => {
                SBDFolderPath = publicFolderPath + SBDFolderPath;
                Console.WriteLine($"Received SBDFolder: {SBDFolderPath}");
                _processSBDFoldersService.ResetProperties();
                _processSBDFoldersService.FolderPath = SBDFolderPath;
                _processSBDFoldersService.processSBDFolder();
                
            });
            
            return Ok("Got the SBDFolders in .NET");

            
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

