/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

/* GET tasks */
router.get('/activeTasks/:username', taskController.getActiveTasks);

router.get('/taskHistory/:username', taskController.getTaskHistory);
// http://localhost:3000/students/scode/a1234
// : on dynaamisen (muuttuvan) reitti-parametrin edessä
router.post('/', taskController.add);

//id -> user-id
router.post('/addActiveTask/:username', taskController.addActiveTask);

router.post('/addToTaskHistory/:username', taskController.addToTaskHistory);

router.delete('/delActiveTask/:username/:activeTaskId', taskController.deleteActiveTask);

router.delete('/delTaskFromHistory/:username/:activeTaskId', taskController.deleteTaskFromHistory);

// Delete Users tasks
router.delete('/:id', taskController.deleteUsersTasks);

/* res.json( {} ); -> json tiedon lähettämiseen */

module.exports = router;
