const { Router } = require('express')
const router = Router();
const { takeTrip, GetTrips, GetTrip, AbandondATrip } = require('../controllers/Users');
const authJWT = require('../middlewares/authJWT');


//TAKE A TRIP
router.post('/taketrip/:tripID', authJWT, async (req, res) => {
    const { tripID } = req.params;
    const { id } = req.user;

    const takeOrNot = await takeTrip(tripID, id);
    res.json(takeOrNot);
});


//SEE AVAILABLES TRIPS
router.get('/trips', async (req, res) => {
    const response = await GetTrips();
    res.json(response);
});


//SEE 1 TRIP
router.get('/trips/:tripID', async ({ params }, res) => {
    const { tripID } = params;

    const jsonResponse = await GetTrip(tripID);
    res.json(jsonResponse);
});


//ABANDOND A TRIP
router.delete('/abandondtrip/:tripID',authJWT, async (req, res) => {
    const { tripID } = req.params;
    const { id } = req.user;
    
    const jsonResponse = await AbandondATrip(id, tripID);
    res.json(jsonResponse);
})

module.exports = router;