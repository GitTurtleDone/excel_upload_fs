--CREATE DATABASE ExcelUpload;
USE ExcelUpload;

/*
DROP TABLE DiodeDataFiles;

CREATE TABLE ComparisonDetails (
	CompareID SMALLINT IDENTITY(1,1) PRIMARY KEY,
    CompareAttribute VARCHAR(50),
	sPath VARCHAR(255),
    sSheet VARCHAR(50),
    sStartRow SMALLINT,
	sStartCol SMALLINT,
    sStopRow SMALLINT,
	sStopCol SMALLINT,
    dPath VARCHAR(255),
	dSheet VARCHAR(50),
    dStartRow SMALLINT,
	dStartCol SMALLINT,
    dStopRow SMALLINT,
	dStopCol SMALLINT,
	CONSTRAINT CK_PositiveCompareID CHECK(CompareID > 0)
);

--USE TABLE dbComparisonDetails






--INSERT into DiodeDataFiles values ('Batch5', 'Dev02', 'A2', 'Forward2.csv')

--SELECT * from DiodeDataFiles
--INSERT into DiodeDataFiles values (2, 'Batch2', 'Dev02', 'A2', 'Forward2.csv')
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev100',	7,1,511,2,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev100I',	3,1,507,2)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev100',	7,1,511,1,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev100J',	3,1,507,1)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev100',	7,7,511,7,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev100J',	3,2,507,2)

INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRev',	11,18,1214,19,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','ForNRevI',	3,1,1206,2)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRev',	11,18,1214,18,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','ForNRevJ',	3,1,1206,1)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRev',	11,20,1214,20,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','ForNRevJ',	3,2,1206,2)


INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','CVaRev100',	12,11,134,17,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','CV_C',	3,1,125,7)

INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev500',	3,1,509,1,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev500I',	3,1,509,1)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev500',	3,3,509,3,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev500I',	3,2,509,2)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev500',	3,1,509,1,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev500J',	3,1,509,1)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Rev500',	3,7,509,7,'	../IrOxOASRecVsNonRec/A_0050um.xlsx','Rev500J',	3,2,509,2)

UPDATE ComparisonDetails
SET dPath = '../ComparisonExcelTemplates/ComparisonMaster.xlsx'
WHERE CompareID BETWEEN 1 AND 16


INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRevARev500WO',	11,18,1214,19,'../ComparisonExcelTemplates/ComparisonMaster.xlsx','ForNRevARev500J',	3,1,1206,2)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRevARev500WO',	11,18,1214,18,'../ComparisonExcelTemplates/ComparisonMaster.xlsx','ForNRevARev500J',	3,1,1206,1)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','ForNRevARev500WO',	11,20,1214,20,'../ComparisonExcelTemplates/ComparisonMaster.xlsx', 'ForNRevARev500J',	3,2,1206,2)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Summary',	5,2,5,24,'../ComparisonExcelTemplates/ComparisonMaster.xlsx', 'Summary',	5,2,5,24)
INSERT into dbo.ComparisonDetails values('0', '../230216_Fab230215/230414_Fab230215IrOxNonRecess/Dev07/A21/Fab230215IrOxNonRecess_Dev07_A21.xlsx','Summary',	5,28,5,28,'../ComparisonExcelTemplates/ComparisonMaster.xlsx', 'Summary',	5,2,5,28)

UPDATE ComparisonDetails
SET dStartCol = 28
WHERE CompareID = 16
*/

SELECT * from ComparisonDetails


