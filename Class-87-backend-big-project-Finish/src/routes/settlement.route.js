import e from 'express';
import { addSettlement } from '../controllers/settlement.controllers.js';
import auth from '../middlewares/auth.middleware.js';
const router = e.Router();
router.post("/settlementAdd", auth, addSettlement );

export default router;