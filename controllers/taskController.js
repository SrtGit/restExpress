/* eslint-disable new-cap */

/*
    Controllerissa on tietokantahakujen sovelluslogiikka.

    Kontrolleri on tehty siksi, että saataisiin erotettua reitit ja
    tietokantahakujen sovelluslogiikka toisistaan.
    Saamme aikaan järkevämmän arkkitehtuurin, kun erotamme toiminnaliset kokonaisuudet omiin kansiohinsa.
*/

const Task = require('../models/Task');

const taskController = {
    //GET-pyynnön käyttämä metodi
    findAll: (req, res) => {

        //Haetaan dataa mongo-kannasta
        Task.find({userName: req.params.username })
            .then((tasks) => {
                res.json(tasks);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    //Post-pyynnön käyttämä metodi
    add: (req, res) => {

        //Scheman mukainen olio, josta tehdään Task-objekti
        //req.body sisältää opiskelija-olion, joka tulee clientilta
        const newTask = Task(req.body);

        // save.metodin callback tuottaa err-virheen tai res-vastauksen
        newTask.save((err, task) => {
            if (err) console.error(err);
            else {
                console.log(`Task object added to db ${task}`);
                res.json(task);
            }

        });
    },

    // {
    //     "userName": "Simo",
    //     "activeTasks": [
    //         {
    //             "title": "Otsikkoni",
    //             "description": "Kuvaus",
    //             "alarmDateTime": "12.05.2012",
    //             "repeats": "none"
    //         }
    //         ]
    // }

    deleteUsersTasks: (req, res) => {

        Task.findOneAndRemove({
            userName: req.params.id,
        })
            .then((task) => {
                res.json(task);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    deleteActiveTask: (req, res) => {

        Task.update(
            {userName: req.params.username},
            {$pull: { 'activeTasks': { _id: req.params.activeTaskId } }})
            .then((task) => {
                res.json(task);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    // id -> user-id
    addActiveTask: (req, res)=> {

        Task.findOneAndUpdate({
            userName: req.params.username,
        }, {
            $push: {activeTasks: req.body},
        })
            .then( () => {
                res.send(`New course added to student with id`);
            })
            .catch((err)=> console.log(err));
    },

    // id -> user-id
    addToTaskHistory: (req, res)=> {

        Task.findOneAndUpdate({
            userName: req.params.username,
        }, {
            $push: {taskHistory: req.body},
        })
            .then( () => {
                res.send(`New course added to student with id`);
            })
            .catch((err)=> console.log(err));
    },

    // deleteOne: (req, res) => {

    //     Student.findOneAndRemove({
    //         _id: req.params.id,
    //     })
    //         .then((student) => {
    //             res.json(student);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // },

    // //findOneAndUpdate:n argumentit ovat kaksi oliota:
    // // 1. Valitsee päivitettävän kohteen
    // // 2. Määrittää mitä päivitetään
    // updateSpoints: (req, res) => {

    //     Student.findOneAndUpdate({
    //         _id: req.params.id,
    //     }, {
    //         studypoints: req.params.spoints,
    //     }
    //     )
    //         .then((student) => {
    //             res.json(student);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // },

    // //Lisätään tietylle opiskelijalle uusi kurssi ja arvosana
    // addCourse: (req, res)=> {

    //     Student.findOneAndUpdate({
    //         _id: req.params.id,
    //     }, {
    //         $push: {grades: req.body},
    //     })
    //         .then( () => {
    //             res.send(`New course added to student with id`);
    //         })
    //         .catch((err)=> console.log(err));
    // },

    // updateStudent: (req, res) => {

    //     // findByIdAndUpdate käyttää aina _id:tä päivitykseen
    //     // siksi ei tarvitse erikseen määritellä mihin ensimmäistä argumenttia verrataan
    //     // req-body on koko opiskelija
    //     Student.findByIdAndUpdate( req.params.id, req.body)
    //         .then((student) => {
    //             res.json(student);
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //         });
    // },

};

module.exports = taskController;