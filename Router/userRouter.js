const { Router } = require('express');
const { signUp, verifyOtp, signIn } = require('../Controller/userController');
const { updateProfile, getProfiles, getSingleProfile, getProfilePhoto } = require('../Controller/profileController');
const { sendDm, addToCrush, deleteDms, removeFromCrush, getCrushDetails, getDms, updatePrivate } = require('../Controller/crushController');
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

router.post('/message/:username', userMiddleware, sendDm); //  Send DM to user
router.put('/like/:username', userMiddleware, addToCrush); // Add to crush list
router.delete( '/unlike/:pid', userMiddleware ,removeFromCrush) ;// Remove from Crush
router.put('/delete/dms/:pid', deleteDms); // Delete DMS
router.get('/crush/:pid', getCrushDetails);
router.get('/dms/:pid', userMiddleware, getDms); // Get dms of the user

router.put('/private/:userId', updatePrivate);

router.get('/user-auth', userMiddleware, (req, res) => {
    res.status(200).send({
        ok: true,
        success: true,
        message: "You are Authorized"
    })
})

module.exports = router;