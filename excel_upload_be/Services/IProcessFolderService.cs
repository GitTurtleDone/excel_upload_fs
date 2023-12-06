namespace excel_upload_be.Services;
public interface IProcessFoldersService
{
       string FolderPath {get;set;}

}

public interface IProcessBatchFoldersService: IProcessFoldersService
{
    public string[] ComparedFolderPaths { get; set;}
    public string TemplateFolderPath {get; set;}
    public string[] SBDTypes {get; set;}
    public void ProcessComparisonFolder (bool fOverrideDestination = true, int fStartRow = 3, int fEndRow = 130);
    public void uploadOneSheet ((string, string, int, int, int, int) source, (string, string, int, int, int, int) destination);
}
public interface IProcessDevFoldersService: IProcessFoldersService
{
    public void processDeviceFolder(string fUploadDetailTemplatePath = "../UploadDetailsTemplate.csv", 
                                    string fSBDTemplateFolderPath = "../SBDExcelTemplates", bool OverrideDestination = true);
}

public interface IProcessSBDFoldersService: IProcessFoldersService
{
    public string SBDTemplateFolderPath {get; set;}
    public void processSBDFolder(string fUploadDetailTemplatePath ="../UploadDetailsTemplate.csv",
                                 string fSBDTemplateFolderPath = "../SBDExcelTemplates",
                                 bool OverrideDestination = true);
    public void getAllCsvFileNames();
    
}