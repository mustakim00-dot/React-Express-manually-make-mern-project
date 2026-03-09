//import { User } from "../../models/user.models.js";
import jwt from "jsonwebtoken";
import { APP_URL, GOOGLE_ACCESS_TOKEN_URL, GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_OAUTH_SCOPES, GOOGLE_OAUTH_URL, GOOGLE_TOKEN_INFO_URL, JWT_SECRET } from "../../constants.js";
//import { User } from "../../models/index.model.js";

import { User } from "../../models/user.models.js";
import ApiError from "../../utils/apiError.js";
import ApiSuccess from "../../utils/apiSuccess.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { fileUpload } from "../../utils/fileUpload.js";
import { forgetPasswordFormat, sendMail, verifyEmailFormat } from "../../utils/mail.js";
import { avatarUploadSchema } from "../../validators/user.validator.js";


const signup = asyncHandler(async (req,res)=> {
    const { username, name,email,password} = req.body;
    const usernameExists = await User.findOne({ username });
    if(usernameExists){
        throw ApiError.badRequest('Username already exists');
    }
    const emailExists = await User.findOne({ email });
    if(emailExists){
        throw ApiError.badRequest('Email already exists');
    }
    // await User.create({username,name,email,password});
    // const  user = await User.findOne({ email }).select("-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires");

    const createdUser = await User.create({ 
        username,
        name,
        email,
        password,
     });

    const user = await User.findById(createdUser._id).select(
        "-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires");


    const token = user.jwtToken();
    const verifyUrl = `${APP_URL}/api/v1/users/verify?token=${token}`;
    sendMail({
        email,
        subject: 'Verify your email',
        mailFormat: verifyEmailFormat(name, verifyUrl),
    })

    return res.status(200).json(ApiSuccess.created('user created', user));
    //console.log(username, name,email,password); 
    // const user = await User.create(req.body);
    //return res.json({user});
    //return res.send(req.body);
});

const verifyMail = asyncHandler(async (req,res)=> {
    const {token} = req.query;
    if(!token){
        throw ApiError.badRequest('Token is required');
    }
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      throw ApiError.unauthorized('Invalid or expired jwt token');
    }
    const user = await User.findById(decodedToken.id).select(
      '-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires'
    );

    if(!user){
        throw ApiError.notFound('User not found');
    }
    if(user.isVerified){
        return res.status(200).json(ApiSuccess.ok('User already verified', user));
    } else {
        user.isVerified = true;
        await user.save();
        return res.status(200).json(ApiSuccess.ok('User verified', user));
    }
});


