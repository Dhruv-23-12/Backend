import { asyncHandler } from '../utils/asyncHandlers.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCouldinary } from '../utils/cloudinary.js';
import { ApiReponse } from '../utils/ApiReponse.js'
 

const registerUser = asyncHandler(async (req, res)=> {

    const {fullName, email, userName, password } =req.body
    console.log("email : ",email);

   if (
    [fullName,email,userName,password].some((field) => 
    field.ApiError?.trim() === ""))
    {
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = User.findOne({
        $or : [{ username},{ email }]
    }) 

    if (existedUser){
        throw new ApiError(409,"User with email and username is already exists")
    }

    const avatarLocalPath =  req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files.cover[0]?.path;

    if (!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     const coverImage = await uploadOnCouldinary(coverImageLocalPath)

     if (!avatar){
        throw new ApiError(500,"Avatar upload failed")
     }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username : userName.toLowerCase(),
     })

     const createUser = await User.findById(user._id).select("-password -refreshToken")

     if (!createUser){
        throw new ApiError(500,"something went wrong, user not created")
     }

     return res.status(200).json(
        new ApiReponse(200,createUser,"User created successfully")
     )
}) 

export {registerUser}