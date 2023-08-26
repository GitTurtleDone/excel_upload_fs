using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.Win32;
//using Gtk;
//using System.Windows.Forms;
//using ElectronNET.API;
//using ElectronNET.API.Entities;

namespace excel_upload_be.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpenFolderController : ControllerBase
    {
        [HttpGet(Name = "GetOpenFolder")]
        public IActionResult Get()
        {
            string folderPath = @""; // Replace with your actual logic to retrieve the folder path
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
            // var browserWindowOptions = new BrowserWindowOptions
            // {
            //     Show = false,
            //     WebPreferences = new WebPreferences
            //     {
            //         NodeIntegration = true
            //     }
            // };

            // var browserWindow = Electron.WindowManager.CreateWindowAsync(browserWindowOptions).Result;
            // browserWindow.OnReadyToShow += () => browserWindow.Show();

            // Application.Init();

            // // Create a new dialog to select a folder
            // var dialog = new FileChooserDialog(
            //     "Select a Folder",
            //     null,
            //     FileChooserAction.SelectFolder,
            //     "Cancel", ResponseType.Cancel,
            //     "Select", ResponseType.Accept
            // );

            // // Run the dialog and get the response
            // int response = dialog.Run();
            // string folderPath = "";

            // if (response == (int)ResponseType.Accept)
            // {
            //     folderPath = dialog.Filename;
            // }

            // // Clean up and destroy the dialog
            // dialog.Destroy();
            // Application.Quit();
            return Ok(new { folderPath });
        }
    }
}
