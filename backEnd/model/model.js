const mongoose = require( "mongoose");
const bcrypt =require( 'bcrypt');
const Schema = mongoose.Schema;
const validator= require( 'validator');

//creating schema
const loginSignupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true ,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    }
})


//Signup function : making sure we using function instead of arrow function 
loginSignupSchema.statics.signup = async function (name,email,username,password) {
    //validation first + making sure the form wont be empty
    if (!name && !email && !username && !password) {
        throw Error ('Please fill up the sign up form')
    }
    // is email valid??
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    //is password strong??
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong! Password should include at least one Upper letter,Lower Letter , numbers and signs')
    }
    //username length check??
    if (!validator.isLength(username,{ min: 1, max: 30 })) {
        throw Error('Username should be 1 to 6 charactors')
    }

    const emailExist = await this.findOne({ email })
    const usernameExist = await this.findOne({ username })
    
    if (emailExist) {
        throw Error ('Email already registered')
    }
    if (usernameExist) {
        throw Error('Username already taken')
    }

    //password hashing adding salt haha!
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, username, password: hash })
    
    //lets return user so we use it in front-end

    return user

}

//Login function: making sure we use function so we can access the class using this
loginSignupSchema.statics.login = async function (email, password) {
    
    //making sure the form wont be empty
    if (!email  || !password) {
        throw Error('Please fill up the login form')
    }

    //email check and password match
    const user = await this.findOne({ email })
    if (!user) {
        throw Error ('Email is incorrect or not existed')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error ('Password is incorrect')
    }

    return user
    
}




//making the model 
const chitterUser = mongoose.model("chitteruser", loginSignupSchema);

module.exports = chitterUser;