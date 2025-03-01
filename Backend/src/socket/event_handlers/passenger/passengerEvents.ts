// import { getRideRequestById } from '../../../ride/services/ride.service';
// import { activeUsers } from '../handleActiveUsersEvent';


// class PassengerEventHandler {
 
//   static passengerChooseDriver = async (
//       userId:string,
//     rideId: string,
//     fareAmount: string,
//   ) => {
//     const rideRequest = await getRideRequestById(rideId.trim());
    
   

//     // To Notify other drivers that they were not selected
//     const rejectedDriversIds = rideRequest.acceptedDrivers.filter(
//       (driverId) => driverId !== chosenDriverId
//     );

 

//     const rejectedDriversSocketIds = rejectedDriversIds.map((driverId) =>
//       activeUsers.getDriverSocketId(driverId)
//     );

    
//     return {
//       choosedDriverSocketId: activeUsers.getDriverSocketId(chosenDriverId),
//       rejectedDriversSocketIds,
//     };
//   };
// }

// export default PassengerEventHandler;
//-----------------------------------------------
// import { NotFoundError } from '../../../../utils/error';
// import { getRideRequestById } from '../../../ride/services/ride.service';
// import { RideRequestStatus } from '../../../ride/utils/enums';
// import { activeUsers } from '../handleActiveUsersEvent';

// /**
//  * Class representing a handler for passenger-related events.
//  */
// class PassengerEventHandler {
//   /**
//    * Searches for available nearby drivers based on the passenger's request.
//    *
//    * This method takes the passenger's user ID and data, including starting point,
//    * destination, and wheel count, to find available nearby drivers. It returns the
//    * socket IDs of the available drivers and the ride request data.
//    *
//    * @param {string} userId - The unique identifier for the passenger making the request.
//    * @param {any} data - The data containing the passenger's ride request details.
//    *
//    * @returns {Promise<{ availableDriversSocketIds: string[], rideRequestData: any }>}
//    *          An object containing an array of available driver socket IDs and the ride
//    *          request data.
//    *
//    * @throws {Error} Throws an error if the data format is invalid or if the search fails.
//    *
//    * @example
//    * const userId = '54321';
//    * const data = JSON.stringify({
//    *   startingPoint: {
//    *     "type": "Point",
//    *     "coordinates": [27.6753141, 85.3442161]
//    *   },
//    *   destination: {
//    *     "type": "Point",
//    *     "coordinates": [27.6946797, 85.3029093]
//    *   },
//    *   wheelCount: 2
//    * });
//    *
//    * const { availableDriversSocketIds, rideRequestData } =
//    *   await PassengerEventHandler.searchAvailableNearbyDrivers(userId, data);
//    * console.log(availableDriversSocketIds, rideRequestData);
//    */

//   // static passengerChooseDriver = async (
//   //   rideId: string,
//   //   chosenDriverId: string
//   // ) => {
//   //   const rideRequest = await getRideRequestById(rideId.trim());
//   //   if (
//   //     !rideRequest ||
//   //     rideRequest.status !== RideRequestStatus.SearchingForDriver
//   //   )
//   //     throw new NotFoundError('Ride request not found or already chosen');

//   //   rideRequest.chosenDriver = chosenDriverId;
//   //   rideRequest.status = RideRequestStatus.DriverChoosedAndWaitingForDriver;
//   //   await rideRequest.save();

//   //   // To Notify other drivers that they were not selected
//   //   const rejectedDriversIds = rideRequest.acceptedDrivers.filter(
//   //     (driverId) => driverId !== chosenDriverId
//   //   );

//   //   console.log('Choosen driver: ', chosenDriverId);

//   //   console.log('Rejected Drivers: ', rejectedDriversIds);

//   //   const rejectedDriversSocketIds = rejectedDriversIds.map((driverId) =>
//   //     activeUsers.getDriverSocketId(driverId)
//   //   );
//   //   console.log('Rejected Drivers Sockets: ', rejectedDriversSocketIds);

//   //   return {
//   //     choosedDriverSocketId: activeUsers.getDriverSocketId(chosenDriverId),
//   //     rejectedDriversSocketIds,
//   //   };
//   // };
// }

// export default PassengerEventHandler;
