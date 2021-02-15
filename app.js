const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');



// express app
const app = express();

//connect to mongodb
const dbuRI = 'mongodb+srv://user-1:test@clusterstrukdata-sbdsem.ewtfk.mongodb.net/StrukData-SBD-sem2?retryWrites=true&w=majority';
mongoose.connect(dbuRI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
 .then((result) => console.log('connected to db'))
 .catch((err) => console.log(err))

// listen for requests
app.listen(3000);

//middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});