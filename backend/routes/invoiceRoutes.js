
import express from "express";
import Invoice from "../models/Invoice.js";
import {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

// ✅ CREATE
router.post("/", createInvoice);

// ✅ GET ALL
router.get("/", getInvoices);



// ✅ SEARCH WITH QR INCLUDED
router.get("/search/:invoiceNo", async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      invoiceNo: req.params.invoiceNo,
    });

    if (!invoice) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(invoice); // ✅ includes qr
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET BY ID
router.get("/:id", getInvoiceById);

// ✅ UPDATE
router.put("/:id", updateInvoice);

// ✅ DELETE
router.delete("/:id", deleteInvoice);

export default router;