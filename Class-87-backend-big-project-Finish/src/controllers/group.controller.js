import { Expense } from "../models/expense.model.js";
import { Group } from "../models/group.model.js";
import ApiError from "../utils/apiError.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";
import { deleteFile, fileUpload } from "../utils/fileUpload.js";

const createGroup = asyncHandler(async (req,res ) => {
    const groupExists = await Group.findOne({
        $and: [{ name: req.body.name} , { createdBy: req.user._id }],
        
    });
   
    // console.log(req.user._id); console.log(req.body);
    //console.log(req);
    
    if(groupExists){
        throw ApiError.badRequest("Group name already exists");
    }

    const groupLogo = req.file;
    //console.log(req);
    
    if (groupLogo) {
         const result = await fileUpload(groupLogo.path, {
           folder: 'groups',
           user_filename: true,
           resource_type: 'image',
           overwrite: true,
           //unique_filename: true,
           public_id: req.body.name + Date.now(),
         }); 

         console.log(result);
         
        req.body.image = {
            url: result.secure_url,
            public_id: result.public_id,
    };
};
 

    const group = await Group.create({ ...req.body, createdBy: req.user._id});
    return res.status(200).json(ApiSuccess.created("group created", group));
});

const addMember = asyncHandler(async (req, res) => {
    const { groupId } = req.params; 
    const { members } = req.body;
    const userId = req.user._id; 
    const groupExists = await Group.findById(groupId);
    if(!groupExists) {
        throw ApiError.notFound("Group not found");
    }
    if( userId.toString() != groupExists.createdBy.toString()) {
        throw ApiError.forbidden(" you are not authorized to add members to this group");
    }
    const newMembers = members.filter(member => {
        return groupExists.members.includes(member) === false;
    });
    if(newMembers.length === 0){
        throw ApiError.badRequest("No new numbers to add");
    }
    groupExists.members = [ ...groupExists.members, ...newMembers];
    
    await groupExists.save();
    return res.status(200).json(ApiSuccess.created(" Members added to group", groupExists));

});

const deleteGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const groupExists = await Group.findById(groupId);
  if (!groupExists) {
    throw ApiError.notFound('Group not found');
  }
  if (groupExists.createdBy.toString() !== req.user._id.toString()) {
    throw ApiError.forbidden('You are not authorized to delete this group ');
  }
   //console.log(typeof groupExists.createdBy.toString());
   //console.log(typeof req.user._id.toString());
   
  await Group.findByIdAndDelete(groupId);
  return res.status(200).json(ApiSuccess.ok('Group deleted'));
});


const getGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({ members: req.user._id });
  return res.status(200).json(ApiSuccess.ok('Groups fetched', groups));
});

const getMyGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({ createdBy: req.user._id });
  return res.status(200).json(ApiSuccess.ok('groups fetched', groups));
});


const updateGroup = asyncHandler(async (req, res ) => {
    const { groupId } = req.params;
    const groupExists = await Group.findById(groupId);
    if (!groupExists) {
      throw ApiError.badRequest('Group not found');
    }

    const groupLogo = req.file;
    //console.log(groupLogo);
    
    if (groupLogo) {
     
      const result = await fileUpload(groupLogo.path, {
        folder: 'groups',
        use_filename: true,
        resource_type: 'image',
        //unique_filename: true,
        public_id: req.body.name + Date.now(),
      });
      req.body.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      deleteFile(groupExists.image.public_id);
    }


    const groupName = await Group.findOne({
        $and: [{_id: { $ne: groupId }} , { name: req.body.name }, { createdBy: req.user._id }],
    })
    if(groupName) {
        throw ApiError.badRequest("Group name already exists");
    }

    const group = await Group.findOneAndUpdate({ _id: groupId },{ $set: { ...req.body} },{ new: true});
    return res.status(200).json(ApiSuccess.created('group updated', group));
});

const removeMember = asyncHandler(async(req, res) => {
    const { groupId } = req.params;
    const { members } = req.body;
    const userId = req.user._id;
    const groupExists = await Group.findOne({$and: [{_id: groupId},{ createdBy: userId}] });
    if(!groupExists) {
        throw ApiError.notFound("Group not found or you are not authorized to remove members from this group");
    }
    const updateGroupMembers = await Group.findOneAndUpdate(
        { _id: groupId },
        { $pull: { members:{ $in: members } } },
        { new: true }
    );
    return res.status(200).json(ApiSuccess.created(" Members removed from group", updateGroupMembers));
    
});

const getAllMembers = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const userId = req.user._id;
    console.log(groupId, userId);
    
    const groupExists = await Group.findOne({ $or: [{ _id: groupId},{ createdBy: userId}]}).populate('members');
    if(!groupExists){
      throw ApiError.notFound("Group not found or you are not authorized to remove members from this group");
    }
    return res.status(200).json(ApiSuccess.ok("All members fetched Successfully", groupExists.members));
});

const getMyMembers = asyncHandler(async(req, res) => {
    //const { groupId } = req.params;
    const userId = req.user._id;
    const {memberId, groupId } = req.query;
    console.log(memberId, groupId);
    if (!memberId) {
      throw ApiError.badRequest('memberId is required');
    }
  //console.log(userId);
    const groupExists = await Group.findOne({$or:[{ _id: groupId },{createdBy: userId }]}).populate('members');
    if(!groupExists){
      throw ApiError.notFound("Group not found or you are not authorized to remove members from this group");
    }
    const member = groupExists.members.find(m => m._id.toString() === memberId.toString());
    if(!member){
       throw ApiError.notFound("Member not found in this group");
    }
    return res.status(200).json(ApiSuccess.ok("Only one members fetched Successfully", member));
});

const getGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const group = await Group.findById(groupId) //.populate('expenses');
  if (!group) {
    throw ApiError.notFound('Group not found');
  }
  if(group.members.includes(req.user._id) === false && group.createdBy.toString() !== req.user._id.toString()) {
    throw ApiError.forbidden('you are not authorized to access this group');
  };
  const groupExpense = await Expense.find({ groups: groupId });
  const total = groupExpense.reduce((acc,cur) => acc + cur.amount ,0);
  const due = total - groupExpense.flatMap(element => element.splits).filter(split => split.paid == true).reduce((acc, cur) => acc + cur.amount, 0);
  return res.status(200).json(ApiSuccess.ok("Group fetched", {group, groupExpense, total, due}));
});


export { addMember, createGroup, deleteGroup, getAllMembers, getGroup, getGroups, getMyGroups, getMyMembers, removeMember, updateGroup };

