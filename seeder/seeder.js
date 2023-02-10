const { Category, Book, User } = require("../src/models")
const data = require("./seeder.json")
const { userService } = require("../src/services")

const seedData = async () => {
    for (let category of Object.keys(data)) {
        const categoryIns = await Category.create({
            name: category
                .replace(/[A-Z]/g, (match) => ` ${match}`)
                .replace(/^./, (match) => match.toUpperCase()),
        })
        for (let book of data[category]) {
            try {
                await Book.create({
                    title: book.bookTitle,
                    price: Number(book.bookPrice),
                    available: Number(book.available),
                    imageUrl: book.imageUrl,
                    description: book.bookDescription,
                    categoryId: categoryIns.id,
                })
            } catch (error) {}
        }
    }
}

const createAdmin = async () => {
    await User.create({
        name: "Minh Tri",
        email: "pmtri2@email.com",
        passwordHash: await userService.hashPassword("HaNoiNhoEm123"),
        role: "admin",
    })
}

seedData()
createAdmin()
