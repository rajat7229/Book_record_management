const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book_controller");


const router = express.Router();

router.get("/", getAllBooks);

router.get("/:id", getSingleBookById);

router.get("/issued/by-user", getAllIssuedBooks);

router.post("/", addNewBook);

router.put("/:id", updateBookById);

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