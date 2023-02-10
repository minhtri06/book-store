const { Category, Book } = require("../src/models")
const data = require("./seeder.json")

const seedData = async () => {
    for (let category of Object.keys(data)) {
        const categoryIns = await Category.create({
            name: category
                .replace(/[A-Z]/g, (match) => ` ${match}`)
                .replace(/^./, (match) => match.toUpperCase()),
        })
        for (let book of data[category]) {
            await Book.create({
                title: book.bookTitle,
                price: Number(book.bookPrice),
                available: Number(book.available),
                imageUrl: book.imageUrl,
                description: book.bookDescription,
                categoryId: categoryIns.id,
            })
        }
    }
}

seedData()
