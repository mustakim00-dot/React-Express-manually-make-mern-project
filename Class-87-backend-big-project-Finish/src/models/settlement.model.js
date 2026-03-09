import mongoose, { Schema } from "mongoose";
const settlementSchema = new Schema({
    expense: {
        type: Schema.Types.ObjectId,
        ref: 'Expense',
    },
    amount:{
        type: Number,
    },
    group:{
        type:Schema.Types.ObjectId,
        ref: 'Group',
    },
    note:{
        type:String,
    },
    paidBy: {
        type: Schema.Types.ObjectId,
        ref:'User',
    },
    receivedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: Date,
    },
},
{
    timestamps:true,
});

export const Settlement = mongoose.models.Settlement || mongoose.model('Settlement',settlementSchema);