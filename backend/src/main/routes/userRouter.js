const Routes = require('express');
const userController = require('../controllers/userController');

const router = Routes();

router.get('/', (req, res) => {
    return userController.listUsers(req, res);
});

router.get('/:id', (req, res) => {
    const userId = req.params.id;
    if (userId && userId.trim() !== '') 
    {
        return userController.getUserById(req, res);
    }
    else
    {
        return userController.listUsers(req, res);
    }
});

router.get('/:id', (req, res) => {
    return userController.getUserById(req, res);
});

router.post('/', async (req, res) => {
    return await userController.createUser(req, res);
});

module.exports = router;