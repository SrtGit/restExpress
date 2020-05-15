const mongoose = require('mongoose');

// Mongoose skeema tarjoaa MongoDb:n tiedoille tietomallin ja validoinnin sekä rajoittimia


const UserSchema = new mongoose.Schema({

    //regexin aloitusmerkki on ^ ja lopetusmerkki on $, niitä ennen tai jälkeen ei saa olla merkkejä
    userName: {type: String, unique: true, required: true, match: /^[A-Za-z]+([\ A-Za-z])/},

    password: {type: String, required: true},

    isadmin: {type: Boolean, required: true },


});

//Schemasta pitää tehdä model, josta kanta tehdään

const User = mongoose.model('User', UserSchema);

//export model
module.exports = User;