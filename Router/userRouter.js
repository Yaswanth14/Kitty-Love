const {Router} = require('express');
const { signUp, verifyOtp, signIn } = require('../Controller/userController');
const { updateProfile, getProfiles, getSingleProfile, getProfilePhoto } = require('../Controller/profileController');
const router = Router();
const formidable = require('express-formidable')
const userMiddleware = require("../middleware/authMiddleware")

router.post('/signup', signUp);  // Sign Up Route
router.post('/signup/verify', verifyOtp); // Verify OTP Route
router.post('/signin', signIn); // Sign In Route

router.put('/update/:pid', userMiddleware, formidable(), updateProfile); // Update Profile Route
router.get('/profiles', userMiddleware, getProfiles); // Get all profiles route
router.get('/profiles/:username', getSingleProfile); // Get profile of a single user
router.get('/profile-photo/:pid', getProfilePhoto); // Get the photo of a specific user

router.get('/user-auth', userMiddleware, (req, res) => {
    res.status(200).send({
        ok: true,
        success: true,
        message: "You are Authorized"
    })
})

module.exports = router;