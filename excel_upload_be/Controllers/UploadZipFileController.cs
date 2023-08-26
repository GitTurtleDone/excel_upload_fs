using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.IO.Compression;

namespace excel_upload_be.Controllers;


[ApiController]
[Route("[controller]")] 


public class UploadZipFileController : ControllerBase
{
    [HttpPost(Name = "PostUploadZipFile")]
    public async Task<IActionResult> Upload()
    {
        string publicFolderPath = @"..\PublicFolder";
        try
        {
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files[0];

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fileExtension = Path.GetExtension(fileName);

                // Generate a unique file name (optional)
                //var uniqueFileName = Guid.NewGuid().ToString() + fileExtension;

                var filePath = Path.Combine( publicFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                Console.WriteLine($"Copied .zip file path: {filePath}");
                Console.WriteLine($"Copied .zip folder path: {Path.ChangeExtension(filePath,null)}");
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

                return Ok(new { fileName, fileExtension });
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
    // public IActionResult Post([FromForm] IFormFile file)
    // {
    //     string tempFilePath = Path.GetTempFileName();
    //     using (var stream = new FileStream(tempFilePath, FileMode.Create))
    //     {
    //         file.CopyTo(stream);
    //     }

    //     string fileName = Path.GetFileName(tempFilePath);
    //     string publicFolderPath = @"..\PublicFolder";
    //     string destinationPath = Path.Combine(publicFolderPath, fileName);

    //     System.IO.File.Copy(tempFilePath, destinationPath, true);
    //     System.IO.File.Delete(tempFilePath);

    //     return Ok (new { message = "File uploaded succesfully"});
    // }
}