const { Create, GetOne, Delete, GetMany } = require('../lib/MySQL')

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

                const tripTaken = { //EVERYTHIN OK
                    tripID,
                    userID
                }
                Create('TripsTaken', tripTaken, (err) => {
                    err ? cb(err, 'There was an error taking this trip') : cb(err, 'Your trip has been added succesfuly');
                });
            })
        })
    },

    GetTrips(cb) {
        const trips = GetMany('Trips');
        return trips
        err ? cb(err, trips, 'An error has ocurred getting the available trips') : cb(err, trips, 'you got it');
    },

    GetTrip(id, cb) {
        GetOne('Trips', 'ID', id, (err, trip) => {
            err ? cb(err, trip, 'An error has ocurred getting this trips') : cb(err, trip, 'you got it')
        })
    },

    AbandondATrip(id, cb) {
        Delete('TripsTaken', 'ID', id, (err) =>  {
             err ? cb(err, 'An error has ocurred') : cb(err, 'You have abandoned the trip succesfully'); 
        })
    }
}

module.exports = UserServices;