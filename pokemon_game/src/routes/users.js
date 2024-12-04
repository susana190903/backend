const { Router } = require('express');
const { getAllUsers, getUserById, CreateUser } = require('../controllers/users');

const router = Router();
router.get('/', getAllUsers);
router.get('/:id',getUserById);
router.post('/', CreateUser);
router.put('/:id');
router.delete('/:id');


module.exports = router;