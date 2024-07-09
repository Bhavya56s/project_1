// import { User } from "../models/usermodel.js";
// import mongoose from "mongoose";
// import { ApiResponse } from "../utils/apiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { apiError } from "../utils/apiError.js";

// const registerUser = asyncHandler ( async(req,res)=>{
    
//     const {userName,password,email} = req.body

//     if(
//       [userName,email,password].some((field) => field?.trim()=== "")
//   ){
//       throw new apiError(400,"All are compulsary")
//   }
//   const existedUser = await User.findOne({
//     $or: [{ userName },{ email }]
// })

// if (existedUser){
//     throw new apiError(409,"User already exists")

// }
// const user = await User.create({
//   email : email,
//   password : password,
//   userName : userName 
// })
// const createdUser   = await User.findById(user._id).select(
//   "-password "
// )
// if(!createdUser){
//   throw new apiError(500,"Something went wrong while registring of the user")
// }
// return res.status(201).json(
//   new ApiResponse(200, createdUser, "User registered successfully")
// )
// })
// const loginUser = asyncHandler( async (req,res) => {

//   const{email,userName,password} = req.body


//   if (!userName && !email) {
//       throw new apiError(400,"Email or username is required")
//   }
//    const user = await User.findOne({
//    $or:[{userName},{email}]
//   })

//   if(!user){
//    throw new apiError(404,"User doesnot exist")
//   }
//   const  isPasswordValid = await user.isPasswordCorrect(password)
//   console.log(isPasswordValid);

//   if(!isPasswordValid){

//    throw new apiError(401,"Invalid user credentials")
//   }

//     const loggedInUser = await User.findById(user._id)
//     return res
//     .status(200)
//     .json(
//       new ApiResponse(
//          200,
//          {
//             user: loggedInUser
//          },
//          "User logged  in succesfully"
//       )
//     )
// })

// const getAllUsers = asyncHandler (async (req, res) => {
  
//     const users = await User.find().select("-password")
//     res.json(new ApiResponse(200, users, "Users fetched successfully"));

// });


// const getUserById =  asyncHandler (async (req, res) => {
 
//     const user = await User.findById(req.params.id).select("-password")
//     if (!user) {
//       throw new apiError(404, "User not found");
//     }
//     res.json(new ApiResponse(200, user, "User updated successfully"));
  
  
// });


// const deleteUser =  asyncHandler(async (req, res) => {

//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       throw new apiError(404, "User not found");
//     }
//     res.json(new ApiResponse(200, user, "User deleted successfully"));
// });




// const updateUser = asyncHandler(async (req, res) => {
  
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!user) {
//       throw new apiError(404, "User not found");
//     }
//     res.json(new ApiResponse(200, user, "User updated successfully"));
  
// });



// const purchaseIceCream =  asyncHandler(async (req, res) => {
  
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       throw new apiError(400,"User not found")
//     }

//     user.purchasedIceCreams.push(req.body);
//     await user.save();
//     res.json(new ApiResponse(200, user, "User updated successfully"));

    
 
// });

// const getTotalBill = asyncHandler(async (req, res) => {

//     const user = await User.findById(req.params.id).populate('purchasedIceCreams.iceCreamId');
//     if (!user) {
//       throw new apiError(404, "User not found");
//     }
//     const totalBill = await user.totalBill;
//     res.json(new ApiResponse(200, totalBill, "User updated successfully"));

    
  
// });



// export {registerUser,
//   loginUser,
//   getUserById,
//   getAllUsers,
//   deleteUs0