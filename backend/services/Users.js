const { Create, GetOne } = require('../lib/MySQL')

const UserServices = {

    takeTrip(tripID, userID, cb) {
        let alreadyTaken = false;

        GetOne('Trips', 'ID', tripID, (err, trip) => { //Verifying if trips exists
            if(err) {
                cb(err, 'There was an error taking this trip')
                return
            }
            if(!trip.length) {
                cb(true, 'This trip doesnt exist');
                return
            }
            GetOne('tripstaken', 'userID', userID, (err, trip) => { //Verifying if trips hasnt taken by this user
                if(err) {
                    cb(err, 'There was an error taking this trip');
                    return
                }
                trip.map((trip) => {
                    console.log(trip)
                    if(trip.tripID == tripID) {
                        alreadyTaken = true
                    };
                });
                if(alreadyTaken) {
                    cb(true, 'You have alredy taken this trip')
                    return
                }

                //EVERYTHIN OK
                const tripTaken = {
                    tripID,
                    userID
                }
                Create('TripsTaken', tripTaken, (err) => {
                    err ? cb(err, 'There was an error taking this trip') : cb(err, 'Your trip has been added succesfuly');
                });
            })
        })
    }
}

module.exports = UserServices;