const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// express app
const app = express();



//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: true}));
app.use(morgan('dev'));


//passport config
require('./config/passsport')(passport)

//connect to mongodb
const dbURI = require('./config/keys').mongoURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err))




// register view engine
app.set('view engine', 'ejs');




// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash messages
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//routes 
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});



//blog Routes
app.use('/blogs', blogRoutes);
app.use('/users', require('./routes/users.js'));


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});