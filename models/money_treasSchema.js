const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const money_treasSchema = new Schema(
  {
    status: String,
    description: String,
    amount: Number,
    date: Date,
  },
  { timestamps: true }
);
//create a model
const Money_treas = mongoose.model("money_treas", money_treasSchema);
module.exports = Money_treas;