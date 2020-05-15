/* eslint-disable new-cap */

/*
    Controllerissa on tietokantahakujen sovelluslogiikka.

    Kontrolleri on tehty siksi, että saataisiin erotettua reitit ja
    tietokantahakujen sovelluslogiikka toisistaan.
    Saamme aikaan järkevämmän arkkitehtuurin, kun erotamme toiminnaliset kokonaisuudet omiin kansiohinsa.
*/

const Student = require('../models/Student');

const studentController = {
    //GET-pyynnön käyttämä metodi
    findAll: (req, res) => {

        //Haetaan dataa mongo-kannasta
        Student.find()
            .then((students) => {
                res.json(students);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    //Post-pyynnön käyttämä metodi
    add: (req, res) => {

        //Scheman mukainen olio, josta tehdään Student-objekti
        //req.body sisältää opiskelija-olion, joka tulee clientilta
        const NewStudent = Student(req.body);

        // save.metodin callback tuottaa err-virheen tai res-vastauksen
        NewStudent.save((err, student) => {
            if (err) console.error(err);
            else {
                console.log(`Student object added to db ${student}`);
                res.json(student);
            }

        });
    },
    //Haetaan opiskelija opiskelunumeron (studentcode) perusteella
    findByScode: (req, res) => {

        //Haetaan dataa mongo-kannasta
        //req.params.scode - ottaa url:issa tulleen opiskelijan numeron
        Student.findOne({studentcode: req.params.scode})
            .then((student) => {
                res.json(student);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    findById: (req, res) => {

        //Haetaan dataa mongo-kannasta
        //req.params.id - ottaa url:issa tulleen id:n
        Student.findOne({_id: req.params.id})
            .then((student) => {
                res.json(student);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    deleteOne: (req, res) => {

        Student.findOneAndRemove({
            _id: req.params.id,
        })
            .then((student) => {
                res.json(student);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    //findOneAndUpdate:n argumentit ovat kaksi oliota:
    // 1. Valitsee päivitettävän kohteen
    // 2. Määrittää mitä päivitetään
    updateSpoints: (req, res) => {

        Student.findOneAndUpdate({
            _id: req.params.id,
        }, {
            studypoints: req.params.spoints,
        }
        )
            .then((student) => {
                res.json(student);
            })
            .catch((err) => {
                console.error(err);
            });
    },

    //Etsitään kaikki, joilla on vähemmän kuin sata opiskelijapistettä
    findAllLt100: (req, res) => {

        Student.find().where('studypoints').lt(100)
            .then((students) => {
                console.log(students);
                res.json(students);
            })
            .catch((err) => {
                console.error(err);
            });
    },
    //Lisätään tietylle opiskelijalle uusi kurssi ja arvosana
    addCourse: (req, res)=> {

        Student.findOneAndUpdate({
            _id: req.params.id,
        }, {
            $push: {grades: req.body},
        })
            .then( () => {
                res.send(`New course added to student with id`);
            })
            .catch((err)=> console.log(err));
    },

    //Uuden kurssi-arvosanan lisäys / eli kurssin muokkaus
    //Etsi kurssin id:n avulla muokattava kurssi

    //EI TOIMI
    updateCourse: (req, res) => {

        Student.findOneAndUpdate({
            'grades._id': req.params.id,
        }, {
            $set: {'grades.grade': req.params.newgrade},
        })
            .then( (course) => {
                if (course == null) res.send('nothing found');
                res.send(`Course grade updated`);
            })
            .catch((err)=> console.log(err));
    },

    updateStudent: (req, res) => {

        // findByIdAndUpdate käyttää aina _id:tä päivitykseen
        // siksi ei tarvitse erikseen määritellä mihin ensimmäistä argumenttia verrataan
        // req-body on koko opiskelija
        Student.findByIdAndUpdate( req.params.id, req.body)
            .then((student) => {
                res.json(student);
            })
            .catch((err) => {
                console.error(err);
            });
    },

};

module.exports = studentController;