--CREATE DATABASE ExcelUpload;
USE ExcelUpload;

/*
DROP TABLE DiodeDataFiles;

CREATE TABLE DiodeDataFiles (
	FileID INT IDENTITY(1,1) PRIMARY KEY,
    Batch VARCHAR(50),
    Device VARCHAR(5),
    Diode VARCHAR(5),
    File_Name VARCHAR(255),
    CONSTRAINT UQ_Batch_Device_Diode_FileName UNIQUE (Batch, Device, Diode, File_Name),
	CONSTRAINT CK_PositiveFileID CHECK(FileID > 0)
);

*/





--INSERT into DiodeDataFiles values ('Batch5', 'Dev02', 'A2', 'Forward2.csv')

SELECT * from DiodeDataFiles
--INSERT into DiodeDataFiles values (2, 'Batch2', 'Dev02', 'A2', 'Forward2.csv')


