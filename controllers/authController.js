const User = require('../models/User')

module.exports.signup_get = (req, res) => {
    res.render('signup', {
        title: 'Sign Up'
    });
}

module.exports.login_get = (req, res) => {
    res.render('login', {
        title: 'Log In'
    });
}

module.exports.signup_post = async (req, res) => {
    const {
        userName,
        password,
        email,
        Bdate,
        role
    } = req.body;

    const user = await User.create({
        userName,
        password,
        email,
        Bdate,
        role
    })

    res.redirect('/');
}
module.exports.login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({
        email,
        password
    });

    if (!user) {
        return res.status(401).send('Invalid email or password');
    }
    res.redirect('/');
}