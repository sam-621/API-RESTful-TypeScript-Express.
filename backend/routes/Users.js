const { Router } = require('express')
const router = Router();
const { takeTrip, GetTrips, GetTrip, AbandondATrip } = require('../controllers/Users');
const authJWT = require('../middlewares/authJWT');


//TAKE A TRIP
router.post('/taketrip/:tripID', authJWT, async (req, res) => {
    const { tripID } = req.params;
    const { id } = req.user;

    const APIresponse = await takeTrip(tripID, id);
    res.json(APIresponse);
});


//SEE AVAILABLES TRIPS
router.get('/trips', async (req, res) => {

    const APIresponse = await GetTrips();
    res.json(APIresponse);
});


//SEE 1 TRIP
router.get('/trips/:tripID', async ({ params }, res) => {
    const { tripID } = params;

    const APIresponse = await GetTrip(tripID);
    res.json(APIresponse);
});


//ABANDOND A TRIP
router.delete('/abandondtrip/:tripID', authJWT, async (req, res) => {
    const { tripID } = req.params;
    const { id } = req.user;
    
    const APIresponse = await AbandondATrip(id, tripID);
    res.json(APIresponse);
})

module.exports = router;