const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
    {                            //_id is generated automatically in mongoDB when data is added
        name: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        publisher: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
// collection will have a name "Books"
module.exports = mongoose.model("Book", bookSchema);  //created model named Book