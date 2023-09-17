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
namespace excel_upload_be.Controllers;


[ApiController]
[Route("[controller]")] 


public class UploadZipFileController : ControllerBase
{
    
    private readonly IFolderTreeService _folderTreeService;
    public UploadZipFileController(IFolderTreeService folderTreeService)
    {
        _folderTreeService = folderTreeService;
    }
    
    [HttpPost(Name = "PostUploadZipFile")]
    
    public async Task<IActionResult> Upload()
    {
        string publicFolderPath = @"..\..\PublicFolder";
        FolderNode folderTree;
        string jsonFolderTree;
        try
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files[0];

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fileExtension = Path.GetExtension(fileName);

                var filePath = Path.Combine( publicFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                Console.WriteLine($"Copied .zip file path: {filePath}");
                
                string extractionPath = publicFolderPath + "\\";
                Console.WriteLine($"Extracted folder path: {extractionPath}");
                using (var archive = ZipFile.OpenRead(filePath))
                {
                    
                    
                    foreach (var entry in archive.Entries)
                    {
                        string entryPath = Path.Combine(extractionPath, entry.FullName);
                        Directory.CreateDirectory(Path.GetDirectoryName(entryPath));

                        if (!string.IsNullOrEmpty(entry.Name)) // Check if the entry is not a directory
                        {
                            entry.ExtractToFile(entryPath, true);
                        }
                        }
                }

                Console.WriteLine("Extraction complete.");
                string copiedFolderPath = Path.ChangeExtension(filePath,null) + "\\";
                Console.WriteLine($"Copied .zip folder path: {copiedFolderPath}");
                
                
                using (var client = new HttpClient())
                {
                    folderTree = _folderTreeService.createFolderTree(copiedFolderPath);
                    jsonFolderTree = JsonSerializer.Serialize(folderTree);
                    Console.WriteLine("folder tree name: " + folderTree.Name);
                    Console.WriteLine("device name: " + folderTree.Subfolders[0].Name);
                    // var response = await client.PostAsync("https://localhost:7200/WriteFolderTreeToDataBase", jsonFolderTree);

                    // if (response.IsSuccessStatusCode)
                    // {
                    //     // The data was successfully written to the database
                    // }
                    // else
                    // {
                    //     // Handle the error
                    // }
                }

                

                
                        
                return Ok(new {jsonFolderTree});
            }
            else
            {
                return BadRequest("File is empty.");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}

