using NUnit.Framework;
using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Autofac.Extras.Moq;
using excel_upload_be.Models;
using excel_upload_be.Controllers;
using System.Collections.Generic;
using System.Data.Common;
using Microsoft.Identity.Client;
namespace Tests;


public class AccessExcelUploadDBControllerTests
{
    
    [Test]
    public void GetAllFilesTest()
    {
        using (var mock = AutoMock.GetLoose())
        {
            var testDB = new Mock<ExcelUploadContext>();
            List<DiodeDataFile> expectedFiles = GetSampleFiles();
            testDB.Setup(d => d.DiodeDataFiles.ToList()).Returns(expectedFiles);
            var controller = new AccessExcelUploadDBController(testDB.Object);
            var result = controller.GetAllFiles();
            Assert.IsNotNull(result);
        }

    }
    private List<DiodeDataFile> GetSampleFiles()
    {
        List<DiodeDataFile> output = new List<DiodeDataFile>
        {
            new DiodeDataFile
            {
                FileId = 1,
                Batch = "230202"
            },
            new DiodeDataFile
            {
                FileId = 2,
                Batch = "230509"
            },
            new DiodeDataFile
            {
                FileId = 3,
                Batch = "231209"
            }

        };
        return output;
    }
}

