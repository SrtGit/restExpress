const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentsRouter = require('./routes/students');

const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Yhteys kantaan tämän voisi myös toteuttaa toisessa kansiossa

mongoose.connect( process.env.DB_CONN, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (err) {
        console.log('Yhteys ei toimi. Tuli virhe ' + err);
    } else {
        console.log('Yhteys kantaan toimii');
    }
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Yksinkertaisin tapa ottaa cors-moduuli käyttöön kaikille reiteille
// on mahdollista tehdä myös rajoituksia mitä reittejä saa käyttää
// Cors-sallii resurssien jaon kahden eri palvelimella olevan sovelluksen välillä
// -Jos sovellukset on samalla palvelimella ei cors-moduulia tarvitse!
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students', studentsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
