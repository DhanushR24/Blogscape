const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getProfilePic =()=> {
    
    const picPaths = {
        0: 'images/animals/bird.svg',
        1: 'images/animals/lion.svg',
        2: 'images/animals/llama.svg',
        3: 'images/animals/orangutan.svg',
        4: 'images/animals/rabbit.svg',
        5: 'images/animals/snake.svg',
        6: 'images/animals/white-jaguar.svg',
        7: 'images/animals/wolf.svg',
        8: 'images/animals/owl.svg',
        9: 'images/animals/panda.svg',
        10: 'images/animals/penguin.svg',
        11: 'images/animals/lizard.svg',
        12: 'images/animals/dog.svg',
        13: 'images/animals/deer.svg',
    };
    
    const num = Math.floor(Math.random() * 14);
    return picPaths[num];
}
const handleError = (err) => {
    const error = {
        userName: '',
        email: '',
        password: '',
        Bdate: ''
    };

    if (err.message === 'Invalid email') {
        error.email = 'Invalid email';
    }
    if (err.message === 'Invalid password') {
        error.password = 'Invalid password';
    }

    if (err.code === 11000) {
        error.email = 'Email already exists';
        return error;
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({
            properties
        }) => {
            error[properties.path] = properties.message;
        })
    }
    return error;
}

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

    const profile = getProfilePic();

    try {
        const user = await User.create({
            userName,
            password,
            email,
            Bdate,
            role,
            profile
        })

        console.log(user);

        res.cookie('jwt', jwt.sign({
            id: user._id
        }, 'secret salt', {
            expiresIn: 3 * 24 * 60 * 60
        }), {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            user: user._id
        });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({
            errors
        });
    }

}
module.exports.login_post = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        const user = await User.findOne({
            email
        });

        if (!user) {
            throw new Error('Invalid email');
        } else {
            if (user.password !== password) {
                throw new Error('Invalid password');
            }
            res.cookie('jwt', jwt.sign({
                id: user._id
            }, 'secret salt', {
                expiresIn: 3 * 24 * 60 * 60
            }), {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
        }
        res.status(200).json({
            user: user._id
        });
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({
            errors
        });
    }
}

module.exports.logout_get = (req, res) => {
    res.clearCookie('jwt');
    res.redirect('/');
}