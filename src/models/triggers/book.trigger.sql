USE store_dev
GO

CREATE OR ALTER TRIGGER book__insert On Books 
    AFTER INSERT
AS
BEGIN
    UPDATE b
    SET 
        b.authorName = (SELECT a.name FROM authors a WHERE a.id = b.authorId),
        b.categoryName = (SELECT c.name FROM categories c WHERE c.id = b.categoryId)
    FROM books b 
        JOIN inserted i ON b.id = i.id
END
GO

CREATE OR ALTER TRIGGER book__update On Books 
    AFTER UPDATE
AS
BEGIN
    IF UPDATE(authorId) or UPDATE(categoryId)
    BEGIN
        UPDATE b
        SET 
            b.authorName = (SELECT a.name FROM authors a WHERE a.id = b.authorId),
            b.categoryName = (SELECT c.name FROM categories c WHERE c.id = b.categoryId)
        FROM books b 
            JOIN inserted i ON b.id = i.id
    END
END

