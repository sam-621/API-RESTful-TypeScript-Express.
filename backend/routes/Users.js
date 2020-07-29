const { Router } = require('express')
const router = Router();
const { takeTrip, AbandondATrip } = require('../services/Users');
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