using NUnit.Framework;
using System;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Autofac.Extras.Moq;
using excel_upload_be.Models;
using excel_upload_be.Controllers;
using excel_upload_be.Services;
using System.Collections.Generic;
using System.Data.Common;
using Microsoft.Identity.Client;
using System.Linq;
using System.Threading.Tasks.Dataflow;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using Moq.EntityFrameworkCore;
using Microsoft.VisualBasic;
using Microsoft.AspNetCore.Http.HttpResults;

namespace excel_upload_be.Tests
{
    [TestFixture]
    

    public class UploadZipFileTests
    {
        private Mock<ExcelUploadContext> _testDb;
        private UploadZipFileController _testController;
        private Mock<IFolderTreeService> _testFolderTreeService;
        private List<DiodeDataFile> getDiodeDataFiles()
        {
            var diodeDataFiles = new List<DiodeDataFile> 
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
            return diodeDataFiles;
        }
        [SetUp]
        public void Setup()
        {
            _testDb = new Mock<ExcelUploadContext>();
            Mock<IFolderTreeService>_testFolderTreeService = new Mock<IFolderTreeService>();//new FolderTreeService(_testDb.Object);
            _testController = new UploadZipFileController(_testFolderTreeService.Object,_testDb.Object);   
        }
        // [Test]
        // public void createFolderTreeTest()
        // {
        //     var folderTree = new FolderNode {Name = "TestBatch"};
        //     _testFolderTreeService.Setup(x => x.createFolderTree(It.IsAny<string>()))
        //     .Returns(folderTree);   
        // }

    }
}