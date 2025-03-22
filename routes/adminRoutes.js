const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const Admin=require('../models/Admin');
const {isAuthenticated}=require('../middleware/authMiddleware');

//Login Page
router.get('/login',(req,res) => {
    res.render('login');
});

//Login Handler
router.post('/login', async (req,res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({username});

    if(!admin) return res.send('user not found');

    const isMatch=await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.send('Incorrect password');

    req.session.admin = admin;
    res.redirect('/dashboard');
});

//Dashboard
router.get('/dashboard', isAuthenticated, (req,res) => {
    res.render('dashboard', {admin: req.session.admin});
});

//logout
router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports=router;