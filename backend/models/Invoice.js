import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true },
  sno:String,
  date: { type: String },
  vehicleNumber: String,
  product:String,
  poNumber: String,
  descriptionOfMaterial: String,
  supplierName: String,
  materialName: String,
  material: String,
  noOfPlates: Number,
  qr: String,
  remarks:String,
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);