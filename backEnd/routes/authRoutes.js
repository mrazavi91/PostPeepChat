//routes
const Router = require("express");
const  { sigup_post, login_post } = require( '../controllers/authController.js')
const {
    getPeeps,
    getPeep,
    createPeep,
    deletePeep
} = require('../controllers/peepController.js')
const router = Router();
const requireAuth = require('../middleware/requireAuth.js')

//Sign up 
router.post('/signup', sigup_post);

//login 
router.post('/login', login_post);

//Get alll peeps
router.get('/', getPeeps);

//get single 
router.get('/:id', getPeep);

//Middleware-----------------------------------
router.use(requireAuth);
//---------------------------------------------

// POST a new peep
router.post('/', createPeep)

// DELETE a Peep
router.delete('/:id', deletePeep)



module.exports =  router;
