import Invoice from "../models/Invoice.js";
import QRCode from "qrcode";



export const createInvoice = async (req, res) => {
  try {
    // create invoice
    console.log("FRONTEND_URL :", process.env.FRONTEND_URL)
    const invoice = new Invoice(req.body);
    await invoice.save();

    // generate QR
    const qrData = `${process.env.FRONTEND_URL}/invoice/${invoice._id}`;
    const qrImage = await QRCode.toDataURL(qrData);

    // save QR
    invoice.qr = qrImage;
    await invoice.save();

    // DEBUG (IMPORTANT)
    console.log("QR SAVED:", invoice.qr);

    res.status(201).json(invoice);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// 📄 Get all
export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Get single
export const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✏️ Update
export const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ❌ Delete
export const deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};