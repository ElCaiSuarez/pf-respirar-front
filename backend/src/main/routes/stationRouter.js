const Routes = require('express');
const stationCreateController = require('../controllers/createStationController');
const stationListController = require('../controllers/listStationController');

const router = Routes();

router.get('/list', (req, res) => {
    return stationListController.listStations(req, res);
});

router.post('/create', async (req, res) => {
    return await stationCreateController.createStation(req, res);
});

module.exports = router;