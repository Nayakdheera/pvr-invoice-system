import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true },
  sno:String,
  date: { type: String },
  vehicleNumber: String,
  msPlateCode:String,
  poNumber: String,
  descriptionOfMaterial: String,
  supplierName: String,
  description: String,
  material: String,
  noOfPlates: Number,
  qr: String,
  remarks:String,
  weight: Number,
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);