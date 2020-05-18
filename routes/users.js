/*

Userin reitit. Käyttäjä pystyy rekisteröitymään
eli lisäämään tunnuksensa kantaan ja kirjautumaan antamalla tunnarinsa.

*/
/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const userCon = require('../controllers/userController'); // user-reittien kontrolleri

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

// rekisteröityminen eli luodaan uudelle käyttäjän tunnarit
router.post('/register', userCon.registerUser);
// kirjautuminen eli autentikaatio tunnareilla
router.post('/login', userCon.authenticateUser);

//{ "_id" : ObjectId("5ebe6cf04fca6a0006cfead5"), "username" : "admin", "password" : "$2a$08$LRCu8O8rh3fOeH67p9/Ll.NgBLqyWdypsOc8aTIYuSdH2jk3LwN4C", "isadmin" : true }

module.exports = router;
