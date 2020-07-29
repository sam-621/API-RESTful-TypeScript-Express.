const { Router } = require('express')
const router = Router();
const { takeTrip, GetTrips, GetTrip, AbandondATrip } = require('../services/Users');
const authJWT = require('../middlewares/authJWT');

router.post('/taketrip/:tripID', authJWT, (req, res) => {

    const { tripID } = req.params;
    const { id } = req.user;

    takeTrip(tripID, id, (err, message) => {
        res.json({
            error: err,
            message: message
        });
    });
});

router.get('/trips', (req, res) => {
    GetTrips((err, trips, message) => {
        res.json({
            error: err,
            trips: trips,
            message: message
        });
    });
});

router.get('/trips/:tripID', (req, res) => {
    const { tripID } = req.params;

    GetTrip(tripID, (err, trip, message) => {
        res.json({
            error: err,
            trip: trip,
            message: message
        });
    });
});

router.delete('/abandondtrip/:tripID', async (req, res) => {
    const { tripID } = req.params;
    
    AbandondATrip(tripID, (err, message) => {
        res.json({
            error: err,
            message: message
        })
    });
})

module.exports = router;