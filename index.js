//importing express package
const express = require("express");

const dotenv = require("dotenv");

//database connection
const DBConnection = require("./databaseConnection");

//importing data from users.json
const {users} = require("./data/users.json");

//importing routes
const usersRouter = require("./routes/users");  //users is js file so no need to write extenstion .js
const booksRouter = require("./routes/books");

dotenv.config();

const app = express();

DBConnection();

const PORT = 7229;

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running"
    });
});

app.use("/users", usersRouter);
app.use("/books", booksRouter);

app.get('*', (req, res) => {
    res.status(404).json({
        message: "This route does not exist"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

