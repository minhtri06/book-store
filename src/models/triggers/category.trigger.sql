USE store_dev
GO

CREATE OR ALTER TRIGGER categories__update On Categories 
    AFTER UPDATE
AS
BEGIN
    IF UPDATE(name)
    BEGIN
        UPDATE b
        SET b.categoryName = i.name
        FROM Books b
            JOIN inserted i ON b.categoryId = i.id
    END
END
GO
