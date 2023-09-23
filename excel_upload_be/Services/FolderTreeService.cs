using excel_upload_be.Models;
namespace excel_upload_be.Services
{
    public class FolderTreeService: IFolderTreeService
    {
        private readonly ExcelUploadContext _dbContext;
        public FolderTreeService(ExcelUploadContext dbContext)
        {
            _dbContext = dbContext;
        }

        public FolderNode createFolderTree(string folderPath)
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
        public void WriteFolderTreeToDatabase(FolderNode folderNode)
        {
            Console.WriteLine("Went into Folder Tree Service");
            Console.WriteLine(folderNode);
        }
    }
    public class FolderNode
    {
        public string? Name { get; set; }
        public List<string>? Files { get; set; }
        public List<FolderNode>? Subfolders { get; set; }
    }
}