const Routes = require('express');
const stationController = require('../controllers/stationController');

const router = Routes();

router.get('/', (req, res) => {
    return stationController.listStations(req, res);
});

router.get('/:id', (req, res) => {
    return stationController.getStationById(req, res);
});

router.delete('/:id', async (req, res) => {
    return await stationController.deleteById(req, res);
});

router.post('/', async (req, res) => {
    return await stationController.createStation(req, res);
});

router.patch('/', async (req, res) => {//Cai: Agrego el metodo patch
    return await stationController.saveStation(req, res);
});

module.exports = router;