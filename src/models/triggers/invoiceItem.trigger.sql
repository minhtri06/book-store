USE store_dev
GO

CREATE OR ALTER TRIGGER invoice_item__insert On invoiceItems 
    AFTER INSERT
AS
BEGIN
    UPDATE ii
    SET 
        ii.price = b.price,
        ii.totalPrice = b.price * ii.quantity
    FROM invoiceItems ii
        JOIN inserted i ON ii.invoiceId = i.invoiceId AND ii.bookId = i.bookId
        JOIN books b ON ii.bookId = b.id
    
    UPDATE inv
    SET inv.totalPayment = (
        SELECT SUM(i.totalPrice) 
        FROM invoiceItems i 
        WHERE i.invoiceId = inv.id
    ) 
    FROM invoices inv
    WHERE inv.id IN (SELECT invoiceId FROM inserted)

    UPDATE b
    SET b.count = b.count - i.quantity
    FROM books b JOIN inserted i ON b.id = i.bookId
END
GO
