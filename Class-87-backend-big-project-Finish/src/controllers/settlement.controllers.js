import { Settlement } from "../models/settlement.model.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";

const addSettlement = asyncHandler(async(req,res) => { 
    const newSettlement = await Settlement.create({
         ...req.body,
         receivedBy: req.user._id,
         });
    return res.status(200).json(ApiSuccess.created('Settlement created', newSettlement));
});
export { addSettlement };

