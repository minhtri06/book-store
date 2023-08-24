USE store_dev
GO

CREATE OR ALTER TRIGGER authors__update On Authors 
    AFTER UPDATE
AS
BEGIN
    IF UPDATE(name)
    BEGIN
        UPDATE b
        SET b.authorName = i.name
        FROM Books b
            JOIN inserted i ON b.authorId = i.id
    END
END
GO
