const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');


// express app
const app = express();

//connect to mongodb
const dbuRI = 'mongodb+srv://user-1:test@clusterstrukdata-sbdsem.ewtfk.mongodb.net/StrukData-SBD-sem2?retryWrites=true&w=majority';
mongoose.connect(dbuRI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
 .then((result) => app.listen(3000))
 .catch((err) => console.log(err))




// register view engine
app.set('view engine', 'ejs');

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded ({ extended: true}));
app.use(morgan('dev'));

//routes 
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

//blog Routes
app.use('/blogs', blogRoutes);



// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});