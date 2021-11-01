const router = require('express').Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator') //check
const config = require('config')
const jwt = require('jsonwebtoken');

const User = require('../../models/User')
//@route    api/auth
//@desc     Test Route
//@access   Public
router.get('/',auth,async (req,res)=>{
   try {
       const user = await User.findById(req.user.id).select('-password');
       res.json(user)
   } catch (err) {
      console.error(err.message);
      res.status(500).send('server error')
   }
});


//@route    Post api/auth
//@desc     Authanticate user & get token 
//@access   Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required!').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credientilas,user' }] })
        }

       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credientilas,password' }] })

       }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

        // see if user exists

        // get users gravatar

        //Encrypt password

        //return jsonwebtoken


    } catch (error) {
        console.error(errors.message);
        res.status(500).send('Server error auth 76')
    }



})

module.exports = router;