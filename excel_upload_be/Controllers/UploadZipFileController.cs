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


public class UploadZipFileController : ControllerBase
{
    
    private readonly IFolderTreeService _folderTreeService;
    private readonly ExcelUploadContext _DBContext;
    public UploadZipFileController(IFolderTreeService folderTreeService, ExcelUploadContext dbContext)
    {
        _folderTreeService = folderTreeService;
        _DBContext = dbContext;
    }
    
    [HttpPost(Name = "PostUploadZipFile")]
    
    public async Task<IActionResult> Upload()
    {
        string publicFolderPath = @"..\..\PublicFolder";
        FolderNode folderTree;
        
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
                folderTree = _folderTreeService.createFolderTree(copiedFolderPath);
                var jsonFolderTree = new StringContent(JsonSerializer.Serialize(folderTree), Encoding.UTF8, "appliation/json");
                Console.WriteLine("folder tree name: " + folderTree.Name);
                Console.WriteLine("device name: " + folderTree.Subfolders[0].Name);

                List<FolderNode> devFolders = folderTree.Subfolders;
                for (int i = 0; i < devFolders.Count; i++)
                {
                    List<FolderNode> diodeFolders = devFolders[i].Subfolders;
                    //Console.WriteLine(devFolders[i].Name);
                    for (int j = 0; j < diodeFolders.Count; j++)
                    {
                        //Console.Write(diodeFolders[j].Name);
                        List<string> fileNames = diodeFolders[j].Files;
                        for (int k = 0; k < fileNames.Count; k++)
                        {
                            if (Path.GetExtension(fileNames[k]) == ".csv")
                            {
                                var dataFile = new DiodeDataFile
                                {
                                    Batch = folderTree.Name,
                                    Device = devFolders[i].Name,
                                    Diode = diodeFolders[j].Name,
                                    FileName = fileNames[k],
                                };
                                var existingDataFile = _DBContext.DiodeDataFiles.FirstOrDefault(e =>
                                        e.Batch == dataFile.Batch &&
                                        e.Device == dataFile.Device &&
                                        e.Diode == dataFile.Diode &&
                                        e.FileName == dataFile.FileName);
                                if (existingDataFile == null)
                                {
                                    _DBContext.DiodeDataFiles.Add(dataFile);
                                    _DBContext.SaveChanges();
                                    Console.WriteLine ($"Batch: {folderTree.Name}, Device: {devFolders[i].Name}, Diode: {diodeFolders[j].Name}, File Name: {fileNames[k]} successfully added to the database");
                                }
                                else Console.WriteLine("The file is already in the database");
                            }
                        }
                    }

                }
                Console.WriteLine("Successfully added file");  
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

