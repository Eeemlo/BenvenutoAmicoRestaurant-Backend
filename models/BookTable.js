const mongoose = require("mongoose");

// User Schema
const tableSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Registrera användare
tableSchema.statics.add = async function (fullname, email, date, quantity) {
    try {
        const bookTable = new this({fullname, email, date, quantity});
        await bookTable.save();
        return bookTable;
    } catch(error) {
        throw error;
    }
};


const BookTable = mongoose.model("BookTable", tableSchema);
module.exports = BookTable;