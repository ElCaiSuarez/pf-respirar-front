const Routes = require('express');
const applicationController = require('../controllers/applicationController');

const router = Routes();

router.get('/', (req, res) => {
    return applicationController.listApplications(req, res);
});

router.get('/:id', (req, res) => {
    return applicationController.getApplicationById(req, res);
});

router.put('/:id/accept', (req, res) => {
    return applicationController.acceptApplicationById(req, res);
});

router.put('/:id/reject', (req, res) => {
    return applicationController.rejectApplicationById(req, res);
});

router.delete('/:id', (req, res) => {
    return applicationController.deleteById(req, res);
});

router.post('/', async (req, res) => {
    return await applicationController.createApplication(req, res);
});

router.patch('/', async (req, res) => {//Cai: Agrego el metodo patch
    return await applicationController.saveApplication(req, res);
});

module.exports = router;