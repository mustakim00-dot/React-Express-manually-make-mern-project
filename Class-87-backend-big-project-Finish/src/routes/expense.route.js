import e from 'express';
import { createMyExpense, createOneToOneExpense, deleteGroupExpense, deleteMyExpense, deleteOneToOneExpense, getAllExpenses, getMyExpense, groupExpense, updateGroupExpense, updateMyExpense, updateOneToOneExpense } from '../controllers/expense.controller.js';
import auth from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { createIndividualExpenseSchema } from '../validators/expense.validators.js';
const router = e.Router();
router.route("/expenses/individual").post(auth,validationMiddleware(createIndividualExpenseSchema), createMyExpense ).get(auth, getAllExpenses);
router.route("/expenses/individual/:expenseId").put(auth,validationMiddleware(createIndividualExpenseSchema),updateMyExpense).delete(auth, deleteMyExpense).get(auth, getMyExpense);
router.route("/expenses/one-to-one").post(auth, createOneToOneExpense );
router.route("/expenses/one-to-one/:expenseOneToOneId").put(auth, updateOneToOneExpense ).delete(auth, deleteOneToOneExpense );
router.route("/expenses/group").post(auth, groupExpense );
router.route("/expenses/group/:expenseGroupId").put(auth, updateGroupExpense ).delete(auth, deleteGroupExpense);
export default router;

//validationMiddleware(updateIndividualExpenseSchema);
