const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentID: String,
    name: String,
    phone: String,
    age: Number,
    Section: String,
    fatherName: String,      // Adding father's name field
    fatherMobile: String,    // Adding father's mobile field
    branch: String       // Adding branch field
    // ...other fields
});

module.exports = mongoose.model('Student', studentSchema);
