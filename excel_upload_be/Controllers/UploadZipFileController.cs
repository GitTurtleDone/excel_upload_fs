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
//using excel_upload_be.Services;

namespace excel_upload_be.Controllers;


[ApiController]
[Route("[controller]")] 


public class UploadZipFileController : ControllerBase
{
    [HttpPost(Name = "PostUploadZipFile")]
    // private readonly HttpClient _httpClient;

    // public UploadZipFileController (IHttpClientFactory httpClientFactory)
    // {
    //     _httpClient = httpClientFactory.CreateClient();
    // }
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
                
                folderTree = createFolderTree(copiedFolderPath);
                jsonFolderTree = JsonSerializer.Serialize(folderTree);
                Console.WriteLine(folderTree.Name);
                Console.WriteLine(folderTree.Subfolders[0].Name);
                static FolderNode createFolderTree(string folderPath)
                {
                    DirectoryInfo directoryInfo = new DirectoryInfo(folderPath);
                    FolderNode folderNode = new FolderNode
                    {
                        Name = directoryInfo.Name,
                        Files = directoryInfo.GetFiles().Select(fileInfo => fileInfo.Name).ToList(),
                        Subfolders = new List<FolderNode>()
                    };

                    foreach(var subdirectoryInfo in directoryInfo.GetDirectories())
                    {       
                        FolderNode subfolderNode = createFolderTree(subdirectoryInfo.FullName);
                        folderNode.Subfolders.Add(subfolderNode);

                    }
                    return folderNode;  
                }

                // //return Ok(new { fileName, fileExtension });
                // // Set the content type to application/json
                // _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                // // Make an HTTP POST request to the Controller2 endpoint
                // HttpResponseMessage response = await _httpClient.PostAsync("https://localhost:7200/AccessExcelUploadDB/GetAllFiles", new StringContent(jsonData, Encoding.UTF8, "application/json"));

                // // Check the response status
                // if (response.IsSuccessStatusCode)
                // {
                //     // Request was successful
                //     var responseContent = await response.Content.ReadAsStringAsync();
                //     return Ok(responseContent);
                // }
                // else
                // {
                //     // Request failed
                //     return BadRequest("Failed to send data to Controller2");
                // }
                        
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
public class FolderNode
{
    public string Name { get; set; }
    public List<string> Files { get; set; }
    public List<FolderNode> Subfolders { get; set; }
}
