import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../constants.js";
import { User } from "../models/user.models.js";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";


// const auth = asyncHandler(async (req, _res,next) => {
//     //const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "");
//     let token;

//     // 1️⃣ Get token
//     if (req.cookies?.accessToken) {
//       token = req.cookies.accessToken;
//     } else if (req.headers.authorization?.startsWith('Bearer ')) {
//       token = req.headers.authorization.split(' ')[1]; // ✅ correct
//     }
//     //console.log("token", token);
//     console.log("Token", req.header('Authorization'));
    

//     if(!token) {
//         throw ApiError.unauthorized("Access token not found.Please log in.");
//     }
//     let decodedToken;
//     try {
//          decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
//     } catch (error) {
//         throw ApiError.unauthorized('Invalid or expired access token');
//     }
//     if(!decodedToken?._id) {
//         throw ApiError.unauthorized("Token does not contain valid user info.");
//     }
//     console.log('Decoded ID:', decodedToken._id);

//     const user =await User.findById(decodedToken._id).select("-password -__v -createdAt -updatedAt -passwordResetToken -passwordResetExpires");
//     //console.log('Param ID:', user);


//     if(!user) {
//         throw ApiError.unauthorized("User no longer exists");
//     }
//     req.user = user;
//     next();
// })
const auth = asyncHandler(async (req, _res, next) => {
  let token;

  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw ApiError.unauthorized('Access token not found');
  }

  const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

  console.log('Decoded token:', decoded); // 👈 MUST see _id here

  if (!decoded?.id) {
    throw ApiError.unauthorized('Token does not contain valid user info');
  }

  const user = await User.findById(decoded.id || decoded._id);
  if (!user) {
    throw ApiError.unauthorized('User no longer exists');
  }

  req.user = user;
  next();
});


export default auth;