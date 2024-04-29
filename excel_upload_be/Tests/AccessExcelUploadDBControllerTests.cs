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
    public class AccessExcelUploadDBControllerTests
    {   
        private Mock<ExcelUploadContext> _testDb;
        private AccessExcelUploadDBController _testController;

        // Get a sample list of DiodeDataFiles for testing
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
            //Create a mocked database
            _testDb = new Mock<ExcelUploadContext>();
            //Create a mocked controller ating upon the mocked database
            _testController = new AccessExcelUploadDBController (_testDb.Object);

        }
        [Test]
        public void GetAllFilesTest()
        {
            
            var expectedFiles = getDiodeDataFiles();
            _testDb.Setup(db =>db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            var result = _testController.GetAllFiles() as OkObjectResult;
            Assert.That(result, Is.Not.Null);
            var returnedFiles = result.Value as List<DiodeDataFile>;
            Assert.That(result.StatusCode, Is.EqualTo(200));
            Assert.That(returnedFiles, Is.Not.Null);
            Assert.That(returnedFiles, Has.Count.EqualTo(expectedFiles.Count));
        }
        
        [Test]
        public void GetFileByIDTest()
        {
            var expectedFiles = getDiodeDataFiles();
            int testFileId = 1;
            //_testDb.Setup(db => db.DiodeDataFiles.FirstOrDefault(f=>f.FileId==testFileId)).Returns(expectedFiles[testFileId]);
            _testDb.Setup(db => db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            // Assert the FileID of the returned file are correct for all DiodeDataFiles
            // in expected Files
            for (int i = 0; i < expectedFiles.Count; i++)
            {
                var result = _testController.GetFileByID(i+1) as OkObjectResult;
                Assert.That(result, Is.Not.Null);
                Assert.IsInstanceOf<OkObjectResult>(result);
                //Assert.That(result, Is.InstanceOf<OkObjectResult>);
                var returnedFile = result.Value as DiodeDataFile;
                //Assert.AreEqual(returnedFile.FileId, i + 1);   
                Assert.That(returnedFile.FileId, Is.EqualTo(i + 1)); 
            }
            var resultNull = _testController.GetFileByID(expectedFiles.Count+1) as OkObjectResult;
            Assert.That(resultNull.Value,Is.Null);
        }
        [Test]
        public void CreateTest()
        {
            int saveChangesCallCount = 0;
            var newFile = new DiodeDataFile 
            {
                FileId = 4,
                Batch = "240409"
            };
            var oldFile = new DiodeDataFile
            {
                FileId = 3,
                Batch = "231209"
            };
            var expectedFiles = getDiodeDataFiles();
            
            _testDb.Setup(d => d.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            _testDb.Setup(db => db.SaveChanges())
                    .Callback(() => saveChangesCallCount++);
            // test the case, when the file already exists
            var resultOk = _testController.Create(oldFile) as OkObjectResult;
            Assert.That(resultOk, Is.Not.Null);
            Assert.That(resultOk.Value, Is.EqualTo(true));
            var allFilesResult = _testController.GetAllFiles() as OkObjectResult;
            Assert.That(allFilesResult.Value, Has.Count.EqualTo(expectedFiles.Count));
            // test the case, when the file doesn't exist
            resultOk = _testController.Create(newFile) as OkObjectResult ;
            Assert.That(resultOk, Is.Not.Null);
            Assert.That(resultOk.Value, Is.EqualTo(true));
            _testDb.Verify(db => db.DiodeDataFiles.Add(newFile), Times.Once); 
            _testDb.Verify(db => db.SaveChanges(), Times.Exactly(2));
            Assert.That(saveChangesCallCount, Is.EqualTo(2)); 
        }
        [Test]
        public void RemoveFileByIDTest()
        {
            var expectedFiles = getDiodeDataFiles();
            List<int> lstFileIds = [];
            foreach(var file in expectedFiles)
            {
                lstFileIds.Add(file.FileId);
            }
            int removedFileID, saveChangesCount = 0;
            _testDb.Setup(db => db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            _testDb.Setup(db => db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            _testDb.Setup(db => db.Remove(It.IsAny<DiodeDataFile>()))
                    .Callback<DiodeDataFile>((DiodeDataFile diodeDataFile) => removedFileID = diodeDataFile.FileId);
            _testDb.Setup(db => db.SaveChanges())
                   .Callback(() => saveChangesCount++);       
            var resultOk = _testController.RemoveFileByID(0) as OkObjectResult;
            for (int i = 1; i < 6; i++)
            {
                resultOk = _testController.RemoveFileByID(i) as OkObjectResult;
                Assert.That(resultOk, Is.Not.Null);
                if (lstFileIds.Contains(i))
                {
                    Assert.That(resultOk.Value, Is.EqualTo(true));
                } else
                {
                    Assert.That(resultOk.Value, Is.EqualTo(false));
                }
                _testDb.Verify(db=>db.SaveChanges(), Times.Exactly(saveChangesCount));
            }
        }
    }
}