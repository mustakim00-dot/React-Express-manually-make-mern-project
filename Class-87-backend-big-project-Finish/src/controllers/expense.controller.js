import { Expense } from "../models/expense.model.js";
import { Group } from "../models/group.model.js";
import ApiError from "../utils/apiError.js";
import ApiSuccess from "../utils/apiSuccess.js";
import asyncHandler from "../utils/asyncHandler.js";




// create expense a Custom function
const createExpense = async (req, extraFields = {}) => {
    const expense = await Expense.create({
      ...req.body,
      createdBy: req.user._id,
      ...extraFields,
    });
    await expense.populate({
      path: "splits.user",
      select: "name",
    });
    return expense;
};


const getAllExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({ $or: [{ createdBy: req.user._id}, {createdBy: null}]});
    if(expenses.length === 0) {
        return res.status(200).json(ApiSuccess.ok('no expenses found', expenses));
    }
    return res.status(200).json(ApiSuccess.ok('All Expenses fetched', expenses));
});

const createMyExpense = asyncHandler(async (req, res) => {
    
    const expense = await createExpense(req, { paidBy: req.user._id });
    //  Expense.create({
    //     ...req.body,
    //     paidBy: req.user._id,
    //     createdBy: req.user._id   
    // });
    await Expense.collection.dropIndexes();
    return res.status(200).json(ApiSuccess.created('Individual expense created ', expense));
});

const getMyExpense = asyncHandler(async (req, res) => {
    const { expenseId } = req.params;
    
    const expense = await Expense.findById(expenseId);
    if(!expense) {
        throw ApiError.notFound('Expense not found');
    }
    return res.status(200).json(ApiSuccess.ok('only one Expense fetched', expense));
});

const updateMyExpense = asyncHandler(async (req, res ) => {
    const { expenseId } = req.params;
//     if (!req.body) {
//   throw ApiError.badRequest("Request body is missing");
// } 
    const { description, amount, date ,category , subcategory} = req.body;
    //const expense = await Expense.findOne({ $and: [{ slug : expenseId}, { createdBy: req.user._id}]});
     const expense = await Expense.findOne({
       $and: [{ $or: [{ _id: expenseId }, { slug: expenseId }] }, { createdBy: req.user._id }],
     });
    //console.log(expense);
    if(!expense){
        throw ApiError.notFound('Expense not found');
    }
    const isDescriptionExists = await Expense.findOne({ 
        _id: { $ne: expense._id},
        description : description,
         createdBy: req.user._id});
    if(isDescriptionExists){
        throw ApiError.badRequest('Expense description already exists');
    }
    // const isAmountExists = await Expense.findOne({_id :{ $ne : expense._id }, amount});
    // if(isAmountExists){
    //     throw ApiError.badRequest('Expense amount already exists');
    // }
    // const isDateExists = await Expense.findOne({ _id : { $ne : expense._id}, date});
    // if(isDateExists){
    //     throw ApiError.badRequest('Expense date already exists');
    // }
    // const isCategoryExists = await Expense.findOne({ _id: { $ne: expense._id}, category});
    // if(isCategoryExists){
    //     throw ApiError.badRequest('Expense category already exists');
    // }
    // const isSubcategoryExists = await Expense.findOne({_id: {$ne: expense._id}, subcategory});
    // if(isSubcategoryExists){
    //     throw ApiError.badRequest('Expense subcategory already exists');
    // }
    expense.description = description;
    expense.amount = amount;
    expense.date = date;
    expense.category = category;
    expense.subcategory = subcategory;
    await expense.save();

    return res.status(200).json(ApiSuccess.created('Expense updated ', expense));
});

const deleteMyExpense = asyncHandler(async (req, res) => {
    const { expenseId } = req.params;
    //const expense = await Expense.findOne({ slug: expenseId , createdBy: req.user._id });
    const expense = await Expense.findOneAndDelete({
      $and: [{ $or: [ { _id: expenseId }, { slug: expenseId }, ] }, { createdBy: req.user._id },],});
    if (!expense) {
        throw ApiError.notFound('Expense not found');
    }
    //await expense.remove();
    return res.status(200).json(ApiSuccess.ok('Expense deleted successfully'));
});

const createOneToOneExpense = asyncHandler(async (req, res) => {
    const expense = await createExpense(req);
    //  Expense.create({
    //     ...req.body,
    //     createdBy: req.user._id,
        
    // })
    // await expense.populate({
    //   path: 'splits.user',
    //   select: 'name',
    // });
    //return expense;
    return res.status(200).json(ApiSuccess.created('One-to-one expense created', expense));
});

