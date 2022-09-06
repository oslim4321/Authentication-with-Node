const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please input an email'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: [isEmail, 'please input a valid email']
    },
    password: {
        type: String,
        required: [true,'please input a password'],
        minlength: [7, 'Minimum password is 7'],
        trim: true,
    }
})
    /* Fire a function before  something is save to the database */
    userSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt()
         /* This <--- key word is pointing to the data of the user signing up */
        this.password = await bcrypt.hash(this.password, salt)
        // console.log(this.password)
        next()
    })

    /* static method for login user */
    userSchema.statics.login = async function (email, password){
        const user = await this.findOne({ email })
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (auth) {
                return user;
            }
            throw Error('Incorrect password')
        }
        throw Error('Incorrect Email')
    }
    


const Users = mongoose.model('user', userSchema)
module.exports =Users