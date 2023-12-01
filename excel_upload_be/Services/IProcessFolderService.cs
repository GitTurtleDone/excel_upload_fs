namespace excel_upload_be.Services;
public interface IProcessFoldersService
{
    FolderNode createFolderTree(string folderPath);
    void WriteFolderTreeToDatabase(FolderNode strFolderTree);
}