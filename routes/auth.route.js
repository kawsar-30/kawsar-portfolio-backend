const express = require('express');
const router = express.Router();
const { register, login, getAllAdmins, deleteAdmin, resetPassword } = require('../controller/auth.controller');


router.post('/register', register);


router.post('/login', login); 

router.get('/admins', getAllAdmins);

router.delete('/admins/:id', deleteAdmin);
router.put('/admins/reset/:id', resetPassword);

module.exports = router;
