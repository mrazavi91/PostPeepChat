const  chitterUser = require( "../model/model.js");
const jwt = require( "jsonwebtoken");

//we got to create token with secret and expires in 1 day
const createToken = (_id) => {
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'})
}

//Sign up POST  
const sigup_post = async (req, res) => {

    //destructing the req.body
    const { name, email, username, password } = req.body

    try {
        const user = await chitterUser.signup(name, email, username, password)
        //lets create token 
        const token = createToken(user._id)
        //sending res to front-end in json
        res.status(200).json({name,email,username,token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//Login POST 
const login_post = async (req, res) => {
    //destructing the req.body
    const {email ,password } = req.body

    try {
        const user = await chitterUser.login(email, password)
        const { username } = user
        //lets create token 
        const token = createToken(user._id)
        //sending res to front-end in json
        res.status(200).json({username, token })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports =  {
    sigup_post,
    login_post
}
