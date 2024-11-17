const express = require('express');
const { findUser, deleteUser, addUser, updateUser } = require('../Controller/UserController');

const router = express.Router();

router.get('/find',findUser);
router.delete('/delete/:id',deleteUser);
router.post('/create',addUser);
router.patch('/update',updateUser);


module.exports = router;

