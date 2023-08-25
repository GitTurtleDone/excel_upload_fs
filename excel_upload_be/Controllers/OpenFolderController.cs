using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Win32;
using System.Windows.Forms;

namespace excel_upload_be.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenFolderController : ControllerBase
    {
        [HttpGet(Name = "GetOpenFolder")]
        public IActionResult Get()
        {
            string folderPath = @"./home/giang/projects"; // Replace with your actual logic to retrieve the folder path
            // using (FolderBrowserDialog folderDialog = new FolderBrowserDialog() )
            // {

            // }
            // var dialog = new OpenFileDialog
            //     {
            //         Filter = "Folders|*.none",
            //         CheckFileExists = false,
            //         CheckPathExists = true,
            //         FileName = "Select Folder",
            //         ValidateNames = false
            //     };

            // bool? result = dialog.ShowDialog();

            // if (result == true)
            // {
            //     folderPath = System.IO.Path.GetDirectoryName(dialog.FileName);
            // }
            return Ok(new { folderPath });
        }
    }
}
