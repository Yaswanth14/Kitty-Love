const router = require('express').Router();
const { signUp, verifyOtp } = require('../Controller/userController');

router.route('/signup').post(signUp); // Sign Up Route
router.route('/signup/verify').post(verifyOtp); // Verify OTP Route

module.exports = router;