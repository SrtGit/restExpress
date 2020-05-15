/*
students.js on reititystiedosto (router), joka tarjoaa REST-apin
Tietokantaoperaatiot ovat kontrollerin metodeissa

Student-datan muokkauksen mahdollistavat reitit on suojattu authorize -metodilla
joten muokkaamaan pääsy vaatii kirjautumisen
*/

/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const studentController = require('../controllers/studentController');

const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

/* GET students. */
router.get('/', studentController.findAll);

// http://localhost:3000/students/scode/a1234
// : on dynaamisen (muuttuvan) reitti-parametrin edessä
router.get('/scode/:scode', studentController.findByScode);

router.get('/:id', studentController.findById);

//Find all students with less than 100 studypoints
router.get('/lt/100', studentController.findAllLt100);

// POST toteutetaan juureen localhost:3000/students
// Data, joka halutaan lisätä kantaan, lähetetään POST-requestilla serverille

//authorize-funktio suoritetaan ennenkuin suoritetaan controllerissa oleva metodi
router.post('/', authorize, studentController.add);

// Delete
router.delete('/:id', authorize, studentController.deleteOne);

// Update
router.put('/:id/:spoints', authorize, studentController.updateSpoints);

//Add course to a given student
router.post('/addcourse/:id', authorize, studentController.addCourse);

//Update a given course
router.put('/updatecourse/:id/:newgrade', authorize, studentController.updateCourse);

// Update Student
router.put('/:id', authorize, studentController.updateStudent);
// router.get('/restapi', (req, res, next) => {
// });

/* res.json( {} ); -> json tiedon lähettämiseen */

module.exports = router;
