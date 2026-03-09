import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // },
  },
  {
    timestamps: true,
    //toJSON: { virtuals: true },
    //toObject: { virtuals: true },
  }
);

// groupSchema.virtual('expenses', {
//     ref: 'Expense',
//     localField: '_id',
//     foreignField: 'groups',
// })

export const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);