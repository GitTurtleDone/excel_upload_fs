namespace excel_upload_be.Services;
public interface IProcessFoldersService
{
       string FolderPath {get;set;}

}

public interface IProcessDevFoldersService: IProcessFoldersService
{
    public void processDeviceFolder(string fUploadDetailTemplatePath = "../UploadDetailsTemplate.csv", 
                                    string fSBDTemplateFolderPath = "../SBDExcelTemplates", bool OverrideDestination = true);
}