const signin = asyncHandler(async(req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw ApiError.notFound('Invalid credentials');
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw ApiError.notFound('Invalid credentials');
    }
    if(user.isVerified === true){
        throw ApiError.forbidden('Email is not verified');
    }
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();

    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };

    return res
    .cookie('accessToken',accessToken, {...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
    .cookie('refreshToken',refreshToken, {...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .status(200).json(ApiSuccess.ok('User signed in',{accessToken,refreshToken}));
});


const signout = asyncHandler(async(_req,res) => {
    return res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .status(200)
    .json(ApiSuccess.ok('User signed out'));
})

const signinWithGoogle = asyncHandler(async(req,res) => {
    const state = 'some_state';
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

const googleCallback = asyncHandler(async(req,res) => {
    const { code } = req.query;

    const data = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_CALLBACK_URL,
      grant_type: 'authorization_code',
    };
    // exchange authorization code for access token & id_token
    const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const access_token_data = await response.json();
    const { id_token } = access_token_data;
    // verify and extract the information in the id token
    const token_info_response = await fetch(`${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
    const token_info = await token_info_response.json();
    const createdUser = await User.findOneAndUpdate(
        {email: token_info.email},
    { 
      username: (token_info.name + Math.floor(1000 + Math.random() * 9000)).replace(' ',''),
      name: token_info.name,
      email: token_info.email,
      isVerified: token_info.email_verified,
      accountType: 'google',
      avatar: {
        url: token_info.picture,
      },
    },
     {
        upsert: true,
        new: true,
      }
);

    const user = await User.findById(createdUser._id).select(
      '-__v -password -createdAt -updatedAt -passwordResetToken -passwordResetExpires'
    );
    const accessToken = user.accessToken();
    const refreshToken = user.refreshToken();

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    };

    res
    .cookie('accessToken',accessToken, {...cookieOptions, maxAge: 24 * 60 * 60 * 1000 })
    .cookie('refreshToken',refreshToken, {...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 })
    .status(token_info_response.status)
    .json(ApiSuccess.ok('User signed in', { accessToken, refreshToken}));
})

const updateUser = asyncHandler(async(req,res) => {
    const { userId } = req.params;
    const userExists = await User.findById(userId);
    if(!userExists){
        throw ApiError.notFound('UserId not found');
    }

    //const user = await User.findById(req.user._id);
    const {username, name,email} = req.body;

    if(userExists.username !== username){
    const usernameExists = await User.findOne({ username});
     if(usernameExists){
        throw ApiError.badRequest('Username already exists');
    } else {
        (userExists.username = username)
        //await user.save();
    }
    }
    // if(!user){
    //     throw ApiError.notFound('User not found');
    // }
  
    if(userExists.email !== email){
        const isEmailExists = await User.findOne({ email});
        if(isEmailExists){
        throw ApiError.badRequest('Email already exists');
    } else {
        userExists.isVerified = false;
        userExists.email = email;
        //await user.save();
        const token = userExists.jwtToken()
        const verifyUrl = `${APP_URL}/api/v1/users/verify?token=${token}`;
        sendMail({
        email,
        subject: 'Verify your email',
        mailFormat: verifyEmailFormat(name, verifyUrl),
    })
    }
    }

     (userExists.name = name); 
    await userExists.save();
    return res.status(200).json(ApiSuccess.ok('User updated', userExists));
})

const updatePassword = asyncHandler(async(req,res) => {
    const { userId } = req.params;
    //console.log("userId", userId.id);
    console.log("object:", req);

    
    const userExists = await User.findById(userId);
    if(!userExists){
        throw ApiError.notFound('UserId not found');
    }

    //const user = await User.findById(req.user._id);
    const {oldPassword, newPassword} = req.body;
    
    if(oldPassword === newPassword){
        throw ApiError.badRequest('New password can not be same as old password');
    }
   const isMatch = await userExists.comparePassword(oldPassword);
   if(!isMatch){
      throw ApiError.notFound('old password is incorrect');
   }
   userExists.password = newPassword;
   await userExists.save();
   return res.status(200).json(ApiSuccess.ok('Password updated Successfully', userExists));
})

const forgetPassword = asyncHandler(async(req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw ApiError.notFound('User not found');
    }
    const otp = Math.floor(10000 + Math.random() * 9000);
    sendMail({
        email,
        subject: 'reset password',
        mailFormat: forgetPasswordFormat(user.name, otp),
    })
    user.passwordResetToken = otp;
    user.passwordResetExpires = Date.now() + 5 * 60 * 1000;
    await user.save();
    return res.status(200).json(ApiSuccess.ok('OTP sent'));
})

const validateOtp = asyncHandler(async(req,res) => {
    const {otp} = req.body;
    const user = await User.findOne({passwordResetToken: otp});
    if(!user){
        throw ApiError.notFound('Invalid otp');
    }
    if(user.passwordResetExpires < Date.now()){
        throw ApiError.notFound('Otp expired');
    }
    // user.passwordResetToken = null;
    // user.passwordResetExpires = null;
    // await user.save();
    return res.status(200).json(ApiSuccess.ok('Otp verified'));
})

const resetPassword = asyncHandler(async(req,res) => {
    const {otp, password} = req.body;
    const user = await User.findOne({passwordResetToken: otp});
    if(!user){
        throw ApiError.notFound('Invalid otp');
    }
  
  // if(user.passwordResetExpires < Date.now()){
    //     throw ApiError.notFound('Otp expired');
    // }
    user.password = password;
    user.passwordResetToken = null;
    user.passwordResetExpires = null;
    await user.save();
    return res.status(200).json(ApiSuccess.ok('Password reseted'));
});

const avatarUpload = asyncHandler(async(req,res) => {
    const avatar = req.file;
    console.log(req.file);
    const avatarValidation = avatarUploadSchema.safeParse(avatar);
    if(avatarValidation.error){
        throw ApiError.badRequest('Avatar is required');
    }
    // if(!avatar){
    //     throw ApiError.badRequest('Avatar not found');
    // }
    const user = req.user;
    const result = await fileUpload(avatar.path,{
        folder:'avatar',
        user_filename: true,
        //unique_filename: true,
        overwrite: true,
        resource_type: 'image',
        transformation: [{
            width: 300,
            height: 300,
            crop: "fill",
            gravity: 'face',
            radius: 'max' 
        }],
        public_id: req.user._id,
    });
    user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
    };
    await user.save();
    return res.status(200).json(ApiSuccess.ok('Avatar upLoaded', user));
});

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find( {_id: {$ne: req.user._id}} );
    //const users = await User.find();
    //console.log(users);
    if(users.length === 0 ) {
        return res.status(200).json(ApiSuccess.ok('No users found'));
    }
    return res.status(200).json(ApiSuccess.ok('All Users fetched Successfully', users));
})

const deleteUser = asyncHandler(async(req,res) => {
    const { slugParam } = req.params;
    const user = await User.findByIdAndDelete({_id: slugParam});
    if(!user){
        throw ApiError.notFound('User not found');
    }
    return res.status(200).json(ApiSuccess.ok('User deleted Successfully'));
    
});


const me = asyncHandler(async(req,res) => {
    return res.status(200).json(ApiSuccess.ok('User found', req.user));
})



export { avatarUpload, deleteUser, forgetPassword, getUsers, googleCallback, me, resetPassword, signin, signinWithGoogle, signout, signup, updatePassword, updateUser, validateOtp, verifyMail };


// createdAt updateAt


//http://localhost:8000
//http://localhost:8000/api/v1/users/google/callback

