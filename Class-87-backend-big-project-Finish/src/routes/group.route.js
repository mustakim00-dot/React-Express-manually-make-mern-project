import e from 'express';
import { addMember, createGroup, deleteGroup, getAllMembers, getGroup, getGroups, getMyGroups, getMyMembers, removeMember, updateGroup } from '../controllers/group.controller.js';
import auth from '../middlewares/auth.middleware.js';
import upload from '../middlewares/fileUpload.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { createGroupSchema, groupMembersSchema } from '../validators/group.validators.js';


const router = e.Router();
router.route('/groups').post(auth, upload.single('image'), validationMiddleware(createGroupSchema),createGroup).delete(auth,deleteGroup).get(auth, getGroups);
router.route('/groups/my-groups').get(auth, getMyGroups);
router.route('/groups/:groupId').get(auth, getGroup).put(auth, upload.single('image'), validationMiddleware(createGroupSchema),updateGroup).delete(auth, deleteGroup);
router.route('/groups/members/:groupId').post(auth, validationMiddleware(groupMembersSchema), addMember).delete( auth, validationMiddleware(groupMembersSchema), removeMember);
router.route('/groups/members/All').get(auth, getAllMembers);
router.route('/groups/members').get(auth, getMyMembers);


export default router;