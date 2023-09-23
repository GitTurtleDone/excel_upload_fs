namespace excel_upload_be.Services;
public interface IFolderTreeService
{
    FolderNode createFolderTree(string folderPath);
    void WriteFolderTreeToDatabase(FolderNode strFolderTree);
}