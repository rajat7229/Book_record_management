const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {                            //_id is generated automatically in mongoDB when data is added
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        issuedBook: {
            type: mongoose.Schema.Types.ObjectId, // Relation of 2 DBs //taking _id from books colection
            ref: "Book",
            required: false
        },
        issuedDate: {
            type: String,
            required: false
        },
        returnDate: {
            type: String,
            required: false
        },
        subscriptionType:{
            type: String,
            required: true
        },
        subscriptionDate: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
// collection will have a name "Users"
module.exports = mongoose.model("User", userSchema);  //created model named User