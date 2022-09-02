const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const { getAllBooks, getSingleBookById, getAllIssuedBooks } = require("../controllers/book_controller");


const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBookById);

router.get("/issued/by-user", getAllIssuedBooks);

router.post("/", (req, res) => {
    const {data} = req.body;
    if (!data){
        return res.status(404).json({
        success: false,
        message: "No data provided"
    });
    }
    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(401).json({
            success: "false",
            message: "Book exists with this id"
        });
    }

    // const allBooks = [...books, data];  //instead of push
    books.push(data);
    return res.status(201).json({
        success: true,
        data: books           // or allBooks
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);

    if(!book) {
        return res.status(400).json({
            success: false,
            message: "book not found with this id"
        });
    }

    const updatedData = books.map((each) => {
        if (each.id === id) {
            return {...each, ...data};
        }
        return each;
    });

    return res.status(200).json({
        success: true,
        data: updatedData
    });
});

router.get("/issued/withFine", (req, res) => {
    const usersWithIssuedBooksWithFine = users.filter((each) => {
        if (each.issuedBook) return each;
    });

    const issuedBooksWithFine = [];

    usersWithIssuedBooksWithFine.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;


        const getDateInDays = (data = "") => {
            let date;
            if (data === "") {
                date = new Date();
            } else {
                date = new Date(data);
            }
            let days = Math.floor(date / (1000 * 60 * 60 * 24)); //1000 is for milliseconds
            return days;
        };

        let returnDate = getDateInDays(each.returnDate);

        let currentDate = getDateInDays();

        if (returnDate < currentDate) {
            issuedBooksWithFine.push(book);
        }
    });

    if (issuedBooksWithFine.length === 0) {
        return res.status(404).json({
            Success: false,
            Message: "No books which have fine",
        });
    }

    return res.status(200).json({
        Success: true,
        Message: "Issued Books List which have fine",
        Data: issuedBooksWithFine,
    });
});

module.exports = router;