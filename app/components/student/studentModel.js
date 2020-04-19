const mongoose = require('mongoose');

const student = {
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    document: {
        type: Number,
        required: false,
        unique: true
    },
    note: {
        type: Number,
        required: true
    },
};

let studentSchema = new mongoose.Schema(student);
let studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;