// import { Admin } from "../models/adminModel";
// import { asyncHandler } from "../utils/asyncHandler";
// import { ApiResponse } from "../utils/apiResponse";
// import { apiError } from "../utils/apiError";

// const adminRegister = asyncHandler(async(req,res)=>{
    
//     const {userName,password,email} = req.body

//     if(
//       [userName,email,password].some((field) => field?.trim()=== "")
//   ){
//       throw new apiError(400,"All are compulsary")
//   }
//   const existedAdmin = await Admin.findOne({
//     $or: [{ userName },{ email }]
// })

// if (existedAdmin){
//     throw new apiError(409,"Admin already exists")

// }
// const admin = await Admin.create({
//   email : email,
//   password : password,
//   userName : userName 
// })
// const createdAdmin   = await Admin.findById(admin._id).select(
//   "-password "
// )
// if(!createdAdmin){
//   throw new apiError(500,"Something went wrong while registring of the admin")
// }
// return res.status(201).json(
//   new ApiResponse(200, createdAdmin, "Admin registered successfully")
// )
// })

// export {adminRegister}