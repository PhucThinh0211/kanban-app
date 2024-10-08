const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  tickets: [
    {
      name: { type: String, required: true },
      description: String,
      startDate: Date,
      endDate: Date,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
  ],
});
const ColumnModel = mongoose.model("column", ColumnSchema);
module.exports = ColumnModel;
