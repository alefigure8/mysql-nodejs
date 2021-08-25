const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session')
const MySQLStore = require('express-mysql-session'); //Save session
const { database } = require('./keys') //Database
const passport = require('passport');



//INITIALIZATION
const app = express();
require('./lib/passport');


//SETTING
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultlayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(session({
    secret: 'secretmysql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash())
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//GLOBAL VARIABLES
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user
    next();
});

//ROUTES
app.use(require('./routes/index'));
app.use(require('./routes/auth'));
app.use('/links', require('./routes/links'));

//PUBLIC
app.use(express.static(__dirname + '/public'));

//LISTEN
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})