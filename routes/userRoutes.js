const express=require('express');
const router=express.Router();
const User=require('../models/User');
const { isAuthenticated , isSuperAdmin } = require('../middleware/authMiddleware');

//Get Users
router.get('/', isAuthenticated, async (req,res) => {
    const users=await User.find();
    res.render('users', {users, admin: req.session.admin});
});

//Add User
router.post('/add', isSuperAdmin, async (req,res) => {
    await User.create(req.body);
    res.redirect('/users');
});

//Delete User
router.delete('/:id', isSuperAdmin, async (req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/users');
});

module.exports = router;