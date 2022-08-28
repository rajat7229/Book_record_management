const express = require("express");
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    });
});

router.get("/:id", (req, res) => {
    const {id} = req.params;

    const book = books.find((each) => each.id ===id);

    if(!book) {
        return res.status(404).json({
            success: true,
            message: "Book not found"
        });
    }
    return res.status(200).json({
        success: true,
        data: book
    });
});

router.get("/issued/by-user", (req, res) => {
    const usersWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) return each;
    });

    const issuedBooks = [];
    usersWithIssuedBooks.forEach((each) => {
        const book = books.find((book) => book.id === each.issuedBook);

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });

    if (issuedBooks.length === 0)
    return res.status(404).json({
        success: false,
        message: "No books issued yet"
    });
    return res.status(200).json({
        success: true,
        data: issuedBooks 
    });

});

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

module.exports = router;