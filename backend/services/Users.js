const { Create, GetOne } = require('../lib/MySQL')

const UserServices = {

    takeTrip(tripID, userID, cb) {
        GetOne('Trips', 'ID', tripID, (err, trip) => {
            if(err) {
                cb(err, 'There was an error taking this trip')
                return
            }
            if(!trip.length) {
                cb(true, 'This trip doesnt exist');
                return
            }
            const tripTaken = {
                tripID,
                userID
            }
            Create('TripsTaken', tripTaken, (err) => {
                err ? cb(err, 'There was an error taking this trip') : cb(err, 'Your trip has been added succesfuly');
            });
        })
    }
}

module.exports = UserServices;