const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

// Mongoose skeema tarjoaa MongoDb:n tiedoille tietomallin ja validoinnin sekä rajoittimia


const StudentSchema = new mongoose.Schema({

    //regexin aloitusmerkki on ^ ja lopetusmerkki on $, niitä ennen tai jälkeen ei saa olla merkkejä
    studentcode: {type: String, unique: true, required: true, match: /^[a-z]{1}[0-9]{4}$/},

    name: {type: String, required: true, max: 80},

    email: {type: String, unique: true, required: true, max: 80, match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ },

    studypoints: {type: Number, required: false, min: 0, max: 300},

    grades: {type: [GradeSchema], required: true},

});

//Schemasta pitää tehdä model, josta kanta tehdään

const Student = mongoose.model('Student', StudentSchema);

//export model
module.exports = Student;