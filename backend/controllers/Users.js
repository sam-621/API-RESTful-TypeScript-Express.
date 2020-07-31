//SELECT * FROM tripstaken INNER JOIN trips ON tripstaken.tripID = trips.ID; (doesnt matter)
const pool = require('../database/connection');

const UserServices = {

    async takeTrip(tripID, userID) {
        let alreadyTaken = false;

        try {
            //VERIFY IF TRIP EXISTS
            const [trip] = await pool.query("SELECT * FROM Trips WHERE ID = ?", [tripID]);

            if(!trip.length) {
                throw {
                    error: true,
                    message: 'This trip doesn exist'
                }
            }

            //VERIFY IF THE TRIP HAS ALREADY TAKEN BY THIS USER
            const [userTrips] = await pool.query("SELECT * FROM Tripstaken WHERE userID = ?", [userID]);

            userTrips.map((trip) => {
                if(trip.tripID == tripID) {
                    alreadyTaken = true
                };
            });

            if(alreadyTaken) {
                throw {
                    error: true,
                    message: 'You have alredy taken this trip'
                }
            }

            //EVERYTHIN OK
            const tripTaken = { 
                tripID,
                userID
            }
            await pool.query("INSERT INTO Tripstaken SET ?", [tripTaken]);
            return {
                error: false,
                message: 'Your trip has been added succesfuly'
            }
        } catch (error) {
            return error
        }
    },

    async GetTrips() {
        try {
            const [trips] = await pool.query("SELECT * FROM Trips");
            return {
                err: false,
                data: trips,
                message: 'you got it'
            }
        } catch (error) {
            return {
                error: error,
                data: null,
                message: 'An error has ocurred getting the available trips'
            }
        }
    },

    async GetTrip(id) {
        try {
            const [trip] = await pool.query("SELECT * FROM Trips WHERE ID = ?", [id]);
            return {
                error: false,
                data: trip,
                message: 'You got it'
            }
        
        } catch (error) {
            return {
                error: error,
                data: null,
                message: 'An error has occurred'
            }   
        }
    },

    async AbandondATrip(userID, tripID) {
        try {
            await pool.query("DELETE FROM Tripstaken WHERE userID = ? AND tripID = ?", [userID, tripID]);
            return {
                error: false,
                message: 'You have abandoned the trip succesfully'
            }
        } catch (error) {
            return {
                error: error,
                message: 'An error has ocurred'
            }
        }
    }
}

module.exports = UserServices;