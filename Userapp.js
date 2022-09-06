    const express = require('express')
    const mongoose = require('mongoose')
    const router = require('./routes/routes')
    const cookieParser = require('cookie-parser')
    const {requireAuth, checkUser} = require('./middleware/authmiddleware')

    const app=express()

    const DbUrl = ('mongodb+srv://oslim:oslim123@node-auth.zfpxz58.mongodb.net/node-auth')
    // 'mongodb+srv://oslim:<password>@node-auth.zfpxz58.mongodb.net/?retryWrites=true&w=majority'

    mongoose.connect(DbUrl)
    .then((connect)=> console.log('connected'))
    .catch(err => console.log(err, 'ohh noo'))

    app.use(express.static('Public'))
    app.set('view engine', 'ejs');
    app.use(express.json())
    app.use(cookieParser())

    console.log('aliadullali')

    app.listen(3009)
    app.use(router)

    app.get('*', checkUser)  
    app.get('/',(req, res) => {
        res.render('home')
    })
    app.get('/smoothies',requireAuth, (req, res) => {
        res.render('smoothies')
    })




//     app.get('/set-cookies', (req,res)=>{
//         // res.setHeader('Set-cookie', 'newuser=true')
//         // 
//         res.cookie('newuser', false)
//         res.cookie('isEmployeee' , true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true})
//         res.send('you got a new cookies')
//     })

// app.get('/read-cookies', (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies)
//         res.json(cookies)
//     })