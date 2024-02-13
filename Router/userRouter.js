const {Router} = require('express');
const { signUp, verifyOtp, signIn } = require('../Controller/userController');
const { updateProfile, getProfiles, getSingleProfile, getProfilePhoto } = require('../Controller/profileController');
const router = Router();
const formidable = require('express-formidable')

router.post('/signup', signUp);  // Sign Up Route
router.post('/signup/verify', verifyOtp); // Verify OTP Route
router.post('/signin', signIn); // Sign In Route

router.put('/update/:pid', formidable(), updateProfile); // Update Profile Route
router.get('/profiles', getProfiles); // Get all profiles route
router.get('/profiles/:username', getSingleProfile); // Get profile of a single user
router.get('/profile-photo/:pid', getProfilePhoto); // Get the photo of a specific user

module.exports = router;