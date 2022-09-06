const Users = require('../Model/usermodel')
const jwt = require('jsonwebtoken')



/* validate error */
const handleErr = (err) => {
    // console.log(err.message, err.code)
    let errors = { email: '', password: '' }

    /* incorrect email */
    if (err.message === 'Incorrect password') {
        errors.password='Incorrect password'
    }
    if (err.message === 'Incorrect Email') {
        errors.email='Incorrect Email'
    }
    /* incorrect email end */

    /* Duplicate Email Err */
        if (err.code === 11000) {
            errors.email = 'Email Already Exits'
            return errors
        }
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
       })
    }
    return errors;
}
    const maxAge = 3 * 24 * 60 * 60 

    /* Token create */
    const createToken = (id)=>{
        return jwt.sign({ id }, 'this is my first time using node and this is my secret code', {
            expiresIn: maxAge 
        })
    }
      /* Token create end */

module.exports.SignUpGet = (req, res) => {
    res.render('signup')
}
module.exports.LoginUpGet = (req, res) => {
    res.render('login')
}
module.exports.SignUPost = async (req, res) => {
    const { email, password } = req.body
    // console.log(req.body)
    try {
        const user = await Users.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({user: user._id})
      
       
    } catch (err) {
        const errorMessage = handleErr(err)
        // console.log(errorMessage)
        res.status(400).json({errorMessage})
    }
}
module.exports.LoginUpPost = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const user = await Users.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({user: user._id})
    } catch (err) {
        const errorMessage = handleErr(err)
        /* COMING BACK */
        // let errorhold = err.message
        // // console.log(errorhold)
        res.status(404).json({errorMessage})
    }
}
module.exports.logoutGet = (req, res) => {
        res.redirect('/')
        res.cookie('jwt', '', 1)
        
    } 