const {Router} = require('express');
const {getAllUsers, CreateUser, update, remove, getUserById} = require('../controllers/users');
const {getAllUsers, CreateUser, remove, getUserById, updateUser} = require('../controllers/users');

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', CreateUser);
router.put('/:id', update);
router.put('/:id', updateUser);
router.delete('/:id', remove);

