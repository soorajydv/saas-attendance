// import { UserModel } from '../../../auth/models/user.model';
// import DriverProfile from '../../../profile/models/driverProfile.model';
// import RideRequest from '../../../ride/models/rideRequest.model';

// export const getNearestPassengersRequestList = async (
//   user: UserModel,
//   currentLocation: [number, number]
// ) => {
//   // Fetch driver profile
//   const driverProfile = await DriverProfile.findById(user.driverProfile).select(
//     'vehicleDetail.wheelCount'
//   );

//   if (!driverProfile) {
//     console.log('Driver Profile Not found');
//     return [];
//   }

//   const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000); // limit rides
//   // Use aggregation to fetch ride requests and passenger details in a single query
//   const ridesReq = await RideRequest.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: currentLocation,
//         },
//         distanceField: 'distance',
//         maxDistance: 1000,
//         query: {
//           status: 1,
//           wheelCount: driverProfile.vehicleDetail.wheelCount,
//           createdAt: { $gte: twentyMinutesAgo },
//         },
//         spherical: true,
//         key: 'pickupPoint.point.coordinates',
//       },
//     },

//     {
//       $lookup: {
//         from: 'users',
//         localField: 'passengerId',
//         foreignField: '_id',
//         as: 'passengerDetails',
//       },
//     },

//     {
//       $unwind: '$passengerDetails', // Unwind the user details
//     },

//     {
//       $lookup: {
//         from: 'userprofiles',
//         localField: 'passengerId',
//         foreignField: 'userId',
//         as: 'userProfile',
//       },
//     },

//     {
//       $unwind: {
//         path: '$userProfile', // Unwind the user details
//         preserveNullAndEmptyArrays: true,
//       },
//     },

//     {
//       $project: {
//         _id: 0,
//         passengerId: 1,
//         fullName: '$passengerDetails.fullName',
//         avatar: '$userProfile.avatar', // TODO: Make avatar field on UserModel as it is common for both driver & passenger
//         price: 1,
//         wheelCount: 1,
//         rideDistance: 1,
//         pickupPoint: 1,
//         destination: 1,

//         createdAt: 1,
//         rideId: { $toString: '$_id' },
//         averageRating: '$userProfile.averageRating',
//         tripCompletedCount: '$userProfile.tripCompletedCount',
//       },
//     },
//   ]);

//   return ridesReq;
// };
