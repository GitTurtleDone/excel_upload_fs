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
// using MockQueryable.Moq;
using Moq.EntityFrameworkCore;



// namespace Tests;


// public class AccessExcelUploadDBControllerTests
// {


//     [Test]
//     public void GetAllFilesTest()
//     {
//         using (var mock = AutoMock.GetLoose())
//         {
//             var testDB = new Mock<ExcelUploadContext>();
//             List<DiodeDataFile> expectedFiles = GetSampleFiles();
//             var dbSetMock = new Mock<DbSet<List<DiodeDataFile>>>(); // Mock DbSet<DiodeDataFiles>
//             dbSetMock.As<IQueryable<List<DiodeDataFile>>>().Setup(m => m.Provider).Returns(expectedFiles.AsQueryable().Provider);
//             dbSetMock.As<IQueryable<List<DiodeDataFile>>>().Setup(m => m.Expression).Returns(expectedFiles.AsQueryable().Expression);
//             dbSetMock.As<IQueryable<List<DiodeDataFile>>>().Setup(m => m.ElementType).Returns(expectedFiles.AsQueryable().ElementType);
//             dbSetMock.As<IQueryable<List<DiodeDataFile>>>().Setup(m => m.GetEnumerator()).Returns(() => expectedFiles.AsQueryable().GetEnumerator());
//             // var queryableFiles = expectedFiles.AsQueryable();
//             testDB.Setup(d => d.DiodeDataFiles.ToList()).Returns(expectedFiles);
//             // var controller = new AccessExcelUploadDBController(testDB.Object);
//             // var result = controller.GetAllFiles();
//             // Assert.That(result, Is.Not.Null);
//         }

//     }

//     [Test]
//     public void CreateExistingFileTest()
//     {
//         var testDB = new Mock<ExcelUploadContext>();
//         var existingFile = new DiodeDataFile 
//         {
//             FileId = 1,
//             Batch = "240402"
//         };
//         var testDbSet = new Mock<DbSet<DiodeDataFile>>();
//         testDbSet.Setup(d => d.Find(existingFile.FileId)).Returns(existingFile);
//         // testDB.Setup(d => d.DiodeDataFiles.FirstOrDefault(o => o.FileId == 1)).Returns(existingFile);
//         testDB.Setup(d => d.DiodeDataFiles).Returns(testDbSet.Object);
//         // testDB.Setup(d => d.DiodeDataFiles.FirstOrDefault(It.IsAny<Expression<Func<DiodeDataFile, bool>>>()))
//         //             .Returns((Expression<Func<DiodeDataFile, bool>> predicate) => files.FirstOrDefault(predicate.Compile()));

//         var controller = new AccessExcelUploadDBController(testDB.Object);
//         var newFile = new DiodeDataFile 
//         {
//             FileId = 1,
//             Batch = "Tomorrow"
//         };
//         // var result = controller.Create(newFile);
//         // Assert.IsInstanceOfType
//     }

//     private List<DiodeDataFile> GetSampleFiles()
//     {
//         List<DiodeDataFile> output = new List<DiodeDataFile>
//         {
//             new DiodeDataFile
//             {
//                 FileId = 1,
//                 Batch = "230202"
//             },
//             new DiodeDataFile
//             {
//                 FileId = 2,
//                 Batch = "230509"
//             },
//             new DiodeDataFile
//             {
//                 FileId = 3,
//                 Batch = "231209"
//             }

//         };
//         return output;
//     }
// }

namespace excel_upload_be.Tests
{
    [TestFixture]
    public class AccessExcelUploadDBControllerTests
    {
        private Mock<ExcelUploadContext> _testDb;
        private AccessExcelUploadDBController _testController;
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
            
            _testController = new AccessExcelUploadDBController (_testDb.Object);

        }
        [Test]
        public void GetAllFilesTest()
        {
            
            var expectedFiles = getDiodeDataFiles();
            _testDb.Setup(db =>db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            var result = _testController.GetAllFiles() as OkObjectResult;
            var returnedFiles = result.Value as List<DiodeDataFile>;
            
            Assert.That(result, Is.Not.Null);
            Assert.AreEqual(200, result.StatusCode);
            Assert.IsNotNull(returnedFiles);
            Assert.AreEqual(expectedFiles.Count, returnedFiles.Count);
            // Console.WriteLine(returnedFiles[0].Batch);
        }
        
        [Test]
        public void GetFileByIDTest()
        {
            var expectedFiles = getDiodeDataFiles();
            int requestedFileID = 1; 
            // _testDb.Setup(db =>db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            _testDb.Setup(db => db.DiodeDataFiles).ReturnsDbSet(expectedFiles);
            //for i in range(expectedFiles.Count):
            var result = _testController.GetFileByID(1) as OkObjectResult;
            Assert.That(result, Is.Not.Null);
            Assert.IsType<DiodeDataFile>(result.Value);
            var returnedFile = result.Value as DiodeDataFile;
            
            Assert.AreEqual(returnedFile.FileId, 1);
                
            // var result = _testController.GetFileByID(1) as OkObjectResult;
            // var returnedFile = result.Value as DiodeDataFile;
            // Assert.IsNotNull(result);
            // Assert.AreEqual(200, restult.StatusCode);
            // Assert.AreEqual(returnedFile.Batch, requestedFile.Batch);
        }
        
    }
}