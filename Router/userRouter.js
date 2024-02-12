const {Router} = require('express');
const { signUp, verifyOtp, updateProfile, signIn } = require('../Controller/userController');
const router = Router();

router.post('/signup', signUp);  // Sign Up Route
router.post('/signup/verify', verifyOtp); // Verify OTP Route
router.post('/signin', signIn); // Sign In Route
// router.put('/update', updateProfile); // Update Profile Route

module.exports = router;