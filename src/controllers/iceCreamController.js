import { IceCream } from "../models/icecreamModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";


const createIceCream = asyncHandler (async(req,res)=>{
    const {flavour,available,price} = req.body

    if(
        [flavour].some((field) => field?.trim()=== "")
    ){
        throw new apiError(400,"All are compulsary")
    }
    const existedIceCream = await IceCream.findOne({flavour})
    
    if (existedIceCream){
        throw new apiError(409,"Ice Cream already exists")
    }
    const iceCream = await IceCream.create({
        flavour : flavour,
         available : available ,
         price :  price
      })
      const createdIceCream   = await IceCream.findById(iceCream._id)
      if(!createdIceCream){
        throw new apiError(500,"Something went wrong while adding the Ice Cream")
      }
      return res.status(201).json(
        new ApiResponse(200, createdIceCream, "Ice Cream added successfully")
      )

})


const getAllIceCreams =  asyncHandler(async (req, res) => {

    const iceCreams = await IceCream.find();
  
    return res 
    .status(200)
    .json(new ApiResponse(
       200,
       iceCreams,
       "All Ice cream fetched successfully"
    ))
});


const deleteIceCream = asyncHandler (async (req, res) => {

      const iceCream = await IceCream.findByIdAndDelete(req.params.id);
      
      if (!iceCream) {
        throw new apiError(404, "Ice cream not found");
      }
      res.json(new ApiResponse(200, iceCream, "Data deleted successfully"));
});


  const getIceCreamById =  asyncHandler(async (req, res) => {
    
      const iceCream = await IceCream.findById(req.params.id);
      if (!iceCream) {
        throw new apiError(404, "Ice Cream not found");
      }
      res.json(new ApiResponse(200, book, "Data fehched successfully"));
});


  const updateIceCream =  asyncHandler(async (req, res) => {
    
      const iceCream = await IceCream.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!iceCream) {
        throw new apiError(404, "Ice Cream not found");
      }
      res.json(new ApiResponse(200, iceCream, "Info updated successfully"));
    
});


























export {createIceCream,
    getAllIceCreams,
    deleteIceCream,
    getIceCreamById,
    updateIceCream
}
