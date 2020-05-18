/*
students.js on reititystiedosto (router), joka tarjoaa REST-apin
Tietokantaoperaatiot ovat kontrollerin metodeissa

Student-datan muokkauksen mahdollistavat reitit on suojattu authorize -metodilla
joten muokkaamaan pääsy vaatii kirjautumisen
*/

/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

// const authorize = require('../verifytoken'); // authorisointi eli vahvistetaan token

/* GET students. */
router.get('/:username', taskController.findAll);

// http://localhost:3000/students/scode/a1234
// : on dynaamisen (muuttuvan) reitti-parametrin edessä
router.post('/', taskController.add);

//id -> user-id
router.post('/addActiveTask/:username', taskController.addActiveTask);

router.post('/addToTaskHistory/:username', taskController.addToTaskHistory);

router.delete('/delActiveTask/:username/:activeTaskId', taskController.deleteActiveTask);
//router.get('/:id', taskController.findById);

// POST toteutetaan juureen localhost:3000/students
// Data, joka halutaan lisätä kantaan, lähetetään POST-requestilla serverille

// //authorize-funktio suoritetaan ennenkuin suoritetaan controllerissa oleva metodi
// router.post('/', authorize, studentController.add);

// Delete Users tasks
router.delete('/:id', taskController.deleteUsersTasks);

// // Update
//router.put('/:id', taskController.updateTask);

// //Add course to a given student
// router.post('/addcourse/:id', authorize, studentController.addCourse);

// //Update a given course
// router.put('/updatecourse/:id/:newgrade', authorize, studentController.updateCourse);

// // Update Student
// router.put('/:id', authorize, studentController.updateStudent);
// // router.get('/restapi', (req, res, next) => {
// // });

/* res.json( {} ); -> json tiedon lähettämiseen */

module.exports = router;
