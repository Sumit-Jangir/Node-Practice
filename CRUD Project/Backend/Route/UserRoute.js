const express = require('express');
const { findUser, deleteUser, addUser, updateUser, login } = require('../Controller/UserController');
const VerifyToken = require('../middleware/VerifyToken')
const router = express.Router();

router.get('/find',VerifyToken,findUser);
router.delete('/delete/:id',VerifyToken,deleteUser);
router.post('/create',addUser);
router.patch('/update',VerifyToken,updateUser);
router.post('/login',login);


module.exports = router;

