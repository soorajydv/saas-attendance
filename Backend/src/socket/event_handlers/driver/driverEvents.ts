// import { NotFoundError } from '../../../../utils/error';
// import { getUserDetailById } from '../../../auth/services/user.service';
// import { getDriverProfile } from '../../../profile/services/driverProfile.service';
// import { getUserAverageRating } from '../../../profile/services/userProfile.service';
// import { IPassengerRideReqDataForDriver } from '../../../ride/models/rideRequest.model';
// import { updateDriverByUserId } from '../../../ride/services/driver.service';
// import {
//   countCompletedTripsForPassenger,
//   getNearestRideRequests,
//   // acceptPassengerRideRequestByDriver,
//   getRideRequestById,
// } from '../../../ride/services/ride.service';
// import { RideRequestStatus } from '../../../ride/utils/enums';
// import { activeUsers } from '../handleActiveUsersEvent';

// /**
//  * Class representing a handler for driver-related events.
//  */
// class DriverEventHandler {
//   /**
//    * Updates the driver's status or position in the system.
//    *
//    * This method takes the user's ID and the new driver data to update the driver's
//    * status and/or location. The driver data must follow a specific format.
//    *
//    * @param {string} userId - The unique identifier for the driver.
//    * @param {any} data - The data containing the driver's new status and location.
//    *
//    * @returns {Promise<any>} The response from the update operation.
//    *
//    * @throws {Error} Throws an error if the data format is invalid or if the update fails.
//    *
//    * @example
//    * const userId = '12345';
//    * const data = JSON.stringify({
//    *   location: {
//    *     "type": "Point",
//    *     "coordinates": [-74.00, 40.73]
//    *   },
//    *   status: "A" // Status can be 'A' (Active), 'O' (Offline), or 'T' (Terminated)
//    * });
//    *
//    * const response = await DriverEventHandler.updateDriverStatusOrPosition(userId, data);
//    * console.log(response); // Response from the update operation
//    */
//   static updateDriverStatusOrPosition = async (userId: string, data: any) => {
//     // Driver Data should be of format
//     /*
//         Data should be of:
//           - location 
//           - status (A,O,T)
        
//           Example: 
//               {
//                 location: {
//                   "type": "Point",
//                   "coordinates": [-74.00, 40.73]
//                     },
//                 status: "A"
//               }
//      */
//     // const driverData = JSON.parse(data);
//     const driverData = data;

//     const response = await updateDriverByUserId(userId, driverData);
//     console.log('Location Update process: ', response);

//     return response;
//   };

//   static getNearestPassengersRequest = async (
//     userId: string,
//     currentLocation: [number, number]
//   ): Promise<IPassengerRideReqDataForDriver[]> => {
//     console.log('DriverId: ', userId);
//     console.log('currentLocation: ', currentLocation);

//     const driver = await getDriverProfile(userId);

//     if (!driver) {
//       console.log('Driver Profile Not found');
//       return [];
//     }

//     const ridesReq = await getNearestRideRequests({
//       wheelCount: driver.vehicleDetail.wheelCount,
//       currentLocation,
//     });

//     const result = await Promise.all(
//       ridesReq.map(async (ride) => {
//         // Get user details for the passenger
//         const { fullName, avatar } = await getUserDetailById(ride.passengerId);

//         // Get additional details for the ride
//         const rating = await getUserAverageRating(ride.passengerId);
//         const tripCompletedCount = await countCompletedTripsForPassenger(
//           ride.passengerId
//         );

//         // Return the formatted result
//         return {
//           userId: ride.passengerId,
//           fullName,
//           avatar,
//           price: ride.price,
//           wheelCount: ride.wheelCount,
//           rating,
//           rideDistance: ride.rideDistance,
//           tripCompletedCount,
//           searchedAt: ride.createdAt,
//           rideId: ride.id.toString(),
//           pickupPoint: ride.pickupPoint,
//           destination: ride.destination,
//         };
//       })
//     );

//     return result;
//   };

//   static driverAcceptPassengerRideRequest = async (
//     _userId: string,
//     rideId: string
//   ) => {
//     const rideRequest = await getRideRequestById(rideId.trim());
//     if (
//       !rideRequest ||
//       rideRequest.status !== RideRequestStatus.SearchingForDriver
//     )
//       throw new NotFoundError('Ride request not found or already booked');

//     // await acceptPassengerRideRequestByDriver(rideRequest, userId);
//     return activeUsers.getPassengerSocketId(rideRequest.passengerId);
//   };
// }

// export default DriverEventHandler;