const updateOneToOneExpense = asyncHandler(async (req, res) => {
    const { expenseOneToOneId } = req.params;
    const { description, amount, date, category, subcategory, paidBy, splitType, splits} = req.body;
    //const [{ user, amount: splitAmount, paid } = {}] = splits || [];
      if (!Array.isArray(splits) || splits.length === 0) {
        throw ApiError.badRequest('Splits data is required');
      }

    const expense = await Expense.findOne({
      $and: [{ $or: [{ _id: expenseOneToOneId }, { slug: expenseOneToOneId }] }, { createdBy: req.user._id }],
    });
    //console.log(expense);
    if (!expense) {
      throw ApiError.notFound('Expense not found');
    }
    const isDescriptionExists = await Expense.findOne({
      _id: { $ne: expense._id },
      description: description,
      createdBy: req.user._id,
    });
    if (isDescriptionExists) {
      throw ApiError.badRequest('Expense description already exists');
    }
    
      expense.description = description;
      expense.amount = amount;
      expense.date = date;
      expense.category = category;
      expense.subcategory = subcategory;
      expense.paidBy = paidBy;
      expense.splitType = splitType;
      expense.splits = splits.map(split => ({
        user: split.user,
        amount: split.amount,
        paid: split.paid,
      }))
      await expense.save();

      return res.status(200).json(ApiSuccess.created('Expense one to one updated ', expense));

})
const deleteOneToOneExpense = asyncHandler(async (req, res) => {
    const { expenseOneToOneId } = req.params;
    const expense = await Expense.findOneAndDelete({
      $and: [{ $or: [{ _id: expenseOneToOneId }, { slug: expenseOneToOneId }] }, { createdBy: req.user._id }],
    });
    if (!expense) {
      throw ApiError.notFound('Expense not found');
    }
    return res.status(200).json(ApiSuccess.ok('Expense one to one deleted successfully'));
})

const groupExpense = asyncHandler (async( req, res) => {
  const { groups:groupId } = req.body;
  const { splits } = req.body;
  const groupEx = await Group.findById(groupId).populate('members');
  const users = splits.map(({ user}) => user);
  const isValid = groupEx.members.every(member => {
    if (users.includes(member._id.toString()) || users.includes(req.user._id.toString())) {
      return true;
    }
  });
  console.log(users, groupEx.members);
  
  if(!isValid) {
    throw ApiError.badRequest('Invalid users');
  };
    
    const expense = await createExpense(req);
    // Expense.create({
    //     ...req.body,
    //     createdBy: req.user._id,
        
    // });
    return res.status(200).json(ApiSuccess.created('Group expense created', expense));
  });

const updateGroupExpense = asyncHandler(async (req, res) => {
    const { expenseGroupId } = req.params;
    const { description, amount, date, category, subcategory, paidBy, splitType, splits, groups, createdBy } =
      req.body;
    //const [{ user, amount: splitAmount, paid } = {}] = splits || [];
    if (!Array.isArray(splits) || splits.length === 0) {
      throw ApiError.badRequest('Splits data is required');
    }

    const expense = await Expense.findOne({
      $and: [
        { $or: [{ _id: expenseGroupId }, { slug: expenseGroupId }] },
        { createdBy: req.user._id },
      ],
    });
    //console.log(expense);
    if (!expense) {
      throw ApiError.notFound('Expense not found');
    }
    const isDescriptionExists = await Expense.findOne({
      _id: { $ne: expense._id },
      description: description,
      createdBy: req.user._id,
    });
    if (isDescriptionExists) {
      throw ApiError.badRequest('Expense description already exists');
    }

    expense.description = description;
    expense.amount = amount;
    expense.date = date;
    expense.category = category;
    expense.subcategory = subcategory;
    expense.paidBy = paidBy;
    expense.splitType = splitType;
    expense.splits = splits.map(split => ({
      user: split.user,
      amount: split.amount,
      paid: split.paid,
    })),
    expense.groups = groups;
    expense.createdBy = createdBy;
    await expense.save();

    return res.status(200).json(ApiSuccess.created('Expense group updated ', expense));
});
 const deleteGroupExpense = asyncHandler(async (req, res) => {
     const { expenseGroupId } = req.params;
     const expense = await Expense.findOneAndDelete({
       $and: [
         { $or: [{ _id: expenseGroupId }, { slug: expenseGroupId }] },
         { createdBy: req.user._id },
       ],
     });
     if (!expense) {
       throw ApiError.notFound('Expense not found');
     }
     return res.status(200).json(ApiSuccess.ok('Expense group deleted successfully'));
 });

//Alternative
// const createExpense = async(req, extraFields = {}) => {
//     return await Expense.create({
//         ...req.body,
//         createdBy: req.user._id,
//         ...extraFields,
//     });
// };

// export const createMyExpense = asyncHandler(async(req,res)=>{
//     const expense = await createExpense(req, {paidBy:req.user._id});
//     return res.status(200).json(ApiSuccess.created('Expense created',expense));
// });
// export const oneToOneExpense = asyncHandler(async(req,res)=>{
//     const expense = await createExpense(req);
//     return res.status(200).json(ApiSuccess.created('Expense created',expense));
// });
// export const groupExpense = asyncHandler(async(req,res)=>{
//     const expense = await createExpense(req);
//     return res.status(200).json(ApiSuccess.created('Expense created',expense));
// });



export { createExpense, createMyExpense, createOneToOneExpense, deleteGroupExpense, deleteMyExpense, deleteOneToOneExpense, getAllExpenses, getMyExpense, groupExpense, updateGroupExpense, updateMyExpense, updateOneToOneExpense };

