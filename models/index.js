// This file is made so that we can export and import all the models together.
// This is a good practice as it reduces no. of lines during importing.

const UserModel = require("./user-model");
const BookModel = require("./book-model");
const nodemon = require("nodemon")

module.exports = { UserModel, BookModel };