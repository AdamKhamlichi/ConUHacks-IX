const mongoose = require("mongoose");
const retirementSchema = new mongoose.Schema({
  retirementGoal: { type: Number, required: true },
  currentSavings: { type: Number, required: true },
  monthlyContribution: { type: Number, required: true },
  yearsToRetirement: { type: Number, required: true },
  monthlyIncome: { type: Number, required: true },
  monthlyExpenses: { type: Number, required: true },
  milestones: [{
    age: { type: Number, required: true },
    goal: { type: Number, required: true },
    achieved: { type: Boolean, default: false },
  }]
});

const Retirement = mongoose.model('Retirement', retirementSchema);

module.exports = Retirement;
