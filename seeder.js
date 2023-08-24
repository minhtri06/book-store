const { User, Category, Book, Author } = require("./src/models")
const { bookService } = require("./src/services")

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const seedUser = async () => {
    await User.bulkCreate([
        {
            name: "Pham Minh Tri",
            username: "admin123",
            password: "admin123",
            role: "admin",
        },
        {
            name: "Nguyen Trong Nghia",
            username: "trongnghia",
            password: "trongnghia",
            role: "user",
        },
        {
            name: "Huong Ngoc Lan",
            username: "ngoclan",
            password: "ngoclan",
            role: "user",
        },
        {
            name: "Pham Ngoc Anh",
            username: "quocbao",
            password: "quocbao",
            role: "user",
        },
        {
            name: "Phan Bao Binh",
            username: "baobinh",
            password: "baobinh",
            role: "user",
        },
        {
            name: "Nguyen Anh Thu",
            username: "anhthu",
            password: "anhthu",
            role: "user",
        },
        {
            name: "Tuan Hoa Hong",
            username: "saleManager",
            password: "saleManager",
            role: "salesManager",
        },
    ])
}

const seedAuthor = async () => {
    await Author.bulkCreate([
        { name: "Pham Minh Tri" },
        { name: "Pham Trung Tin" },
        { name: "Nguyen Quang Nhut" },
        { name: "Huynh Nhat Quoc Bao" },
        { name: "Nguyen Ngoc Nhu Y" },
        { name: "Nguyen Ho Phuong Thanh" },
    ])
}

const seedCategory = async () => {
    await Category.bulkCreate([
        { name: "Hentai" },
        { name: "Science" },
        { name: "Humanity" },
        { name: "Alo alo" },
        { name: "History" },
        { name: "Van hoc" },
    ])
}

const seedBook = async () => {
    const books = [
        {
            title: "Cuoc Tinh Trong Con Mua",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Cau truc du lieu va giai thuat",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Hat giong tam hon",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Huong Ngoc Lan",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Mot Minh",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Cuoc Doi Cua Pham Minh Tri",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Tinh Yeu Bong Toi",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Chien Tranh Viet Nam",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Bi Kip Luyen Rong",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Attack On Titan",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "강수지 - 너의 또 다른 모습에",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Saturday Night",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Fly Me To The Moon",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Hello Darkness My Old Friend",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "She's Gone",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
        {
            title: "Take On Me",
            price: randInt(50, 200),
            count: randInt(10, 40),
            authorId: randInt(1, 6),
            categoryId: randInt(1, 6),
            image: "",
        },
    ]
    for (let book of books) {
        await bookService.createBook(book)
    }
}

const seed = async () => {
    await seedUser()
    await seedAuthor()
    await seedCategory()
    await seedBook()
}

seed()
