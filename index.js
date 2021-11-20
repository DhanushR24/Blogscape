const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const port = process.env.PORT || 5000;


const authRoutes = require('./routers/authRoutes');

// const User = require('./models/User')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'));

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://dinesh19:c2zjkgKvCxxTaHZ@nodetuts.djld1.mongodb.net/blogscape?retryWrites=true&w=majorityc2zjkgKvCxxTaHZ';
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('index', {
    title: 'home'
}));


app.use(authRoutes)

app.use((req, res) => {
    res.render('404', {
        title: 'Error'
    })
});