const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieparser = require('cookie-parser');
const port = process.env.PORT || 5000;
const app = express();

const authRoutes = require('./routers/authRoutes');
// const User = require('./models/User')

const {
    checkUser
} = require('./middleware/authMiddleware');

// middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('tiny'));
app.use(cookieparser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = "mongodb+srv://dinesh19:c2zjkgKvCxxTaHZp@nodetuts.djld1.mongodb.net/blogscape?retryWrites=true&w=majority";
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => app.listen(port))
    .catch((err) => console.log(err));

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('index', {
    title: 'home'
}));

app.use(authRoutes)

app.use((req, res) => {
    res.render('404', {
        title: 'Error'
    })
});