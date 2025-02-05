const mongoose = require('mongoose')
const empSchema = new mongoose.Schema({
    eid: Number,
    ename: String,
    age: Number,
    city: String
},
    {
        versionKey: false
    } // Disables the __v field
);

const emp = mongoose.model('Emp', empSchema);
module.exports = emp;